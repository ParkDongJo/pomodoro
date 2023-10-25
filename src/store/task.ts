import { create } from 'zustand';
import { Task } from '@/types';
import { updateDone } from "@/src/utils/task"

interface Store {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  checkTask: (id: number) => void;
}
const useStore = create<Store>((set) => ({
  tasks: [],
  setTasks: (tasks) => set(() => ({ tasks })),
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  checkTask: (id: number) => set((state) => ({ tasks: state.tasks.map(updateDone(id)) })),
}))
export default useStore;
