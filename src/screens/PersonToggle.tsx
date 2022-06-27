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
import {
  useAnimatedValue,
  useMonitorAnimatedValue,
  useStyle,
  useToggle,
} from '../hooks';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonToggle: FC<PersonProps> = ({person, deletePressed}) => {
  const [started, toggleStarted] = useToggle(false);
  const animValue = useAnimatedValue();
  const realAnimValue = useMonitorAnimatedValue(animValue);
  const rightViewAnimStyle = useStyle({opacity: animValue});

  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: true,
      duration: 3000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);

  return (
    <MyView>
      <MyText style={[{fontSize: 20}]}>realAnimValue : {realAnimValue}</MyText>
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
        <Animated.View style={[styles.rightView, rightViewAnimStyle]}>
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
          <Text
            numberOfLines={3}
            ellipsizeMode="tail"
            style={[styles.comments]}>
            {person.comments}
          </Text>
          <Image source={{uri: person.image}} style={[styles.image]} />
          <View style={styles.countsView}>
            <Icon name="comment" size={24} color={Colors.purple500} />
            <Icon name="twitter" size={24} color={Colors.blue500} />
            <Icon name="heart" size={24} color={Colors.red500} />
          </View>
        </Animated.View>
      </View>
    </MyView>
  );
};

export default PersonToggle;
