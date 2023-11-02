"use client";
import React, { useState } from 'react';
import IconButton from "@/src/components/IconButton";
import TaskForm from "@/src/components/TaskForm";

const AddForm = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible)
  }
  
  return (
    <>
      <IconButton title={"추가하기"} onClick={handleClick} />
      <TaskForm visible={visible} />
    </>
  )
}
export default AddForm;

