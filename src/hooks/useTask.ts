import useLocalStorage from '../hooks/useLocalStorage';
import { incrementId, STORAGE_KEY, Task } from "../utils/task";

const useTask = () => {
  const { getItems, setItems } = useLocalStorage();

  const addTask = (value: string) => {
    const tasks = getItems<Task>(STORAGE_KEY)
    const nextId = incrementId(tasks);
    const newTask = { id: nextId, text: value, done: false }

    setItems<Task>(STORAGE_KEY, [ ...tasks , newTask ])
  }

  return {
    addTask,
  }
}
export default useTask;
