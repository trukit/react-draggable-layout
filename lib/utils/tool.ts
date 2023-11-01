import { Layout, LayoutPosition } from '../types';

export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export function getKeyByValue<T extends object, K extends keyof T>(obj: T, value: T[K]): K | undefined {
  return (Object.keys(obj) as K[]).find((key) => obj[key] === value) as K;
}

/**
 * 合并样式类，例如：
 * classnames('class1', 'class2', 'class3')
 * classnames('class1', {'class2': isActive}, 'class3') // 当isActive为true时，class2才会存在
 * classnames('class1', ['class2', 'class3'])
 */
export function cls(...classNamesList: Array<string | string[] | { [K: string]: boolean } | undefined>) {
  return classNamesList
    .filter((item) => !!item)
    .map((item) => {
      if (typeof item === 'object' && !Array.isArray(item)) {
        return Object.keys(item).filter((key) => item[key]);
      }
      return item;
    })
    .toString()
    .split(',')
    .join(' ')
    .trim();
}

/** returns true if a and b overlap */
export function isIntercepted(a: LayoutPosition, b: LayoutPosition): boolean {
  return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
}

export function copyPos(a: Layout, b: Layout, doMinMax = false): Layout {
  if (b.x !== undefined) a.x = b.x;
  if (b.y !== undefined) a.y = b.y;
  if (b.w !== undefined) a.w = b.w;
  if (b.h !== undefined) a.h = b.h;
  if (doMinMax) {
    if (b.minW !== undefined) a.minW = b.minW;
    if (b.minH !== undefined) a.minH = b.minH;
    if (b.maxW !== undefined) a.maxW = b.maxW;
    if (b.maxH !== undefined) a.maxH = b.maxH;
  }
  return a;
}
