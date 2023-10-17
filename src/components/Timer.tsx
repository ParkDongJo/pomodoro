"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"
import useTimer from "../hooks/useTimer";

export default function Timer() {
  const timer = useTimer()

  const getSeconds = (time: number) => {
    const seconds = Number(time % 60);
    return seconds < 10 ? `0${seconds}` : String(seconds);
  }
  const handleStart = () => {
    timer.start()
  }
  const handleStop = () => {
    timer.stop()
  }

  return (
  <div className={styles.main}>
    <TimeList />
    <p>{Math.floor(timer.time / 60)} : {getSeconds(timer.time)}</p>
    <IconButton onClick={handleStart} />
    <IconButton onClick={handleStop} />
  </div>)
}
