import { useState, useRef } from 'react';
import { Subscription, interval, takeWhile, map, tap, concat, repeat, from, take } from 'rxjs';

const HOLDING = 'holding'

const useTimer = () => {
  const [breakTime, setBreakTime] = useState(0);
  const [learnTime, setLearnTime] = useState(0);
  const repeatRef = useRef<Subscription>();
  const initialLearnTimeRef = useRef<number>();
  const initialBreakTimeRef = useRef<number>();

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

  const initLearnTime = (time: number) => {
    initialLearnTimeRef.current = time
    setLearnTime(time)
  }
  const initBreakTime = (time: number) => {
    initialBreakTimeRef.current = time
    setBreakTime(time)
  }
  const resetTime = () => {
    setLearnTime(initialLearnTimeRef.current ?? 0)
    setBreakTime(initialBreakTimeRef.current ?? 0)
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
    initLearnTime,
    initBreakTime,
  }
}
export default useTimer
