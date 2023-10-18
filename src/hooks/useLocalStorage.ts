import { wrapRunWhenWindow } from '@/src/utils/server';
import { Task} from '@/types';

interface ItemWithId {
  id: number;
}

const useLocalStorage = () => {
  const getItems = wrapRunWhenWindow(<T extends ItemWithId>(key: string): T[] => {
    const tasks = localStorage.getItem(key);
    return  tasks ? JSON.parse(tasks) : [];
  })

  const getItem = <T extends ItemWithId>(key: string, id: number): T|undefined => {
    const items: T[] = getItems?.(key);
    return items.find(item => item.id === id);
  }

  const setItems = wrapRunWhenWindow(<T extends ItemWithId>(key: string, items: T[]) => {
    localStorage.setItem(key, JSON.stringify(items));
  })

  const setItem = <T extends ItemWithId>(key: string, item: T) => {
    const items = getItems?.(key);
    setItems?.(key, [...items, item]);
  }

  const updateItems = <T extends ItemWithId>(key: string, item: T) => {
    const items = getItems?.(key);
    const index = items.findIndex((t: T) => t.id === item.id);
    items[index] = item;
    setItems?.(key, items);
  }

  return {
    getItems,
    getItem,
    setItems,
    setItem,
    updateItems,
  }
}
export default useLocalStorage;
