import { Task } from './../../types';

export default class TaskStorage {
  getTasks(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return  tasks ? JSON.parse(tasks) : [];
  }

  getTask(id: number): Task | undefined {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id);
  }

  setTasks(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  setTask(task: Task): void {
    const tasks = this.getTasks();
    this.setTasks([...tasks, task]);
  }

  updateTask(task: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === task.id);
    tasks[index] = task;
    this.setTasks(tasks);
  }
}
