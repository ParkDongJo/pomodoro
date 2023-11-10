import { useState, useRef } from 'react';
import _ from "lodash-es";
import { Subscription, interval, takeWhile, map, tap, concat, repeat, from, take } from 'rxjs';
import useStore, { STATUS } from '@/src/store/board';
import { calcTime } from '@/src/utils/timer'
import { Time } from '@/types';

const CUT = 'CUT'

const useTimer = () => {
  const defaultTimeRef = useRef<{ learn: number; break: number }>({ learn: 0, break: 0 })
  const [learnTime, setLearnTime] = useState(0);
  const [breakTime, setBreakTime] = useState(0);
  const learnTimeRef = useRef<number>(0);
  const breakTimeRef = useRef<number>(0);
  const repeatRef = useRef<Subscription>();
  const store = useStore()
  
  const learnTime$ = interval(1000).pipe(
    takeWhile(x => x <= learnTimeRef.current),
    map(x => learnTimeRef.current - x),
    tap(x => {
      setLearnTime(x)
      if (x === learnTimeRef.current) store.updateStatus(STATUS.진행중)
      if (x === 0) store.updateStatus(STATUS.휴식중)
    })
  )
  const breakTime$ = interval(1000).pipe(
    takeWhile(x => x <= breakTimeRef.current),
    map(x => breakTimeRef.current - x),
    tap(x => {
      setBreakTime(x)
    })
  )
  const cut$ = from([CUT]).pipe(take(1))

  const getMinutes = (time: number) => Math.floor(time / 60);
  const getSeconds = (time: number) => Number(time % 60);

  const repeatUntil = _.curryRight((times: number, callback: () => void) => {
    repeatRef.current = concat(learnTime$, breakTime$, cut$)
      .pipe(
        repeat(times),
        tap((x) => {
          if (x === CUT) {
            callback()
            store.updateStatus(STATUS.대기중)
          }
        })
      ).subscribe()
  })

  const stopRepeat = () => {
    repeatRef.current?.unsubscribe()
    store.updateStatus(STATUS.대기중)
  }

  const initDefaultTime = (lt: Time, bt: Time) => {
    defaultTimeRef.current = {
      learn: calcTime(lt),
      break: calcTime(bt),
    }
  }
  const initTime = (lt: number, bt: number) => {
    learnTimeRef.current = lt
    breakTimeRef.current = bt
    setLearnTime(lt)
    setBreakTime(bt)
  }

  const setTimer = (lt?: Time, bt?: Time) => {
    if (!lt || !bt) {
      const time = defaultTimeRef.current
      initTime(time.learn, time.break)
      return
    }
    initTime(calcTime(lt), calcTime(bt))
  }

  return {
    defaultTime: defaultTimeRef.current,
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
    initDefaultTime,
    initTime,
    setTimer,
  }
}
export default useTimer
