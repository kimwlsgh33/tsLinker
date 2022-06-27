import {useEffect, useState} from 'react';

export const useClock = () => {
  // useState로 만들 state의 값 타입 지정
  const [time, setTime] = useState<Date>();

  // useEffect(() => {
  //   const id = setInterval(() => {
  //     setTime(new Date());
  //   }, 10000);
  //   return () => clearInterval(id);
  // }, []);

  setTimeout(() => setTime(new Date()), 10000);

  return time;
};
