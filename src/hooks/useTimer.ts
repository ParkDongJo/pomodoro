import { useState, useRef } from 'react';
import { Subscription, interval, takeWhile, map, tap, concat, repeat, from, take } from 'rxjs';

const HOLDING = 'holding'

const useTimer = () => {
  const [breakTime, setBreakTime] = useState(0);
  const [learnTime, setLearnTime] = useState(0);
  const repeatRef = useRef<Subscription>();

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
  const hold$ = from([HOLDING]).pipe(take(1))

  const getMinutes = (time: number) => Math.floor(time / 60);
  const getSeconds = (time: number) => Number(time % 60);

  const repeatUntil = (time: number, callback: () => void) => {
    const source$ = concat(learnTime$, breakTime$, hold$)
    repeatRef.current = source$.pipe(
      repeat(time),
      tap((x) => {
        if (x === HOLDING) {
          callback()
          resetTime()
        }
      }))
      .subscribe({
        complete: () => {
          console.log('dongjo complete')
        },
        error: (err) => {
          console.log('dongjo error')
        }
      })
  }

  const stopRepeat = () => {
    repeatRef.current?.unsubscribe()
  }

  const resetTime = () => {
    setLearnTime(learnTime)
    setBreakTime(breakTime)
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
    repeatUntil,
    stopRepeat,
    setLearnTime,
    setBreakTime,
  }
}
export default useTimer
