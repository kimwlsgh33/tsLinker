import type {
  StackCardInterpolatedStyle,
  StackCardInterpolationProps,
  StackCardStyleInterpolator,
} from '@react-navigation/stack';
import {useCallback} from 'react';
import {Animated} from 'react-native';

// 안드로이드에서 사용할, 네비게이션 화면전환 애니메이션 커스텀하기
export const useNavigationHorizontalInterpolator =
  (): StackCardStyleInterpolator => {
    const interpolator = useCallback(
      (props: StackCardInterpolationProps): StackCardInterpolatedStyle => {
        const {current, inverted, layouts} = props;
        /*
        current : 현재 사용중인 interpolate 객체
        layouts : 현재 사용중인 화면 크기 정보
        inverted : 곱해지는 interpolate 객체
       */
        return {
          cardStyle: {
            transform: [
              {
                translateX: Animated.multiply(
                  current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                  inverted,
                ),
              },
            ],
          },
        };
      },
      [],
    );
    return interpolator;
  };
