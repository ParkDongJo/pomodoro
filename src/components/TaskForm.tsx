"use client";
import { useTransition, useState } from 'react';
import Input from './Input';
import useTask from '../hooks/useTask';

interface Props {
}
export default function TaskFrom(props: Props) {
  const { addTask } = useTask();
  const [_, startTransition] = useTransition();
  const [value, setValue] = useState<string>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!value) return;
    e.preventDefault();
    addTask(value);
    setValue(undefined);
  }
  const handleChange = (value: string | number) => {
    startTransition(() => {
      setValue(value.toString());
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="new-task" value={value} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}
