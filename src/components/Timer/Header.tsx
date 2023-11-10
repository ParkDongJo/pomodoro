"use client";
import { useState } from 'react'
import Popup from "@/src/components/Popup"
import IconButton from "@/src/components/IconButton"
import TimeList from "@/src/components/Timer/TimeList"
import TimeSetting from "@/src/components/TimeSetting"
import { convertTimeToString } from '@/src/utils/timer';
import { Time } from "@/types"

const initialPomodoros = [
  { title: '50:00 / 10:00', learnTime: { minutes: 50, seconds: 0 }, breakTime: { minutes: 10, seconds: 0 } },
  { title: '25:00 / 5:00', learnTime: { minutes: 25, seconds: 0 }, breakTime: { minutes: 5, seconds: 0 } },
  { title: '00:05 / 0:01', learnTime: { minutes: 0, seconds: 5 }, breakTime: { minutes: 0, seconds: 1 } },
]

interface Props {
  setTimer: (learnTime: Time, breakTime: Time) => void
}
const TimerHeader = ({ setTimer }: Props) => {
  const [visible, setVisible] = useState(false);
  const [pomodoros, setPomodoros] = useState(initialPomodoros)

  const handleOpenPopup = () => {
    setVisible(true)
  }
  const handleClosePopup = () => {
    setVisible(false)
  }
  const handleAddPomodoro = (learnTime: Time, breakTime: Time) => {
    const learnTitle = convertTimeToString(learnTime)
    const breakTitle = convertTimeToString(breakTime)

    setPomodoros([...pomodoros, { title: `${learnTitle} / ${breakTitle}`, learnTime, breakTime }])
    setVisible(false)
  }

  return (
    <>
      <TimeList datas={pomodoros} onClick={setTimer} />
      <IconButton title={"+"} onClick={handleOpenPopup} />
      <Popup visible={visible} onclose={handleClosePopup}>
        <TimeSetting onComplete={handleAddPomodoro} />
      </Popup>
    </>
  )
}
export default TimerHeader;
