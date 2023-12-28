export function isChildNode(el: Node, parent: Node, baseNode?: Node) {
  let node: Node | null = el;
  do {
    if (node === parent) return true;
    if (node === baseNode) return false;
    node = node.parentNode;
  } while (node);
}

export function addStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  const allStyle = styles as CSSStyleDeclaration;
  for (const key in allStyle) {
    el.style[key] = allStyle[key];
  }
}
