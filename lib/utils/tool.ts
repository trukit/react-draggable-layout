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
