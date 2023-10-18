import { useState, useRef } from 'react';
import { Subscription, interval, takeWhile, map, tap } from 'rxjs';

const useTimer = () => {
  const [time, setTime] = useState(0);
  const timerRef = useRef<Subscription>();

  const minutes = Math.floor(time / 60);
  const seconds = Number(time % 60);

  /*
    rxjs를 사용해서 처음 셋팅된 값에서 1초씩 감소하는 타이머를 만들어줘
  */
  const start = () => {
    timerRef.current = interval(1000).pipe(
      takeWhile(x => x <= time),
      map(x => time - x),
      tap(x => setTime(x))
    ).subscribe()
  }

  const stop = () => {
    timerRef.current?.unsubscribe()
  }

  return {
    minutes,
    seconds,
    start,
    stop,
    setTime,
  }
}
export default useTimer
