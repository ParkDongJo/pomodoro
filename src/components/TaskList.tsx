"use client";
import React, { useEffect, useState } from 'react';
import _ from "lodash-es";
import styled from "@emotion/styled";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import TaskRow from "@/src/components/TaskRow";
import Popup from "@/src/components/Popup";
import TimeSetting from "@/src/components/TimeSetting";
import IconButton, { ICON } from "@/src/components/IconButton";
import useStore from '@/src/store/task';
import useTask from '@/src/hooks/useTask';
import { extractTime } from "@/src/utils/task";
import { Time, Task } from '@/types';

export default function TaskList() {
  const { getTasks, checkTask, updateTask } = useTask();
  const [selectedTask, setSelectedTask] = useState<Task>();
  const store = useStore();

  const handleCheck = (id: number) => {
    checkTask(id);
  }
  const handleOpenPopup = (task: Task) => {
    setSelectedTask(task)
  }
  const handleClosePopup = () => {
    setSelectedTask(undefined)
  }
  const handleAddPomodoro = (learnTime: Time, breakTime: Time) => {
    if (!selectedTask) {
      throw new Error("선택된 태스크가 없습니다.")
    };
    const task = _.cloneDeep(selectedTask)
    updateTask({...task, learnTime, breakTime})
    setSelectedTask(undefined)
  }

  useEffect(() => {
    const tasks = getTasks()
    store.setTasks(tasks)
    store.setCurrentTask(tasks[0])
  }, [])

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 600 }}>
      {store.tasks?.map((data, index) => (
        <ListItem
          key={`${data.text}-${index}`}
          sx={{ paddingTop: 0, paddingBottom: 0 }}>
          <ListItemButton
            sx={{ borderBottom: "1px solid #eee" }}
            onClick={() => handleCheck(data.id)} dense>
            <TaskRow  
              task={data}
              rightRsx={<IconButton icon={ICON.ACCESS_TIME} onClick={() => handleOpenPopup(data)} />}
            />
          </ListItemButton>
        </ListItem>
      ))}
      </List>
      <Popup visible={!!selectedTask} onclose={handleClosePopup}>
        <TimeSetting initialTime={extractTime(selectedTask)} onComplete={handleAddPomodoro} />
      </Popup>
    </>)
}
