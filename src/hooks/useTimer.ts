import { useState, useRef } from 'react';
import { Subscription, interval, takeWhile, map, tap, concat, repeat, from, take } from 'rxjs';
import useStore, { STATUS } from '@/src/store/board';

const CUT = 'CUT'

const useTimer = () => {
  const [breakTime, setBreakTime] = useState(0);
  const [learnTime, setLearnTime] = useState(0);
  const repeatRef = useRef<Subscription>();
  const statusRef = useRef<STATUS>();
  const initialLearnTimeRef = useRef<number>();
  const initialBreakTimeRef = useRef<number>();
  const store = useStore()

  const learnTime$ = interval(1000).pipe(
    takeWhile(x => x <= learnTime),
    map(x => learnTime - x),
    tap(x => {
      setLearnTime(x)
      if (x === learnTime) store.updateStatus(STATUS.진행중)
      if (x === 0) store.updateStatus(STATUS.휴식중)
    })
  )
  const breakTime$ = interval(1000).pipe(
    takeWhile(x => x <= breakTime),
    map(x => breakTime - x),
    tap(x => {
      setBreakTime(x)
    })
  )
  const cut$ = from([CUT]).pipe(take(1))

  const getMinutes = (time: number) => Math.floor(time / 60);
  const getSeconds = (time: number) => Number(time % 60);

  const repeatUntil = (times: number, callback: () => void) => {
    repeatRef.current = concat(learnTime$, breakTime$, cut$)
      .pipe(
        repeat(times),
        tap((x) => {
          if (x === CUT) {
            callback()
            resetTime()
          }
        })
      ).subscribe()
  }

  const stopRepeat = () => {
    repeatRef.current?.unsubscribe()
    statusRef.current = store.status
    store.updateStatus(STATUS.대기중)
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
