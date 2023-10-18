import { use } from "react"
import Header from "@/src/layouts/Nav";
import Timer from "@/src/components/Timer";
import TaskList from "@/src/components/TaskList";
import IconButton from "@/src/components/IconButton";
import StatusBoard from "@/src/components/StatusBoard";
import TaskForm from "@/src/components/TaskForm";
import useTask from "@/src/hooks/useTask";
import { Task } from '@/types'

const fetchTasks = async () => {
  // const res = await fetch("http://localhost:3000/api/tasks");
  // const data = await res.json();
  return [
    { id: 1, text: '9:00', done: true, startTime: new Date(), endTime: new Date() },
    { id: 2, text: '9:00', done: true, startTime: new Date(), endTime: new Date() },
    { id: 3, text: '9:00', done: true, startTime: new Date(), endTime: new Date() },
  ] as Task[];
}

export default function Home() {
  const tasks = use(fetchTasks());

  return (
    <>
      <Header />
      <Timer />
      <StatusBoard order={1} task={'test'} />
      <TaskList />
      <IconButton />
      <TaskForm />
    </>
  )
};
