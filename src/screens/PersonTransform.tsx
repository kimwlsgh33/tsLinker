import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Animated, Image, View, Text, Easing} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {Avatar} from './Avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {MyView, MyText} from '../theme/paper';
import {useAnimatedValue, useStyle, useToggle} from '../hooks';
import {interpolate} from '../utils';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonTransform: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle(false);
  const animValue = useAnimatedValue();
  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: false,
      duration: 1000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);

  const nameAnimStyle = useStyle({
    transform: [
      {
        translateX: interpolate(animValue, [0, 500]),
      },
    ],
  });
  const emailAnimStyle = useStyle({
    transform: [
      {
        rotate: interpolate(animValue, ['0deg', '180deg']),
      },
    ],
  });
  const commentsAnimStyle = useStyle({
    transform: [
      {
        translateY: interpolate(animValue, [0, 200]),
      },
      {
        rotate: interpolate(animValue, ['0deg', '45deg']),
      },
      {
        scale: interpolate(animValue, [1, 2]),
      },
    ],
  });

  return (
    <MyView>
      <MyText style={[{fontSize: 20}]}>
        started : {started ? 'true' : 'false'}
      </MyText>
      <View style={[styles.view]}>
        <View style={[styles.leftView]}>
          <Avatar
            uri={person.avatar}
            size={50}
            imageStyle={[styles.avatar]}
            onPress={avatarPressed}
          />
          <Text style={[styles.text]}>Press Me</Text>
        </View>
        <View style={[styles.rightView]}>
          <Animated.Text style={[styles.name, nameAnimStyle]}>
            {person.name}
          </Animated.Text>
          <Animated.Text style={[styles.email, emailAnimStyle]}>
            {person.email}
          </Animated.Text>
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
          <Animated.Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={[styles.comments, commentsAnimStyle]}>
            {person.comments}
          </Animated.Text>
          <Image source={{uri: person.image}} style={[styles.image]} />
          <View style={[styles.countsView]}>
            <Icon name="comment" size={24} color={Colors.purple500} />
            <Icon name="twitter" size={24} color={Colors.blue500} />
            <Icon name="heart" size={24} color={Colors.red500} />
          </View>
        </View>
      </View>
    </MyView>
  );
};

export default PersonTransform;
