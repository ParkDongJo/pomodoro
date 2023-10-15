import React from 'react'
import Task from './Task'
import { Task as TaskType } from '../../types'
import styles from '../styles/task.module.css'

interface Props {
  datas: TaskType[];
}
export default function TaskList(props: Props) {
  const { datas } = props;

  return (<div className={styles.tasks}>
    {datas.map((data, index) => (
      <Task key={`${data.text}-${index}`} {...data} />
    ))}
  </div>)
}
