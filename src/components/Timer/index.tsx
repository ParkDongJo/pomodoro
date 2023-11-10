"use client";
import { useState, useRef } from "react";
import styles from "@/src/styles/timer.module.css"
import IconButton from "@/src/components/IconButton"
import TimerHeader from "@/src/components/Timer/Header"
import useTimer from "@/src/hooks/useTimer";
import useTask from '@/src/hooks/useTask'
import { conditionForTodo } from '@/src/utils/task'
import { showTimeTmpl, calcTime } from '@/src/utils/timer'
import { Time } from '@/types'

export default function Timer() {
  const {
    learnTime,
    breakTime,
    repeatUntil,
    stopRepeat,
    initDefaultTime,
    initTime,
    setTimer,
  } = useTimer()
  const { checkTask, popTask, getTaskLength } = useTask()
  const [disabled, setDisabled] = useState(true)

  const repeat = repeatUntil(() => {
    const currTask = popTask(conditionForTodo)
    checkTask(currTask.id)

    const nextTask = popTask(conditionForTodo)
    setTimer(nextTask?.learnTime, nextTask?.breakTime)
  })

  const handleStartRepeat = () => {
    const length = getTaskLength(conditionForTodo)
    const task = popTask(conditionForTodo)

    setTimer(task?.learnTime, task?.breakTime)
    repeat(length)
  }
  const handleStopRepeat = () => {
    stopRepeat()
  }

  const handleClickTime = (lt: Time, bt: Time) => {
    initDefaultTime(lt, bt)
    initTime(calcTime(lt), calcTime(bt))
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
