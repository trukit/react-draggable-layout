import type { IActionOffset, IGridNode, IWidget } from './types';

export const Manager = {
  mouseHandled: false,
  isDragging: false,
  isReszing: false,
  dragWidgetId: '',
  resizeWidgetId: '',
};

export const MouseDownIgnore = 'input,textarea,button,select,option,[contenteditable="true"],.rdl-resizable-handle';

export function cls(...classNamesList: Array<string | string[] | { [K: string]: boolean } | undefined>) {
  return classNamesList
    .filter((item) => !!item)
    .map((item) => {
      if (typeof item === 'object' && !Array.isArray(item)) {
        return Object.keys(item).filter((key) => item[key]);
      }
      return item;
    })
    .toString() // 输出 class1,class2,class3,...
    .split(',')
    .join(' ')
    .trim();
}

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export function getActionOffset(e: MouseEvent, widget: HTMLElement, layout: HTMLElement): IActionOffset {
  const targetOffset = widget.getBoundingClientRect();
  const layoutOffset = layout.getBoundingClientRect();
  const result = {
    left: targetOffset.left,
    top: targetOffset.top,
    width: targetOffset.width,
    height: targetOffset.height,
    offsetLeft: targetOffset.left - e.clientX,
    offsetTop: targetOffset.top - e.clientY,
    layoutLeft: layoutOffset.left,
    layoutTop: layoutOffset.top,
  };
  return result;
}

export function addStyles(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  const allStyle = styles as CSSStyleDeclaration;
  for (const key in allStyle) {
    el.style[key] = allStyle[key];
  }
}

export function sort(nodes: IGridNode[], dir?: -1 | 1, column?: number): IGridNode[] {
  if (!column) {
    let widths = nodes.map((n) => n.x + n.w);
    column = Math.max(...widths);
  }

  if (dir === -1) return nodes.sort((a, b) => b.x + b.y * column! - (a.x + a.y * column!));
  return nodes.sort((b, a) => b.x + b.y * column! - (a.x + a.y * column!));
}

export function defaults(target: any, ...sources: any[]) {
  sources.forEach((source) => {
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop) && (target[prop] === null || target[prop] === undefined)) {
        target[prop] = source[prop];
      }
    }
  });

  return target;
}

export function cloneNode(taget: IGridNode): IGridNode {
  return { ...taget };
}
