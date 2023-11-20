import { useState, useRef } from 'react';
import _ from "lodash-es";
import { Subscription, interval, takeWhile, map, tap, concat, repeat, from, take } from 'rxjs';
import useBoardStore, { STATUS } from '@/src/store/board';
import useCommonStore from '@/src/store/common';
import { calcTime } from '@/src/utils/timer'
import { Time } from '@/types';
import { INITIAL_POMODORO, PLAY_STATUS } from "@/src/constant";
import useNotification from '@/src/hooks/useNotification';

const CUT = 'CUT'

const useTimer = () => {
  const defaultTimeRef = useRef<{ learn: number; break: number }>({ learn: calcTime(INITIAL_POMODORO.learnTime), break: calcTime(INITIAL_POMODORO.breakTime) })
  const [learnTime, setLearnTime] = useState(calcTime(INITIAL_POMODORO.learnTime));
  const [breakTime, setBreakTime] = useState(calcTime(INITIAL_POMODORO.breakTime));
  const learnTimeRef = useRef<number>(0);
  const breakTimeRef = useRef<number>(0);
  const repeatRef = useRef<Subscription>();
  const boardStore = useBoardStore()
  const commonStore = useCommonStore()
  const { ringAlarm } = useNotification()
  
  const learnTime$ = interval(1000).pipe(
    takeWhile(x => x <= learnTimeRef.current),
    map(x => learnTimeRef.current - x),
    tap(x => {
      setLearnTime(x)
      if (x === learnTimeRef.current) boardStore.updateStatus(STATUS.진행중)
      if (x === 0) {
        boardStore.updateStatus(STATUS.휴식중)
        ringAlarm(300)
      }
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
            boardStore.updateStatus(STATUS.대기중)
          }
        })
      ).subscribe({
        complete: () => commonStore.changePlayStatus(PLAY_STATUS.멈춤)
      })
  })

  const stopRepeat = () => {
    repeatRef.current?.unsubscribe()
    boardStore.updateStatus(STATUS.대기중)
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
