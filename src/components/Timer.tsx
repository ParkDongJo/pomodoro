"use client";
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimerHeader from "./TimerHeader"
import useTimer from "../hooks/useTimer";
import useTask from '@/src/hooks/useTask'
import { Time, Task } from '@/types'
import { conditionForTodo } from '@/src/utils/task'

export default function Timer() {
  const {
    learnTime,
    breakTime,
    repeatUntil,
    stopRepeat,
    initLearnTime,
    initBreakTime,
  } = useTimer()
  const { checkTask, popTask, getTaskLength } = useTask()

  const showTimeTmpl = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
  }
  const repeat = (times: number) => {
    repeatUntil(times, () => {
      const task = popTask(conditionForTodo)
      task?.id && checkTask(task.id)
    })
  }

  const handleStart = () => {
    repeat(1)
  }

  const handleRepeat = () => {
    const length = getTaskLength(conditionForTodo)
    repeat(length)
  }
  const handleStopRepeat = () => {
    stopRepeat()
  }

  const handleClickTime = (lt: Time, bt: Time) => {
    initLearnTime(lt.minutes * 60 + lt.seconds)
    initBreakTime(bt.minutes * 60 + bt.seconds)
  }

  return (
  <div className={styles.main}>
    <TimerHeader setTimer={handleClickTime} />
    <p>{showTimeTmpl(learnTime.minutes)} : {showTimeTmpl(learnTime.seconds)}</p>
    <p>{showTimeTmpl(breakTime.minutes)} : {showTimeTmpl(breakTime.seconds)}</p>
    <IconButton title={"1회 실행하기"} onClick={handleStart} />
    <IconButton title={"1회 실행 멈추기"} onClick={handleStopRepeat} />
    <div>
      <IconButton title={"연속 실행하기"} onClick={handleRepeat} />
      <IconButton title={"연속 실행 멈추기"} onClick={handleStopRepeat} />
    </div>
  </div>)
}
