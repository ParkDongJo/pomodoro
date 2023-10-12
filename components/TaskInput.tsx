"use client";
import { useState } from "react";
import Input from "./../components/Input"
import Button from "./Button";

export default function TaskInput() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    setValue("");
  }
  return <div>
    <Input />
    <Button onClick={handleSubmit} />
  </div>
}
