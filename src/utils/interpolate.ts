import {Animated} from 'react-native';

// 보간값 타입 변경하기
export const interpolate = (
  animValue: Animated.Value,
  outputRange: number[] | string[],
  inputRange: number[] = [0, 1],
): Animated.AnimatedInterpolation => {
  return animValue.interpolate({inputRange, outputRange});
};
