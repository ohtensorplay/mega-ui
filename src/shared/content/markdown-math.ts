let stylesLoaded = false;

export async function renderMarkdownMath(root: HTMLElement): Promise<void> {
  const text = root.textContent ?? "";
  if (!text.includes("$") && !text.includes("\\(") && !text.includes("\\[")) return;
  const [{ default: renderMathInElement }] = await Promise.all([
    import("katex/contrib/auto-render"),
    stylesLoaded ? Promise.resolve() : import("katex/dist/katex.min.css").then(() => { stylesLoaded = true; }),
  ]);
  renderMathInElement(root, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    ignoredClasses: ["katex"],
    throwOnError: false,
    trust: false,
    strict: "warn",
    errorColor: "#b94a2f",
  });
}
