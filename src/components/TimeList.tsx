"use client";
import { Time } from '@/types'

interface Props {
  onClick: (time: Time) => void
}
export default function TimeList(props: Props) {
  const { onClick } = props;

  const times = [
    { title: '50:00', minutes: 50, seconds: 0 },
    { title: '25:00', minutes: 25, seconds: 0 },
    { title: '01:00', minutes: 1, seconds: 0 },
  ]

  return (
    <div>
      {times.map((time, index) => (
        <span
          key={`${time.title}-${index}`} 
          onClick={() => {
            onClick({ minutes: time.minutes, seconds: time.seconds })
          }}>
            {time.title}
          </span>
      ))}
    </div>
  )
}
