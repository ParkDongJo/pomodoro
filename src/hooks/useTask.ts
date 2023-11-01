import { BehaviorSubject } from 'rxjs';
import useLocalStorage from '../hooks/useLocalStorage';
import { incrementId, STORAGE_KEY } from '@/src/utils/task';
import { pipe } from '@/src/utils/common';
import useStore from '@/src/store/task';
import { updateDone } from '@/src/utils/task';
import { Task } from '@/types';
import { Subscription, interval, map, tap, take, filter, from } from 'rxjs';

export const observable = new BehaviorSubject(0);

const useTask = () => {
  const { getItems, setItems } = useLocalStorage();
  const store = useStore();

  const generateId = pipe(
    getItems,
    incrementId
  )

  const addTask = (value: string) => {
    const tasks = getTasks()
    const nextId = generateId(STORAGE_KEY)
    const newTask = { id: nextId, text: value, done: false, startTime: new Date(), endTime: new Date() }

    setItems?.(STORAGE_KEY, [ ...tasks , newTask ])
    store.addTask(newTask);
  }

  const getTasks = () => {
    return getItems?.(STORAGE_KEY) || [];
  }

  const checkTask = (id: number) => {
    const tasks = getTasks()
    const newTasks = tasks.map(updateDone(id));

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

  const checkTaskOfTop = () => {
    return from(store.tasks).pipe(
      filter((task) => !task.done),
      take(1)
    )
  }

  const getTaskLength = (cond?: (task: Task) => boolean) => {
    if (!cond) {
      return store.tasks.length;
    }
    return store.tasks.filter(cond).length;
  }

  return {
    addTask,
    getTasks,
    checkTask,
    popTask,
    checkTaskOfTop,
    getTaskLength,
  }
}
export default useTask;
