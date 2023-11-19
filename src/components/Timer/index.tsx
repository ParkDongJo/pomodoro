"use client";
import { useState, useRef } from "react";
import styled from "@emotion/styled"
import TimerHeader from "@/src/components/Timer/Header"
import Button from "@/src/components/Button";
import Box from '@mui/material/Box';
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
  const [isPlaying, setIsPlaying] = useState(false)

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
    setIsPlaying(true)
  }
  const handleStopRepeat = () => {
    stopRepeat()
    setIsPlaying(false)
  }

  const handleClickTime = (lt: Time, bt: Time) => {
    initDefaultTime(lt, bt)
    initTime(calcTime(lt), calcTime(bt))
  }

  return (
  <Box>
    <TimerHeader setTimer={handleClickTime} />
    <LearnTime>{showTimeTmpl(learnTime.minutes)} : {showTimeTmpl(learnTime.seconds)}</LearnTime>
    <BreakTime>{showTimeTmpl(breakTime.minutes)} : {showTimeTmpl(breakTime.seconds)}</BreakTime>
    <Row>
      <Button isShow={!isPlaying} size="large" title="START" onClick={handleStartRepeat} />
      <Button isShow={isPlaying} size="large" title="PUASE" onClick={handleStopRepeat} />
    </Row>
  </Box>)
}

const LearnTime = styled.p`
  font-size: 6rem;
  font-weight: 700;
  text-align: center;
`
const BreakTime = styled.p`
  font-size: 2rem;
  font-weight: 500;
  text-align: center;
`
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`
