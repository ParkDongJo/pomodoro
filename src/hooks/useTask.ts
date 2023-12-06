/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { BehaviorSubject } from 'rxjs';
import _ from "lodash-es"
import useLocalStorage from '../hooks/useLocalStorage';
import { incrementId, STORAGE_KEY } from '@/src/utils/task';
import { pipe } from '@/src/utils/common';
import useStore from '@/src/store/task';
import { updateDone, changeTask } from '@/src/utils/task';
import { Task } from '@/types';

export const observable = new BehaviorSubject(0);

const useTask = () => {
  const { getItems, setItems } = useLocalStorage();
  const store = useStore();

  const createTask = _.curry((value: string, nextId: number) => {
    return { id: nextId, text: value, done: false, startTime: new Date(), endTime: new Date() }
  })

  const createNewTask = (value: string) => pipe(
    getItems,
    incrementId,
    createTask(value)
  )

  const addTask = (value: string) => {
    const tasks = getTasks()
    const newTask: Task = createNewTask(value)(STORAGE_KEY)

    setItems?.(STORAGE_KEY, [ ...tasks , newTask ])
    store.addTask(newTask);
  }

  const updateTask = (task: Task) => {
    const tasks = getTasks().map(changeTask(task));

    setItems?.(STORAGE_KEY, tasks);
    store.setTasks(tasks);
  }

  const getTasks = (): Task[] => {
    return getItems(STORAGE_KEY) as Task[] || [];
  }


  const checkTask = (id?: number) => {
    if (!id) {
      throw new Error("id is required")
    };
    const newTasks = getTasks().map(updateDone(id));

    setItems?.(STORAGE_KEY, newTasks);
    store.checkTask(id);
  }

  const popTask = (cond?: (task: Task) => boolean) => {
    const tasks = getTasks()
    if (!cond) {
      return tasks.shift();
    }
    return tasks
      .filter((task: Task) => cond(task))
      .shift();
  }

  const getTaskLength = (cond?: (task: Task) => boolean) => {
    if (!cond) {
      return store.tasks.length;
    }
    return store.tasks.filter(cond).length;
  }

  return {
    addTask,
    updateTask,
    getTasks,
    checkTask,
    popTask,
    getTaskLength,
  }
}
export default useTask;
