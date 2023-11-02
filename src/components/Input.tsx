"use client";
import React from 'react';

interface Props {
  name: string;
  type: "text" | "number" | "email" | "password";
  placeholder?: string;
  value?: string | number;
  onChange?: ((value: string | number) => void);
}
export default function Input(props: Props) {
  const { name, value = "", placeholder, onChange } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value)
  }

  return (
    <div>
      <input
        type="text"
        autoComplete="off"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
