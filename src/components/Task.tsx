"use client";
import { useState, useEffect } from "react";
import styles from "../styles/task.module.css"
import { set } from "lodash-es";

interface Props {
  id: number;
  text: string;
  done: boolean;
  onCheck?: (id: number) => void;
}
export default function Task(props: Props) {
  const { id, text, done, onCheck } = props;
  const [checked, setChecked] = useState<boolean>(done);
  
  const handleCheck = () => {
    setChecked(!checked);
    onCheck?.(id);
  }

  useEffect(() => {
    setChecked(done)
  }, [done])

  return (
    <div className={styles.task} onClick={handleCheck}>
      <input type="checkbox" checked={checked} />
      <span>{text}</span>
      {done && <span>done</span>}
    </div>)
}
