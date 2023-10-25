export function clamp(num: number, min: number, max: number) {
  return num <= min ? min : num >= max ? max : num;
}

export function getKeyByValue<T extends object, K extends keyof T>(obj: T, value: T[K]): K | undefined {
  return (Object.keys(obj) as K[]).find((key) => obj[key] === value) as K;
}
