"use client";
import { useState } from "react";
import styles from "@/src/styles/timer.module.css"
import IconButton from "@/src/components/IconButton"
import TimerHeader from "@/src/components/Timer/Header"
import useTimer from "@/src/hooks/useTimer";
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
  const [disabled, setDisabled] = useState(true)

  const showTimeTmpl = (time: number) => {
    return time < 10 ? `0${time}` : String(time);
  }
  const repeat = repeatUntil(() => {
    const task = popTask(conditionForTodo)
    task?.id && checkTask(task.id)
  })

  const handleStartRepeat = () => {
    const length = getTaskLength(conditionForTodo)
    repeat(length)
  }
  const handleStopRepeat = () => {
    stopRepeat()
  }

  const handleClickTime = (lt: Time, bt: Time) => {
    initLearnTime(lt.minutes * 60 + lt.seconds)
    initBreakTime(bt.minutes * 60 + bt.seconds)
    setDisabled(false)
  }

  return (
  <div className={styles.main}>
    <TimerHeader setTimer={handleClickTime} />
    <p>{showTimeTmpl(learnTime.minutes)} : {showTimeTmpl(learnTime.seconds)}</p>
    <p>{showTimeTmpl(breakTime.minutes)} : {showTimeTmpl(breakTime.seconds)}</p>
    <div>
      <IconButton disabled={disabled} title={"연속 실행하기"} onClick={handleStartRepeat} />
      <IconButton disabled={disabled} title={"연속 실행 멈추기"} onClick={handleStopRepeat} />
    </div>
  </div>)
}
