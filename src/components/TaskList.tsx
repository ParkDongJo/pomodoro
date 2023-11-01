"use client";
import React, { useEffect, useState } from 'react'
import Task from './Task'
import styles from '../styles/task.module.css'
import useTask from '@/src/hooks/useTask'
import useStore from '@/src/store/task'
import useCount, { observable } from '@/src/hooks/useCount'

export default function TaskList() {
  const { getTasks } = useTask();
  const store = useStore();
  const count = useCount()

  const handleClick = () => {
    observable.next(count + 1)
  }

  useEffect(() => {
    const tasks = getTasks();
    store.setTasks(tasks);
  }, [])

  return (<div className={styles.tasks}>
    {store.tasks?.map((data, index) => (
      <Task key={`${data.text}-${index}`} {...data} />
    ))}
    <div>count : {count}</div>
    <button onClick={handleClick}>TEST</button>
  </div>)
}
