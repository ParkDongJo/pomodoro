import { useState } from "react";

interface Props {
  initial?: { minutes: number; seconds: number }
  setTime: (time: { minutes: number; seconds: number }) => void
}
export default function TimeInputs({ initial, setTime }: Props) {
  const [minutes, setMinutes] = useState(initial?.minutes || 0)
  const [seconds, setSeconds] = useState(initial?.seconds || 0)

  const handleChangeMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMinutes(Number(value))
    setTime({ minutes: Number(value), seconds })
  }
  const handleChangeSeconds = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSeconds(Number(value))
    setTime({ minutes, seconds: Number(value) })
  }

  return (
    <div>
      <input type="number" value={minutes} onChange={handleChangeMinutes} />
      <input type="number" value={seconds} onChange={handleChangeSeconds} />
    </div>
  )
}