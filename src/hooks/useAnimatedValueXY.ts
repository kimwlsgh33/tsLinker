import {useRef} from 'react';
import {Animated} from 'react-native';

// Animated.Value객체를 레퍼런스로 관리함
export const useAnimatedValueXY = (
  initialValue: {x: number; y: number} = {x: 0, y: 0},
): Animated.ValueXY => {
  const animValue = useRef(new Animated.ValueXY(initialValue)).current;
  return animValue;
};
