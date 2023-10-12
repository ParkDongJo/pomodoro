"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"

export default function Timer() {
  return (
  <div className={styles.main}>
    <TimeList />
    <p>25:00</p>
    <IconButton />
  </div>)
}
