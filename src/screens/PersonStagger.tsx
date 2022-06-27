import React, {useCallback, useMemo, useState} from 'react';
import type {FC} from 'react';
import {Alert, Animated, Image, Platform, Text, View} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {Avatar} from '../../test/3-5/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {
  useAnimatedValues,
  useLayout,
  useStyle,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {interpolate} from '../utils';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5Icon);

const iconSize = 30;
const delay = 1000;

const PersonStagger: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle();
  const [layout, setLayout] = useLayout();

  // 배열 만들기
  const balls = useMemo(
    () => [Colors.pink500, Colors.lime500, Colors.lightBlue500],
    [],
  );

  // 애니메이션 보간값 만들기
  const animValues = useAnimatedValues(balls.length);

  // 애니메이션 객체 배열 만들고, 보간값 할당하기 (목적지 1)
  const startAnimations = useMemo(
    () =>
      balls
        .map((notUsed, index) =>
          Animated.spring(animValues[index], {
            useNativeDriver: true,
            toValue: 1,
          }),
        )
        .reverse(),
    // 마지막 요소부터 애니메이션 실행하도록 하기
    [started],
  );

  // 애니메이션 객체 배열 만들고, 보간값 할당하기 (목적지 0) - 되돌아오는 용도
  const endAnimations = useMemo(
    () =>
      balls.map((notUsed, index) =>
        Animated.spring(animValues[index], {
          useNativeDriver: true,
          toValue: 0,
        }),
      ),
    [started],
  );

  const avatarPressed = useCallback(() => {
    // stagger 함수로, 애니메이션 객체사이에 지연시간 주기
    // if (Platform.OS == 'ios')
    Animated.stagger(delay, [...startAnimations, ...endAnimations]).start(
      toggleStarted,
    );
    // Animated.loop(
    //   Animated.stagger(delay, [...startAnimations, ...endAnimations]),
    //   {iterations: 3},
    // ).start(toggleStarted);
    // else
    // Animated.sequence([...startAnimations, ...endAnimations]).start(
    //   toggleStarted,
    // );
  }, [started]);

  // 애니메이션 객체를 컴포넌트에 적용하고, 배열로 만들어 저장하기
  const icons = useMemo(
    () =>
      balls.map((color, index) => {
        const numberOfIcons = balls.length;
        const animValue = animValues[index];
        const animStyle = {
          transform: [
            {
              translateX: interpolate(animValue, [
                0,
                layout.width - iconSize * numberOfIcons,
              ]),
            },
            {rotate: interpolate(animValue, ['0deg', '720deg'])},
          ],
        };

        return (
          <AnimatedIcon
            key={index}
            name="futbol"
            size={iconSize}
            color={color}
            style={[animStyle]}
          />
        );
      }),
    [layout.width],
  );

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          uri={person.avatar}
          size={50}
          imageStyle={styles.avatar}
          onPress={avatarPressed}
        />
        <Text style={[styles.text]}>{started.toString()}</Text>
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.createDate]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.comments]}>
          {person.comments}
        </Text>
        <Image source={{uri: person.image}} style={[styles.image]} />
        <View style={[{flexDirection: 'row', padding: 5}]} onLayout={setLayout}>
          {/* <AnimatedIcon name="futbol" size={iconSize} style={[leftIconStyle]} />
          <AnimatedIcon
            name="futbol"
            size={iconSize}
            style={[centerIconStyle]}
          />
          <AnimatedIcon
            name="futbol"
            size={iconSize}
            style={[rightIconStyle]}
          /> */}
          {icons}
        </View>
      </View>
    </View>
  );
};

export default PersonStagger;
