import React, {useCallback, useEffect, useMemo} from 'react';
import type {FC} from 'react';
import {Animated, Easing, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import * as D from '../data';
import {
  useAnimatedValue,
  useAnimatedValues,
  useStyle,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {interpolate} from '../utils';
import {Avatar} from '../components';
import {styles} from './Person.style';
// import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);
export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonEnterExit: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle();

  // Animated.Value 객체 만들기
  const opacityAnimValue = useAnimatedValue();
  const leftToRightAnimValue = useAnimatedValue();
  const topBottomAnimValue = useAnimatedValue();
  const iconAnimValues = useAnimatedValues(3);

  // IconAnimation 보간값 변화 함수 만들기, 토글로 목적보간값 변경
  const iconAnimations = useMemo(
    () =>
      iconAnimValues.map(animValue =>
        Animated.spring(animValue, {
          useNativeDriver: true,
          toValue: started ? 0 : 1,
        }),
      ),
    [started],
  );

  // 애니메이션 순차 실행함수 (enter)
  const enterAnimation = useCallback(
    () =>
      Animated.sequence([
        Animated.timing(leftToRightAnimValue, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1 * 1000,
          easing: Easing.bounce,
        }),
        Animated.spring(opacityAnimValue, {useNativeDriver: true, toValue: 1}),
        Animated.timing(topBottomAnimValue, {
          useNativeDriver: true,
          toValue: 1,
          duration: 1 * 1000,
          easing: Easing.circle,
        }),
        ...iconAnimations,
      ]).start(toggleStarted),
    [],
  );

  // 애니메이션 순차 실행함수 (exit)
  const exitAnimation = useCallback(
    () =>
      Animated.sequence([
        ...iconAnimations.reverse(),
        Animated.parallel([
          Animated.spring(topBottomAnimValue, {
            useNativeDriver: true,
            toValue: 0,
          }),
          Animated.spring(opacityAnimValue, {
            useNativeDriver: true,
            toValue: 0,
          }),
        ]),
        Animated.timing(leftToRightAnimValue, {
          useNativeDriver: true,
          toValue: 0,
          duration: 0.3 * 1000,
        }),
      ]).start(deletePressed),
    [started],
  );

  // 첫 렌더링시, enterAnimation 실행하기
  useEffect(enterAnimation, []);

  // enter시, exit시 다른 목적 보간값 설정해서 애니메이션 주기
  const enterLeaveTransformStyle = useTransformStyle(
    {
      translateX: interpolate(
        leftToRightAnimValue,
        started ? [400, 0] : [-400, 0],
      ),
    },
    [started],
  );

  // 보간값으로 변화하는 opacity 만들기
  const fadeOutStyle = useStyle({
    opacity: opacityAnimValue,
  });

  // enter시, exit시 다른 목적 보간값 설정해서 애니메이션 주기
  const topOrBottomTransformStyle = useTransformStyle(
    {
      translateY: interpolate(
        topBottomAnimValue,
        started ? [400, 0] : [-400, 0],
      ),
    },
    [started],
  );

  // enter시 왼쪽에서 등장, exit시 왼쪽으로 사라짐
  const leftIconStyle = useTransformStyle({
    translateX: interpolate(
      iconAnimValues[0],
      started ? [0, -1200] : [-1200, 0],
    ),
  });

  // enter시 오른쪽에서 등장, exit시 오른쪽으로 사라짐
  const cneterIconStyle = useTransformStyle({
    translateY: interpolate(iconAnimValues[1], started ? [0, 1200] : [1200, 0]),
  });
  const rightIconStyle = useTransformStyle({
    translateX: interpolate(iconAnimValues[2], started ? [0, 1200] : [1200, 0]),
  });

  return (
    <Animated.View style={[styles.view, enterLeaveTransformStyle]}>
      <Animated.View style={[styles.leftView, fadeOutStyle]}>
        <Avatar uri={person.avatar} size={50} imageStyle={styles.avatar} />
      </Animated.View>
      <View style={[styles.rightView]}>
        <Text>{started.toString()}</Text>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.createDate]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <AnimatedIcon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={exitAnimation}
          />
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.comments]}>
          {person.comments}
        </Text>
        <Animated.Image
          source={{uri: person.image}}
          style={[styles.image, fadeOutStyle, topOrBottomTransformStyle]}
        />
        <View style={[styles.countsView]}>
          <AnimatedIcon
            name="comment"
            size={24}
            color={Colors.blue500}
            style={[leftIconStyle]}
          />
          <AnimatedIcon
            name="twitter"
            size={24}
            color={Colors.purple500}
            style={[cneterIconStyle]}
          />
          <AnimatedIcon
            name="heart"
            size={24}
            color={Colors.red500}
            style={[rightIconStyle]}
          />
        </View>
      </View>
    </Animated.View>
  );
};

export default PersonEnterExit;
