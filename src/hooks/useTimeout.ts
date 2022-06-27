import {useEffect} from 'react';

// 콜백함수, 시간, 배열 받음
//
export const useTimeout = (
  callback: () => void,
  duration: number,
  deps: any[] = [],
): void => {
  // useState로 만들 state의 값 타입 지정
  useEffect(() => {
    if (duration === 0) return;
    const id = setTimeout(callback, duration);
    return () => clearTimeout(id);
  }, [duration, ...deps]);
};
