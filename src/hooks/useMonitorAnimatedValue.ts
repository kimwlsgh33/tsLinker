import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

export const useMonitorAnimatedValue = (
  animValue: Animated.Value,
  deps: any[] = [],
): number => {
  const [realAnimValue, setRealAnimValue] = useState<number>(0);

  useEffect(() => {
    // animValue가 바뀔때마다 함수 호출
    const id = animValue.addListener((state: {value: number}) => {
      setRealAnimValue(state.value);
    });
    return () => animValue.removeListener(id);
  }, deps);

  return realAnimValue;
};
