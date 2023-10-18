export const wrapRunWhenWindow = <T>(fn: Function) => {
  if (typeof window === 'undefined') {
    return;
  }
  return (...arg: T[]) => fn(...arg);
}