"use client";
import { useState } from 'react'
import styled from "@emotion/styled"
import Popup from "@/src/components/Popup"
import IconButton, { ICON } from "@/src/components/IconButton"
import TimeList from "@/src/components/Timer/TimeList"
import TimeSetting from "@/src/components/TimeSetting"
import { convertTimeToString } from '@/src/utils/timer';
import { Time } from "@/types"
import { INITIAL_POMODOROS } from "@/src/constant";

interface Props {
  setTimer: (learnTime: Time, breakTime: Time) => void
}
const TimerHeader = ({ setTimer }: Props) => {
  const [visible, setVisible] = useState(false);
  const [pomodoros, setPomodoros] = useState(INITIAL_POMODOROS)

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
    <Container>
      <Row>
        <TimeList datas={pomodoros} onClick={setTimer} />
        <IconButton icon={ICON.ADD_CIRCLE_OUTLINE} onClick={handleOpenPopup} />
      </Row>
      <Popup visible={visible} onclose={handleClosePopup}>
        <TimeSetting onComplete={handleAddPomodoro} />
      </Popup>
    </Container>
  )
}
export default TimerHeader;

const Container = styled.div`
  margin-bottom: 20px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
