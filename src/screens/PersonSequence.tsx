import React, {useCallback, useMemo, useState} from 'react';
import type {FC} from 'react';
import {Alert, Animated, Easing, Image, Text, View} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {Avatar} from '../../test/3-5/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {useToggle, useTransformStyle} from '../hooks';
import {interpolate} from '../utils';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

type CompositeAnimation = Animated.CompositeAnimation;

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome5Icon);

const PersonSequence: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle();

  // Animated.Value 보간 값 객체 만들기
  const animValues = useMemo(
    () => [0, 1, 2].map(() => new Animated.Value(0)),
    [],
  );

  // CompositeAnimation 애니메이션 객체 배열 만들기
  const animations: CompositeAnimation[] = useMemo(
    () =>
      animValues.map(animValue =>
        // timing 으로 목적지 보간값 만들기
        Animated.spring(animValue, {
          useNativeDriver: true,
          toValue: !started ? 1 : 0,
          // duration: 700,
          // easing: Easing.bounce,
        }),
      ),
    // 애니메이션 실행 후, 목적지 보간값 변경함
    [started],
  );

  const avatarPressed = useCallback(
    () => {
      Animated.sequence(animations).start(toggleStarted);
    },
    // 변경된 목적지 보간값를 애니메이션들에게 적용해주기
    [started],
  );

  const leftIconStyle = useTransformStyle({
    translateX: interpolate(animValues[0], !started ? [-1200, 0] : [0, -1200]),
  });
  const centerIconStyle = useTransformStyle({
    translateX: interpolate(animValues[1], !started ? [1200, 0] : [0, 1200]),
  });
  const rightIconStyle = useTransformStyle({
    translateX: interpolate(animValues[2], !started ? [1200, 0] : [0, 1200]),
  });

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          uri={person.avatar}
          size={50}
          imageStyle={styles.avatar}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text>{started.toString()}</Text>
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
        <View style={styles.countsView}>
          <AnimatedIcon
            name="comment"
            size={24}
            color={Colors.purple500}
            style={[leftIconStyle]}
          />
          <AnimatedIcon
            name="twitter"
            size={24}
            color={Colors.blue500}
            style={[centerIconStyle]}
          />
          <AnimatedIcon
            name="heart"
            size={24}
            color={Colors.red500}
            style={[rightIconStyle]}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonSequence;
