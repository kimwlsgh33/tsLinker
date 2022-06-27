import {useEffect} from 'react';

export const useInterval = (
  callback: () => void,
  duration: number,
  deps: any[] = [],
) =>
  useEffect(() => {
    const id = setInterval(callback, duration);
    return () => clearInterval(id);
  }, [duration, ...deps]);
