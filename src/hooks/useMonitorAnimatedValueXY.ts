import {useEffect, useRef, useState} from 'react';
import {Animated} from 'react-native';

export type XY = {
  x: number;
  y: number;
};

export const useMonitorAnimatedValueXY = (
  animValue: Animated.ValueXY,
  deps: any[] = [],
): XY => {
  const [realAnimValueXY, setRealAnimValueXY] = useState<XY>({x: 0, y: 0});

  useEffect(() => {
    // animValue가 바뀔때마다 함수 호출
    const id = animValue.addListener((value: XY) => {
      setRealAnimValueXY(value);
    });
    return () => animValue.removeListener(id);
  }, deps);

  return realAnimValueXY;
};
