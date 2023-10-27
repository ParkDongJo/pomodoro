"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"
import useTimer from "../hooks/useTimer";
import useTask from '@/src/hooks/useTask'
import { Time } from '@/types'

export default function Timer() {
  const {
    learnTime,
    breakTime,
    start,
    stop,
    repeatUntil,
    stopRepeat,
    setLearnTime,
    setBreakTime,
  } = useTimer()
  const { checkTask, popTask, checkTaskOfTop } = useTask()

  const showTimeTmpl = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
  }
  const handleStart = () => {
    const task = popTask((task) => !task.done)
    start(() => checkTask(task.id))
  }
  const handleRepeat = () => {
    const task$ = checkTaskOfTop()
    repeatUntil(3, task$)
  }
  const handleStopRepeat = () => {
    stopRepeat()
  }
  const handleStop = () => {
    stop()
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
    <IconButton onClick={handleStop} />
    <div>
      <IconButton onClick={handleRepeat} />
      <IconButton onClick={handleStopRepeat} />
    </div>
  </div>)
}
