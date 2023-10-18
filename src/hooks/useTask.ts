import useLocalStorage from '../hooks/useLocalStorage';
import { incrementId, STORAGE_KEY } from "../utils/task";

const useTask = () => {
  const { getItems, setItems } = useLocalStorage();

  const addTask = (value: string) => {
    const tasks = getItems?.(STORAGE_KEY)
    const nextId = incrementId(tasks);
    const newTask = { id: nextId, text: value, done: false, startTime: new Date(), endTime: new Date() }

    setItems?.(STORAGE_KEY, [ ...tasks , newTask ])
  }

  const getTasks = () => {
    return getItems?.(STORAGE_KEY);
  }

  return {
    addTask,
    getTasks,
  }
}
export default useTask;
