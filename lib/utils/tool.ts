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
    .toString() // 输出 class1,class2,class3,...
    .split(',')
    .join(' ')
    .trim();
}

const docScrollElement = (document.scrollingElement as HTMLElement) || document.documentElement;
/**
 * 获取滚动元素
 * @param el 传入的元素节点（可选）
 * @returns 返回滚动元素
 */
export function getScrollElement(el?: HTMLElement): HTMLElement {
  if (!el) {
    return docScrollElement;
  }
  const style = getComputedStyle(el);
  const overflowRegex = /(auto|scroll)/;
  if (overflowRegex.test(style.overflow + style.overflowY)) {
    return el;
  } else if (el.parentElement) {
    return getScrollElement(el.parentElement);
  }
  return docScrollElement;
}

// TODO: 有Bug，待解决
export function updateScroll(el: HTMLElement, distance: number) {
  const rect = el.getBoundingClientRect();
  const innterHeightOrClientHeight = window.innerHeight || document.documentElement.clientHeight;
  if (rect.top >= 0 || rect.bottom <= innterHeightOrClientHeight) return;
  const offsetDiffDown = rect.bottom - innterHeightOrClientHeight;
  const offsetDiffUp = rect.top;
  const scrollEl = getScrollElement(el);
  if (!scrollEl) return;
  const prevScrollTop = scrollEl.scrollTop;
  console.log('🚀 ~ file: tool.ts:60 ~ updateScroll ~ prevScrollTop:', prevScrollTop);
  let nextScrollTop = rect.height + prevScrollTop;
  if (rect.top < 0 && distance < 0) {
    // 上滑
    if (el.offsetHeight > innterHeightOrClientHeight) {
      nextScrollTop += distance;
    } else {
      const dis = Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
      nextScrollTop += dis;
    }
  } else if (distance > 0) {
    if (el.offsetHeight > innterHeightOrClientHeight) {
      nextScrollTop = distance + el.offsetHeight - innterHeightOrClientHeight;
    } else {
      nextScrollTop += offsetDiffDown;
    }
  }
  scrollEl.scrollTo({
    top: nextScrollTop,
    behavior: 'smooth',
  });
}
