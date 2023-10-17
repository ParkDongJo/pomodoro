import { useState, useRef } from 'react';
import { Subscription, interval, startWith, tap, delay } from 'rxjs';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<Subscription>();

  const minutes = Math.floor(time / 60);
  const seconds = Number(time % 60);

  const start = () => {
    timerRef.current = interval(1000).subscribe(x => {
      setTime(x + 1)
    })
  }

  const stop = () => {
    timerRef.current?.unsubscribe()
  }

  return {
    minutes,
    seconds,
    start,
    stop,
  }
}
export default useTimer
