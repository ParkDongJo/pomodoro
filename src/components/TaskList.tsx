"use client";
import React, { useEffect, useState } from 'react'
import Task from './Task'
import { Task as TaskType } from '../../types'
import styles from '../styles/task.module.css'
import useTask from '@/src/hooks/useTask'
import useStore from '@/src/store/task'

interface Props {
}
export default function TaskList() {
  const { getTasks } = useTask();
  const store = useStore();
  // const [datas, setDatas] = useState<TaskType[]>([]);

  useEffect(() => {
    const tasks = getTasks();
    store.setTasks(tasks);
    // setDatas(tasks)
  }, [])

  return (<div className={styles.tasks}>
    {store.tasks?.map((data, index) => (
      <Task key={`${data.text}-${index}`} {...data} />
    ))}
  </div>)
}
