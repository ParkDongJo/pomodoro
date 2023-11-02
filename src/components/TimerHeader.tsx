"use client";
import { useState } from 'react'
import Popup from './Popup'
import IconButton from './IconButton';
import TimeList from "./TimeList"
import { Time } from '@/types'


interface Props {
  setTimer: (learnTime: Time, breakTime: Time) => void
}
const TimerHeader = ({ setTimer }: Props) => {
  const [visible, setVisible] = useState(false);

  const handleOpenPopup = () => {
    setVisible(true)
  }
  const handleClosePopup = () => {
    setVisible(false)
  }

  return (
    <>
    <TimeList onClick={setTimer} />
    <IconButton title={"+"} onClick={handleOpenPopup} />
    <Popup visible={visible} onclose={handleClosePopup}/>
    </>
  )
}
export default TimerHeader;
