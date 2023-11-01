"use client";
import { useState } from "react";
import styles from "../styles/task.module.css"

interface Props {
  text: string;
  done: boolean;
}
export default function Task(props: Props) {
  const { text, done } = props;
  const [checked, setChecked] = useState<boolean>(done);
  
  const onCheck = () => {
    setChecked(!checked);
  }
  console.log('render task', done)
  return (
    <div className={styles.task} onClick={onCheck}>
      <input type="checkbox" checked={checked} />
      <span>{text}</span>
      {done && <span>done</span>}
    </div>)
}
