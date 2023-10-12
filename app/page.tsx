import { use } from "react"
import Header from "./layouts/Nav";
import Timer from "../components/Timer";
import TaskList from "../components/TaskList";
import IconButton from "../components/IconButton";
import { Task } from './../types'

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
      <TaskList datas={tasks} />
      <IconButton />
    </>
  )
};
