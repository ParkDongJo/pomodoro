"use client";
import { useState, useEffect } from "react";
import styles from "../styles/task.module.css"
import { set } from "lodash-es";

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

  useEffect(() => {
    setChecked(done)
  }, [done])

  return (
    <div className={styles.task} onClick={onCheck}>
      <input type="checkbox" checked={checked} />
      <span>{text}</span>
      {done && <span>done</span>}
    </div>)
}
