/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import _ from 'lodash-es'

export const pipe = (...fns: any[]) => _.flow(fns);

export const alt = (func1: any, func2: any) => {
  return (val: any) => {
    return func1(val) || func2(val)
  }
}
