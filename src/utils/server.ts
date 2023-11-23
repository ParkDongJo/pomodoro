/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/ban-types */
export const wrapRunWhenWindow = <T>(fn: Function) => {
  if (typeof window === 'undefined') {
    return;
  }
  return (...arg: T[]) => fn(...arg);
}