import { curry } from 'lodash-es'
import { Task, Time } from '@/types'

export const STORAGE_KEY = 'tasks'
export const DEFAULT_TIME = { minutes: 0, seconds: 0 }

export const incrementId = <T>(datas: T[]) => datas.length + 1

export const updateDone = curry((id: number, task: Task) => {
  return task.id === id ? { ...task, done: !task.done } : task
})

export const changeTask = curry((newTask: Task, task: Task) => {
  return task.id === newTask.id ? newTask : task
})

export const conditionForTodo = (task: Task) => !task.done

export const conditionForDone = (task: Task) => task.done

export const extractTime = (task?: Task): { lt: Time; bt: Time } => {
  if (!task) {
    return { lt: DEFAULT_TIME, bt: DEFAULT_TIME }
  }

  const { learnTime, breakTime } = task
  return { lt: learnTime ?? DEFAULT_TIME, bt: breakTime ?? DEFAULT_TIME }
}
