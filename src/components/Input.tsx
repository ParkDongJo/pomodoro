"use client";
import React from 'react';

interface Props {
  name: string;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  value?: string | number;
  onChange?: ((value: string) => void) | ((value: number) => void);
}
export default function Input(props: Props) {
  const { name, value = "", placeholder, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(value)
  }

  return (
    <div>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
