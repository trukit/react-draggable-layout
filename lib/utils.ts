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

export function sanitizeMinMax(node: IGridNode) {
  if (!node.minW) {
    delete node.minW;
  }
  if (!node.minH) {
    delete node.minH;
  }
  if (!node.maxW) {
    delete node.maxW;
  }
  if (!node.maxH) {
    delete node.maxH;
  }
}

export function getScrollElement(el?: HTMLElement | null): HTMLElement {
  if (!el) return (document.scrollingElement as HTMLElement) || document.documentElement;
  const style = getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;

  if (overflowRegex.test(style.overflow + style.overflowY)) {
    return el;
  } else {
    return getScrollElement(el.parentElement);
  }
}

export function updateScrollPosition(el: HTMLElement, position: { top: number }, distance: number): void {
  // is widget in view?
  let rect = el.getBoundingClientRect();
  let innerHeightOrClientHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top < 0 || rect.bottom > innerHeightOrClientHeight) {
    // set scrollTop of first parent that scrolls
    // if parent is larger than el, set as low as possible
    // to get entire widget on screen
    let offsetDiffDown = rect.bottom - innerHeightOrClientHeight;
    let offsetDiffUp = rect.top;
    let scrollEl = getScrollElement(el);
    if (scrollEl !== null) {
      let prevScroll = scrollEl.scrollTop;
      if (rect.top < 0 && distance < 0) {
        // moving up
        if (el.offsetHeight > innerHeightOrClientHeight) {
          scrollEl.scrollTop += distance;
        } else {
          scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
        }
      } else if (distance > 0) {
        // moving down
        if (el.offsetHeight > innerHeightOrClientHeight) {
          scrollEl.scrollTop += distance;
        } else {
          scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
        }
      }
      // move widget y by amount scrolled
      position.top += scrollEl.scrollTop - prevScroll;
    }
  }
}

export function updateScrollResize(event: MouseEvent, el: HTMLElement, distance: number): void {
  const scrollEl = getScrollElement(el);
  const height = scrollEl.clientHeight;
  // #1727 event.clientY is relative to viewport, so must compare this against position of scrollEl getBoundingClientRect().top
  // #1745 Special situation if scrollEl is document 'html': here browser spec states that
  // clientHeight is height of viewport, but getBoundingClientRect() is rectangle of html element;
  // this discrepancy arises because in reality scrollbar is attached to viewport, not html element itself.
  const offsetTop = scrollEl === getScrollElement() ? 0 : scrollEl.getBoundingClientRect().top;
  const pointerPosY = event.clientY - offsetTop;
  const top = pointerPosY < distance;
  const bottom = pointerPosY > height - distance;

  if (top) {
    // This also can be done with a timeout to keep scrolling while the mouse is
    // in the scrolling zone. (will have smoother behavior)
    scrollEl.scrollBy({ behavior: 'smooth', top: pointerPosY - distance });
  } else if (bottom) {
    scrollEl.scrollBy({ behavior: 'smooth', top: distance - (height - pointerPosY) });
  }
}
