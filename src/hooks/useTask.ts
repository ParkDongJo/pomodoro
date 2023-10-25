import { BehaviorSubject } from 'rxjs';
import useLocalStorage from '../hooks/useLocalStorage';
import { incrementId, STORAGE_KEY } from '@/src/utils/task';
import { pipe } from '@/src/utils/common';
import useStore from '@/src/store/task';
import { updateDone } from '@/src/utils/task';
import { Task } from '@/types';

export const observable = new BehaviorSubject(0);

const useTask = () => {
  const { getItems, setItems } = useLocalStorage();
  const store = useStore();

  const generateId = pipe(
    getItems,
    incrementId
  )

  const addTask = (value: string) => {
    const tasks = getItems?.(STORAGE_KEY)
    const nextId = generateId(STORAGE_KEY)
    const newTask = { id: nextId, text: value, done: false, startTime: new Date(), endTime: new Date() }

    setItems?.(STORAGE_KEY, [ ...tasks , newTask ])
    store.addTask(newTask);
  }

  const getTasks = () => {
    return getItems?.(STORAGE_KEY);
  }

  const checkTask = (id: number) => {
    const tasks = getItems?.(STORAGE_KEY)
    const newTasks = tasks.map(updateDone(id));

    setItems?.(STORAGE_KEY, newTasks);
    store.checkTask(id);
  }

  const popTask = (cond?: (task: Task) => boolean) => {
    const tasks = getItems?.(STORAGE_KEY)
    if (!cond) {
      return tasks.shift();
    }
    return tasks
      .filter((task: Task) => cond(task))
      .shift();
  }

  return {
    addTask,
    getTasks,
    checkTask,
    popTask,
  }
}
export default useTask;
