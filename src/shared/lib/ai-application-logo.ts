declare const __AI_ICON_MANIFEST__: Readonly<Record<string, { family: string; file: string }>>;

const iconAssets = __AI_ICON_MANIFEST__;

export const aiApplicationIconNames = Object.values(iconAssets).map(({ family }) => family).sort();

export async function resolveAiApplicationLogo(name: string, homepageUrl?: string | null): Promise<string | null> {
  const key = matchAiApplicationIcon(name, homepageUrl, Object.keys(iconAssets));
  if (!key) return null;
  const file = iconAssets[key]?.file;
  return file ? `/ai-icons/${encodeURIComponent(file)}` : null;
}

export function matchAiApplicationIcon(
  name: string,
  homepageUrl: string | null | undefined,
  candidates: readonly string[] = Object.keys(iconAssets),
): string | null {
  const normalizedName = normalize(name);
  if (!normalizedName) return null;

  const tokens = name.toLocaleLowerCase().split(/[^\p{L}\p{N}]+/u).map(normalize).filter(Boolean);
  const hostLabels = homepageLabels(homepageUrl);
  const alias = commonClientIconAlias(normalizedName, tokens, hostLabels);
  if (alias && candidates.includes(alias)) return alias;
  let best: { key: string; score: number } | null = null;

  for (const candidate of candidates) {
    const key = normalize(candidate);
    if (!key) continue;
    let score = 0;
    if (normalizedName === key) score = 1_000;
    else if (hostLabels.includes(key)) score = 950 + key.length;
    else if (tokens.includes(key)) score = 850 + key.length;
    else if (key.length >= 4 && normalizedName.startsWith(key)) score = 700 + key.length;
    else if (key.length >= 5 && normalizedName.includes(key)) score = 600 + key.length;
    else if (normalizedName.length >= 5 && key.startsWith(normalizedName)) score = 500 + normalizedName.length;
    if (score > (best?.score ?? 0)) best = { key, score };
  }

  return best?.key ?? null;
}

function commonClientIconAlias(normalizedName: string, tokens: readonly string[], hostLabels: readonly string[]): string | null {
  if (normalizedName.startsWith("vscode") || normalizedName.startsWith("visualstudiocode") || hostLabels.includes("visualstudio")) {
    return "microsoft";
  }
  if (normalizedName.startsWith("chatgpt") || tokens.includes("chatgpt")) return "openai";
  return null;
}

function homepageLabels(value?: string | null): string[] {
  if (!value) return [];
  try {
    const hostname = new URL(value).hostname.toLocaleLowerCase().replace(/^www\./, "");
    return hostname.split(".").map(normalize).filter((label) => label.length >= 3);
  } catch {
    return [];
  }
}

function normalize(value: string): string {
  return value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase().replace(/[^a-z0-9]/g, "");
}
