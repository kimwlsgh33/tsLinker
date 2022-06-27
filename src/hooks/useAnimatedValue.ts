import {useRef} from 'react';
import {Animated} from 'react-native';

// Animated.Value객체를 레퍼런스로 관리함
export const useAnimatedValue = (initialValue: number = 0): Animated.Value => {
  const animValue = useRef(new Animated.Value(initialValue)).current;
  return animValue;
};
