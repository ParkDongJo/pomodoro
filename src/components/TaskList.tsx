"use client";
import React, { useEffect, useState } from 'react'
import Task from './Task'
import styles from '../styles/task.module.css'
import useTask from '@/src/hooks/useTask'
import useStore from '@/src/store/task'

export default function TaskList() {
  const { getTasks, checkTask } = useTask();
  const store = useStore();

  const handleCheck = (id: number) => {
    checkTask(id);
  }

  useEffect(() => {
    const tasks = getTasks();
    store.setTasks(tasks);
  }, [])

  return (<div className={styles.tasks}>
    {store.tasks?.map((data, index) => (
      <Task key={`${data.text}-${index}`} {...data} onCheck={handleCheck} />
    ))}
  </div>)
}
