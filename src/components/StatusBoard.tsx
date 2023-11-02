"use client";
import { Task } from "@/types"
import useTaskStore from '@/src/store/task'
import useBoardStore from '@/src/store/board'
import { conditionForDone, conditionForTodo } from '@/src/utils/task'

interface Props {
}
export default function StatusBoard(props: Props) {
  const { tasks } = useTaskStore();
  const { status } = useBoardStore();

  const cursorForTask = tasks.filter(conditionForTodo).shift();
  const currentTask = cursorForTask ? `${cursorForTask.text} ${status}` : `처리해야할 일이 없습니다.`;

  const lengthOfDone = tasks.filter(conditionForDone).length;

  return (
    <div>
      <p>{currentTask}</p>
      <p>{lengthOfDone} / {tasks.length}</p>
    </div>
  )
}