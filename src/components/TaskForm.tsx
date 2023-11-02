"use client";
import { useEffect, useState } from 'react';
import styled from "@emotion/styled"
import Input from './Input';
import useTask from '../hooks/useTask';

interface Props {
  visible?: boolean;
}
export default function TaskFrom({ visible }: Props) {
  const { addTask } = useTask();
  const [value, setValue] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!value) return;
    e.preventDefault();
    addTask(value);
    setValue(undefined);
  }
  const handleChange = (value: string | number) => {
    setValue(value.toString());
  }

  useEffect(() => {
    setValue(undefined)
  }, [visible])

  if (!visible) {
    return null
  }
  return (
    <From onSubmit={handleSubmit}>
      <Input type="text" name="new-task" value={value} onChange={handleChange} />
      <button type="submit">Add</button>
    </From>
  )
}

const From = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
