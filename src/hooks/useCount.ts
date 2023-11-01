import { useState, useEffect } from 'react';
import { BehaviorSubject, Subscription, interval, takeWhile, map, tap } from 'rxjs';

export const observable = new BehaviorSubject(0);

export default function useCount() {
  const [count, setCount] = useState(() => observable.value);

  useEffect(() => {
    const subscription = observable.subscribe({
      next: (value) => setCount(value),
    });
    return () => subscription.unsubscribe();
  }, []);

  return count;
}
