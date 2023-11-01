"use client";
import { Time } from '@/types'

interface Props {
  onClick: (learnTime: Time, breakTime: Time) => void
}
export default function TimeList(props: Props) {
  const { onClick } = props;

  const pomodoros = [
    { title: '50:00', learnTime: { minutes: 25, seconds: 0 }, breakTime: { minutes: 10, seconds: 0 } },
    { title: '25:00', learnTime: { minutes: 15, seconds: 0 }, breakTime: { minutes: 5, seconds: 0 } },
    { title: '00:05', learnTime: { minutes: 0, seconds: 5 }, breakTime: { minutes: 0, seconds: 5 } },
  ]

  return (
    <div>
      {pomodoros.map((pomo, index) => (
        <span
          key={`${pomo.title}-${index}`} 
          onClick={() => {
            onClick(pomo.learnTime, pomo.breakTime)
          }}>
            {pomo.title}
          </span>
      ))}
    </div>
  )
}
