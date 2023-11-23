"use client";
import styled from "@emotion/styled"
import useTaskStore from '@/src/store/task'
import useBoardStore from '@/src/store/board'
import { conditionForDone, conditionForTodo } from '@/src/utils/task'

export default function StatusBoard() {
  const { tasks } = useTaskStore();
  const { status } = useBoardStore();

  const cursorForTask = tasks.filter(conditionForTodo).shift();
  const currentTask = cursorForTask ? `${cursorForTask.text} ${status}` : `처리해야할 일이 없습니다.`;

  const lengthOfDone = tasks.filter(conditionForDone).length;

  return (
    <Container>
      <StatusText>{lengthOfDone} / {tasks.length}</StatusText>
      <TaskText>{currentTask}</TaskText>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  gap: 5px;
`;
const StatusText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: #ccc;
  text-align: center;
`;
const TaskText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 20px;
  color: #fff;
  text-align: center;
`;