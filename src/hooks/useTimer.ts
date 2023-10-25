import { useState, useRef } from 'react';
import { Subscription, interval, takeWhile, map, tap, concat } from 'rxjs';

const useTimer = () => {
  const [breakTime, setBreakTime] = useState(0);
  const [learnTime, setLearnTime] = useState(0);
  const timerRef = useRef<Subscription>();

  const learnTime$ = interval(1000).pipe(
    takeWhile(x => x <= learnTime),
    map(x => learnTime - x),
    tap(x => setLearnTime(x))
  )
  const breakTime$ = interval(1000).pipe(
    takeWhile(x => x <= breakTime),
    map(x => breakTime - x),
    tap(x => setBreakTime(x))
  )

  const getMinutes = (time: number) => Math.floor(time / 60);
  const getSeconds = (time: number) => Number(time % 60);

  const start = (callback: () => void) => {
    timerRef.current = concat(learnTime$, breakTime$)
      .subscribe({
        complete: () => {
          callback()
        }
      })
  }

  const stop = () => {
    timerRef.current?.unsubscribe()
  }

  return {
    learnTime: {
      minutes: getMinutes(learnTime),
      seconds: getSeconds(learnTime),
    },
    breakTime: {
      minutes: getMinutes(breakTime),
      seconds: getSeconds(breakTime),
    },
    start,
    stop,
    setLearnTime,
    setBreakTime,
  }
}
export default useTimer
