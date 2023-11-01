"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"
import useTimer from "../hooks/useTimer";
import useTask from '@/src/hooks/useTask'
import { Time, Task } from '@/types'

export default function Timer() {
  const {
    learnTime,
    breakTime,
    repeatUntil,
    stopRepeat,
    setLearnTime,
    setBreakTime,
  } = useTimer()
  const { checkTask, popTask, getTaskLength } = useTask()

  const condition = (task: Task) => task.done

  const showTimeTmpl = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
  }
  const repeat = (times: number) => {
    repeatUntil(times, () => {
      const task = popTask(condition)
      checkTask(task.id)
    })
  }

  const handleStart = () => {
    repeat(1)
  }

  const handleRepeat = () => {
    const length = getTaskLength(condition)
    repeat(length)
  }
  const handleStopRepeat = () => {
    stopRepeat()
  }

  const handleClickTime = (lt: Time, bt: Time) => {
    setLearnTime(lt.minutes * 60 + lt.seconds)
    setBreakTime(bt.minutes * 60 + bt.seconds)
  }

  return (
  <div className={styles.main}>
    <TimeList onClick={handleClickTime} />
    <p>{showTimeTmpl(learnTime.minutes)} : {showTimeTmpl(learnTime.seconds)}</p>
    <p>{showTimeTmpl(breakTime.minutes)} : {showTimeTmpl(breakTime.seconds)}</p>
    <IconButton onClick={handleStart} />
    <IconButton onClick={handleStopRepeat} />
    <div>
      <IconButton onClick={handleRepeat} />
      <IconButton onClick={handleStopRepeat} />
    </div>
  </div>)
}
