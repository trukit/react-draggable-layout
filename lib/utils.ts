import type { IDragOffset } from './types';

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

export function getDragOffset(e: MouseEvent, widget: HTMLElement, layout: HTMLElement): IDragOffset {
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
