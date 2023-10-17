"use client";
import { useTransition, useState } from 'react';
import Input from './Input';

interface Props {
}
export default function TaskFrom(props: Props) {
  const [_, startTransition] = useTransition();
  const [value, setValue] = useState<string | number>();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 처리
    setValue(undefined)
  }
  const handleChange = (value: string | number) => {
    startTransition(() => {
      setValue(value)
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
