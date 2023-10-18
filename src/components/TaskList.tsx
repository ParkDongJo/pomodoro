"use client";
import React, { useEffect, useState } from 'react'
import Task from './Task'
import { Task as TaskType } from '../../types'
import styles from '../styles/task.module.css'
import useTask from '@/src/hooks/useTask'

interface Props {
}
export default function TaskList() {
  const { getTasks } = useTask();
  const [datas, setDatas] = useState<TaskType[]>([]);

  useEffect(() => {
    const tasks = getTasks();
    setDatas(tasks)
  }, [])

  return (<div className={styles.tasks}>
    {datas?.map((data, index) => (
      <Task key={`${data.text}-${index}`} {...data} />
    ))}
  </div>)
}
