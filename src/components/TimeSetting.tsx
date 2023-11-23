import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@/src/components/Button";
import TimeInputs from "@/src/components/Timer/Inputs"
import { Time } from "@/types";

const DEFAULT_TIME = { minutes: 0, seconds: 0 }

interface Props {
  initialTime?: { lt: Time; bt: Time };
  onComplete: (learnTime: Time, breakTime: Time) => void;
}
export default function Setting({ initialTime, onComplete }: Props) {
  const { lt, bt } = initialTime || { lt: DEFAULT_TIME, bt: DEFAULT_TIME }
  const [learnTime, setLearnTime] = useState(lt)
  const [breakTime, setBreakTime] = useState(bt)

  const handleClick = () => {
    onComplete(learnTime, breakTime)
  }

  return (
    <Container>
      <TimeInputs initial={lt} setTime={setLearnTime} />
      <TimeInputs initial={bt} setTime={setBreakTime} />
      <Button size="large" title="추가하기" onClick={handleClick} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;
