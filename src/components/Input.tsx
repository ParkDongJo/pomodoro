"use client";
import React from 'react';
import TextField from '@mui/material/TextField';

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
    <TextField 
      id="outlined-required"
      fullWidth
      label="New Task"
      variant="filled"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      focused
      sx={{ input: { color: 'white' } }}
    />
  )
}
