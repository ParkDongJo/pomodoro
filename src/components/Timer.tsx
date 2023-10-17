"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"
import useTimer from "../hooks/useTimer";

export default function Timer() {
  const timer = useTimer()

  const showTimeTmpl = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
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
    <p>{showTimeTmpl(timer.minutes)} : {showTimeTmpl(timer.seconds)}</p>
    <IconButton onClick={handleStart} />
    <IconButton onClick={handleStop} />
  </div>)
}
