import { use } from "react";

interface ItemWithId {
  id: number;
}

const useLocalStorage = () => {
  const getItems = <T extends ItemWithId>(key: string): T[] => {
    const tasks = localStorage.getItem(key);
    return  tasks ? JSON.parse(tasks) : [];
  }

  const getItem = <T extends ItemWithId>(key: string, id: number): T|undefined => {
    const items: T[] = getItems(key);
    return items.find(item => item.id === id);
  }

  const setItems = <T extends ItemWithId>(key: string, items: T[]) => {
    localStorage.setItem(key, JSON.stringify(items));
  }

  const setItem = <T extends ItemWithId>(key: string, item: T) => {
    const items = getItems<T>(key);
    setItems<T>(key, [...items, item]);
  }

  const updateItems = <T extends ItemWithId>(key: string, item: T) => {
    const items = getItems<T>(key);
    const index = items.findIndex(t => t.id === item.id);
    items[index] = item;
    setItems<T>(key, items);
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
