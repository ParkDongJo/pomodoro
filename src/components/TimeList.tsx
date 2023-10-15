"use client";
export default function TimeList() {
  const times = [
    { title: '9:00', working: 9, rest: 1 },
    { title: '10:00', working: 9, rest: 1 },
    { title: '50:00', working: 9, rest: 1 },
  ]
  return (
    <div>
      {times.map((time, index) => (
        <span key={`${time.title}-${index}`}>{time.title}</span>
      ))}
    </div>
  )
}
