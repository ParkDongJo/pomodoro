import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@/src/components/Button";
import TimeInputs from "@/src/components/Timer/Inputs"
import { Time } from "@/types";

interface Props {
  onComplete: (learnTime: Time, breakTime: Time) => void;
}
export default function Setting({ onComplete }: Props) {
  const [learnTime, setLearnTime] = useState({ minutes: 0, seconds: 0 })
  const [breakTime, setBreakTime] = useState({ minutes: 0, seconds: 0 })

  const handleClick = () => {
    onComplete(learnTime, breakTime)
  }

  return (
    <Container>
      <TimeInputs setTime={setLearnTime} />
      <TimeInputs setTime={setBreakTime} />
      <Button title="추가하기" onClick={handleClick} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
