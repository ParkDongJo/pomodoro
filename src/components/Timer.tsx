"use client";
import { useState } from 'react';
import styles from "../styles/timer.module.css"
import IconButton from "./IconButton"
import TimeList from "./TimeList"
import useTimer from "../hooks/useTimer";
import { Time } from '@/types'

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
  const handleClickTime = (time: Time) => {
    const { minutes, seconds } = time
    timer.setTime(minutes * 60 + seconds)
  }

  return (
  <div className={styles.main}>
    <TimeList onClick={handleClickTime} />
    <p>{showTimeTmpl(timer.minutes)} : {showTimeTmpl(timer.seconds)}</p>
    <IconButton onClick={handleStart} />
    <IconButton onClick={handleStop} />
  </div>)
}
