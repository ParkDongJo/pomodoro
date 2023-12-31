"use client";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import Checkbox from '@mui/material/Checkbox';
import { showTimeTmpl } from "@/src/utils/timer";
import { Task } from "@/types";

interface Props {
  task: Task;
  rightRsx?: React.ReactNode;
  onCheck?: (id: number) => void;
}
export default function TaskRow(props: Props) {
  const { task, rightRsx, onCheck } = props;
  const [checked, setChecked] = useState<boolean>(task.done);
  
  const handleCheck = () => {
    setChecked(!checked);
    onCheck?.(task.id);
  }

  useEffect(() => {
    setChecked(task.done)
  }, [task.done])

  return (
    <Container onClick={handleCheck}>
      <Checkbox size="medium" edge="start" checked={checked} disableRipple />
      <span>{task.text}</span>
      <span>{showTimeTmpl(task.learnTime?.minutes)} : {showTimeTmpl(task.learnTime?.seconds)}</span>
      <span> / </span>
      <span>{showTimeTmpl(task.breakTime?.minutes)} : {showTimeTmpl(task.breakTime?.seconds)}</span>
      <Right>
        {rightRsx}
      </Right>
    </Container>)
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 2;
`;
const Right = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
