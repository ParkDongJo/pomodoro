import _ from 'lodash-es'

export const pipe = (...fns: any[]) => _.flow(fns);
