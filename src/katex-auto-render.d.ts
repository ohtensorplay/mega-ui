declare module "katex/contrib/auto-render" {
  type Delimiter = { left: string; right: string; display: boolean };
  type AutoRenderOptions = {
    delimiters?: Delimiter[];
    ignoredTags?: string[];
    ignoredClasses?: string[];
    throwOnError?: boolean;
    trust?: boolean;
    strict?: "ignore" | "warn" | "error";
    errorColor?: string;
  };

  export default function renderMathInElement(element: HTMLElement, options?: AutoRenderOptions): void;
}
