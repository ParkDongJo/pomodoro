export const STORAGE_KEY = 'tasks'

export type Task = {
  id: number;
  text: string;
  done: boolean;
}

export const incrementId = <T>(datas: T[]) => datas.length + 1
