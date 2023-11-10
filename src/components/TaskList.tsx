"use client";
import React, { useEffect, useState } from 'react';
import _ from "lodash-es";
import styled from "@emotion/styled";
import useStore from '@/src/store/task';
import useTask from '@/src/hooks/useTask';
import { extractTime } from "@/src/utils/task";
import TaskRow from "@/src/components/TaskRow";
import Popup from "@/src/components/Popup";
import TimeSetting from "@/src/components/TimeSetting";
import Button from "@/src/components/Button";
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
      <Container>
      {store.tasks?.map((data, index) => (
        <TaskRow key={`${data.text}-${index}`} 
          task={data}
          onCheck={handleCheck}
          rightRsx={<Button title={"타이머 설정"} onClick={() => handleOpenPopup(data)} />}
        />
      ))}
      </Container>
      <Popup visible={!!selectedTask} onclose={handleClosePopup}>
        <TimeSetting initialTime={extractTime(selectedTask)} onComplete={handleAddPomodoro} />
      </Popup>
    </>)
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1rem;
  width: 100%;
`;
