import { Fragment, h, type VNodeChild } from "vue";
import { Marked, Renderer, type Tokens } from "marked";

const frontMatterPattern = /^\uFEFF?---[ \t]*\r?\n[\s\S]*?\r?\n---[ \t]*(?:\r?\n|$)/;
const directivePattern = /^:::{0,1}(?!:)[^\r\n]*\r?\n[\s\S]*?^:::{0,1}[ \t]*(?:\r?\n|$)/gm;
const blockedTags = new Set(["base", "embed", "form", "iframe", "link", "meta", "object", "script", "style"]);
const allowedTags = new Set([
  "a", "b", "blockquote", "br", "code", "del", "details", "div", "em", "figcaption", "figure", "h1", "h2", "h3", "h4", "h5", "h6",
  "hr", "i", "img", "input", "kbd", "li", "mark", "ol", "p", "pre", "s", "span", "strong", "sub", "summary", "sup", "table", "tbody",
  "td", "tfoot", "th", "thead", "tr", "ul",
]);
const allowedAttributes = new Set(["alt", "checked", "class", "colspan", "disabled", "height", "href", "id", "rowspan", "src", "title", "type", "width"]);

const marked = new Marked({ gfm: true, breaks: false, async: false });

export type MarkdownHeading = { id: string; text: string; depth: number };
export type MarkdownRenderOptions = { resolveUrl?: (url: string, kind: "link" | "image") => string };
export type MarkdownDocument = { nodes: VNodeChild[]; headings: MarkdownHeading[] };

export function renderMarkdownDocument(markdown: string, options: MarkdownRenderOptions = {}): MarkdownDocument {
  if (typeof DOMParser === "undefined") return { nodes: [markdown], headings: [] };
  const source = normalizeMarkdown(markdown);
  const html = marked.parse(source, { async: false, renderer: renderer(options) }) as string;
  const document = new DOMParser().parseFromString(`<main>${html}</main>`, "text/html");
  const headings = [...document.querySelectorAll<HTMLElement>("main > h2, main > h3")].map((heading) => ({
    id: heading.id,
    text: heading.textContent?.replace(/#$/, "").trim() ?? "",
    depth: Number(heading.tagName.slice(1)),
  })).filter((heading) => heading.id && heading.text);
  return { nodes: childrenToVNodes(document.querySelector("main")!), headings };
}

export function normalizeMarkdown(markdown: string): string {
  let source = markdown.replace(frontMatterPattern, "");
  let previous = "";
  while (previous !== source) {
    previous = source;
    source = source.replace(directivePattern, "");
  }
  return source
    .replace(/^>\s*\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\r?\n/gim, (_match, kind: string) => {
      const label = kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase();
      return `> <span class="markdown-alert-label markdown-alert-label--${kind.toLowerCase()}">${label}</span>\n`;
    })
    .replace(/\b(width|height)\s*=\s*(["'])(\d+)px\2/gi, "$1=\"$3\"")
    .trim();
}

function renderer(options: MarkdownRenderOptions): Renderer {
  const output = new Renderer();
  const headingCounts = new Map<string, number>();
  output.heading = function heading({ tokens, depth }: Tokens.Heading): string {
    const text = this.parser.parseInline(tokens);
    const plain = tokens.map((token) => "text" in token ? String(token.text) : "raw" in token ? String(token.raw) : "").join("");
    const base = slugify(plain);
    const count = headingCounts.get(base) ?? 0;
    headingCounts.set(base, count + 1);
    const id = count ? `${base}-${count + 1}` : base;
    return `<h${depth} id="${id}">${text}<a class="heading-anchor" href="#${id}" aria-label="Link to heading">#</a></h${depth}>`;
  };
  output.link = function link({ href, title, tokens }: Tokens.Link): string {
    const resolved = escapeAttribute(options.resolveUrl?.(href, "link") ?? href);
    return `<a href="${resolved}"${title ? ` title="${escapeAttribute(title)}"` : ""}>${this.parser.parseInline(tokens)}</a>`;
  };
  output.image = function image({ href, title, text }: Tokens.Image): string {
    const resolved = escapeAttribute(options.resolveUrl?.(href, "image") ?? href);
    return `<img src="${resolved}" alt="${escapeAttribute(text)}" loading="lazy" decoding="async"${title ? ` title="${escapeAttribute(title)}"` : ""}>`;
  };
  return output;
}

function childrenToVNodes(parent: ParentNode): VNodeChild[] {
  return [...parent.childNodes].flatMap((node) => {
    const child = nodeToVNode(node);
    return child === null ? [] : [child];
  });
}

function nodeToVNode(node: Node): VNodeChild | null {
  if (node.nodeType === Node.TEXT_NODE) return node.textContent ?? "";
  if (!(node instanceof HTMLElement)) return null;
  const tag = node.tagName.toLowerCase();
  if (blockedTags.has(tag)) return null;
  const children = childrenToVNodes(node);
  if (!allowedTags.has(tag)) return h(Fragment, null, children);
  const attributes: Record<string, string | boolean> = {};
  for (const attribute of [...node.attributes]) {
    const name = attribute.name.toLowerCase();
    if (!allowedAttributes.has(name)) continue;
    if ((name === "href" || name === "src") && !safeUrl(attribute.value)) continue;
    if (name === "id" && !/^[A-Za-z0-9_-]+$/.test(attribute.value)) continue;
    if (name === "class" && !/^[A-Za-z0-9 _-]+$/.test(attribute.value)) continue;
    attributes[name] = ["checked", "disabled"].includes(name) ? true : attribute.value;
  }
  if (tag === "img") Object.assign(attributes, { loading: "lazy", decoding: "async" });
  if (tag === "input") {
    if (attributes.type !== "checkbox") return null;
    attributes.disabled = true;
  }
  return h(tag, attributes, ["br", "hr", "img", "input"].includes(tag) ? undefined : children);
}

function safeUrl(value: string): boolean {
  return /^(?:(?:https?|mailto):|\/|#|\.\.?\/)/i.test(value);
}

function slugify(value: string): string {
  const slug = value.toLowerCase().trim().replace(/<[^>]+>/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").replace(/[\s_-]+/g, "-").replace(/^-|-$/g, "");
  return slug || "section";
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
