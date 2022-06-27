import {useMemo} from 'react';
import {Animated} from 'react-native';
import {makeArray} from '../data';

// Animated.Value객체를 레퍼런스로 관리함
export const useAnimatedValues = (
  length: number,
  initialValue: number = 0,
): Animated.Value[] => {
  return useMemo(
    () => makeArray(length).map(() => new Animated.Value(initialValue)),
    [],
  );
};
