"use client";
import { useEffect, useState } from 'react';
import styled from "@emotion/styled"
import Button from "@/src/components/Button";
import Input from './Input';
import useTask from '../hooks/useTask';

interface Props {
  visible?: boolean;
}
export default function TaskFrom({ visible }: Props) {
  const { addTask } = useTask();
  const [value, setValue] = useState<string>();

  const handleSubmit = () => {
    if (!value) return;
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
    <From>
      <Input type="text" name="new-task" value={value} onChange={handleChange} />
      <Button size="large" title="ADD" onClick={handleSubmit} />
    </From>
  )
}

const From = styled.form`
  display: flex;
  width: 100%;
  max-width: 600px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
`
