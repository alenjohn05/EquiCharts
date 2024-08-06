export function createDom<K extends keyof HTMLElementTagNameMap>(
    tagName: K,
    styles?: Partial<CSSStyleDeclaration>,
  ): HTMLElementTagNameMap[K] {
    const dom = document.createElement(tagName);
    const s = styles ?? {};
    for (const key in s) {
      dom.style[key] = s[key] ?? '';
    }
    return dom;
  }
  