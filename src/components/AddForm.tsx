"use client";
import React, { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton, { ICON } from "@/src/components/IconButton";
import TaskForm from "@/src/components/TaskForm";

const AddForm = () => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible)
  }
  
  return (
    <>
      <ListItemButton
        sx={{ width: "100%", maxWidth: 600, border: "1px dashed #eee" }}
        onClick={handleClick}
      >
        <IconButton icon={ICON.ADD_CIRCLE_OUTLINE} />
        <span>ADD TASK</span>
      </ListItemButton>
      <TaskForm visible={visible} />
    </>
  )
}
export default AddForm;

