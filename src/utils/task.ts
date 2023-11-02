import { curry } from 'lodash-es'
import { Task } from '@/types'

export const STORAGE_KEY = 'tasks'

export const incrementId = <T>(datas: T[]) => datas.length + 1

export const updateDone = curry((id: number, task: Task) => {
  return task.id === id ? { ...task, done: !task.done } : task
})

export const conditionForTodo = (task: Task) => !task.done

export const conditionForDone = (task: Task) => task.done
