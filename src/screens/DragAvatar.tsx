import React, {useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {
  Animated,
  EventEmitter,
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
} from 'react-native';
import {MyView as View, MyText as Text} from '../theme/paper';
import {Avatar} from '../components';
import * as D from '../data';
import {
  useAnimatedValueXY,
  useMonitorAnimatedValueXY,
  usePanResponder,
  useStyle,
  useTransformStyle,
} from '../hooks';
import {useScrollEnabled} from '../context';
import {styles} from './Person.style';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

const ios = Platform.OS == 'ios';

type DragAvatarProps = {size: number; backgroundColor: string};

const DragAvatar: FC<DragAvatarProps> = ({size, backgroundColor}) => {
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();
  const animValueXY = useAnimatedValueXY();
  const realAnimValueXY = useMonitorAnimatedValueXY(animValueXY);

  const transformStyle = useTransformStyle({
    translateX: animValueXY.x,
    translateY: animValueXY.y,
  });

  const style = useStyle({
    backgroundColor,
    width: size,
    height: size,
    borderRadius: size / 2,
    alignItems: 'center',
    justifyContent: 'center',
  });
  const avatarUri = useMemo(() => D.randomAvatarUrl(), []);

  const panResponder = usePanResponder({
    onPanResponderGrant(e: Event, s: State) {
      console.log('터치됨');
      ios && setScrollEnabled(false);
    },
    onPanResponderMove(e: Event, s: State) {
      const {dx, dy} = s;
      animValueXY.setValue({x: dx, y: dy});
    },
    onPanResponderRelease(e: Event, s: State) {
      console.log('땜', s);
      ios && setScrollEnabled(true);
    },
  });

  return (
    <View>
      <Text style={[styles.text]}>
        {JSON.stringify(realAnimValueXY, null, 2)}
      </Text>
      <Animated.View
        style={[style, transformStyle]}
        {...panResponder.panHandlers}>
        <Avatar uri={avatarUri} size={60} />
      </Animated.View>
    </View>
  );
};

export default DragAvatar;
