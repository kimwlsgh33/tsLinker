import React from 'react';
import type {FC, ReactNode} from 'react';
import {Animated, Platform, StyleProp, StyleSheet, Text} from 'react-native';
import type {
  LayoutChangeEvent,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

import {
  useAnimatedValue,
  useLayout,
  usePanResponder,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {useScrollEnabled} from '../context';

const ios = Platform.OS == 'ios';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

// 스와이프 컴포넌트와, 그 컴포넌트의 layout을 불러옴
type SwipeComponent = (setLayout: (e: LayoutChangeEvent) => void) => ReactNode;

type LeftSwipeProps = {
  left?: SwipeComponent;
  style?: StyleProp<any>;
};

export const LeftSwipe: FC<LeftSwipeProps> = ({
  left,
  children,
  style,
  ...viewProps
}) => {
  const [show, toggleShow] = useToggle();
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();
  const [{width: leftWidth}, setLayout] = useLayout();
  const translateX = useAnimatedValue();

  // trash 아이콘 좌측으로 숨기기
  const transformStyle = useTransformStyle(
    {
      translateX: translateX.interpolate({
        inputRange: [0, leftWidth],
        outputRange: [-leftWidth, 0],
      }),
    },
    [leftWidth],
  );

  const panResponder = usePanResponder(
    {
      onPanResponderGrant(e: Event, s: State) {
        ios && setScrollEnabled(false);
      },
      onPanResponderMove(e: Event, s: State) {
        const {dx} = s;
        // trash가 안보일때는, 좌측 이동 불가능
        if (!show && dx < 0) {
          return;
        }
        translateX.setValue(dx);
      },
      onPanResponderRelease(e: Event, s: State) {
        ios && setScrollEnabled(true);
        const {dx} = s;

        // trash가 안보이고, 음수 위치에서 터치 종료시 애니메이션 실행 안함, 토글 변경 안함
        if (!show && dx < 0) {
          return;
        }

        // trash 보일때 터치를 떼면, trash를 보여줌 - leftWidth
        // trash 안보일때 터치를 떼면, trash를 안보여줌 - 0
        Animated.spring(translateX, {
          useNativeDriver: false,
          toValue: show ? 0 : leftWidth,
        }).start(toggleShow);
      },
    },
    [show, leftWidth],
    // show와 leftWidth가 바뀌면 다시 생성
  );

  /*
    1. person과, trash아이콘에 통째로 애니메이션 적용하기위해 Animated.View로 감싸줌, 나머지 View 속성 전달
    2. 렌더링시, left(setLayout)으로 layout State설정, trash아이콘을 숨기기위해 width만큼 좌측으로 이동 (-leftWidth)
    3. person 내용 화면에 보여주기
  */
  return (
    <Animated.View
      style={[transformStyle, styles.animViewStyle, style]}
      {...viewProps}>
      {left && left(setLayout)}
      <Animated.View style={[{width: '100%'}]} {...panResponder.panHandlers}>
        {children}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animViewStyle: {flexDirection: 'row', width: '100%'},
});
