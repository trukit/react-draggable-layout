import type { IActionOffset, IGridNode, IWidget, IWidgetPosition } from './types';

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
    let widths = nodes.map((n) => (n.x ?? 0) + (n.w || 1));
    column = Math.max(...widths);
  }

  if (dir === -1) return nodes.sort((a, b) => (b.x ?? 0) + (b.y ?? 0) * column! - ((a.x ?? 0) + (a.y ?? 0) * column!));
  return nodes.sort((b, a) => (b.x ?? 0) + (b.y ?? 0) * column! - ((a.x ?? 0) + (a.y ?? 0) * column!));
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

export function copyPos(a: IWidget | any, b: IWidget, doMinMax = false): IWidget {
  if (b.x !== undefined) a.x = b.x;
  if (b.y !== undefined) a.y = b.y;
  if (b.w !== undefined) a.w = b.w;
  if (b.h !== undefined) a.h = b.h;
  if (doMinMax) {
    if (b.minW) a.minW = b.minW;
    if (b.minH) a.minH = b.minH;
    if (b.maxW) a.maxW = b.maxW;
    if (b.maxH) a.maxH = b.maxH;
  }
  return a;
}

export function samePos(a: IWidgetPosition, b: IWidgetPosition): boolean {
  return a && b && a.x === b.x && a.y === b.y && (a.w || 1) === (b.w || 1) && (a.h || 1) === (b.h || 1);
}

export function isCollisions(a: IGridNode, b: IGridNode): boolean {
  if (a.id === b.id) return false;
  return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
}
