import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import * as D from '../data';
import {DateTime} from 'luxon';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {IconText, Avatar} from '../../test/3-5/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type PersonProps = {
  person: D.IPerson;
};

const PersonUsingObjectState: FC<PersonProps> = ({person: initialPerson}) => {
  // const [person, setPerson] = useState<D.IPerson>(initialPerson);
  const [person, setPerson] = useState<D.IPerson>({
    ...initialPerson,
    counts: {comment: 0, retweet: 0, heart: 0},
  });

  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), []);
  const deletePressed = useCallback(() => Alert.alert('delete pressed.'), []);

  const commentPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, comment: person.counts.comment + 1},
        // counts의 나머지 요소도 지정하지 않으면, 타입이 맞지 않는다.
        // 깊은 복사를 하지 않으면, react가 비교점을 찾지 못해, 렌더링 하지 않는다.
      })),
    [],
  );
  const retweetPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, retweet: person.counts.retweet + 1},
      })),
    [],
  );

  const heartPressed = useCallback(
    () =>
      setPerson(person => ({
        ...person,
        counts: {...person.counts, heart: person.counts.heart + 1},
      })),
    [],
  );

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          uri={person.avatar}
          size={24}
          imageStyle={styles.avatar}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.createDate]}>
            {DateTime.fromJSDate(person.createdDate).toRelative()}
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
        <View style={[styles.countsView]}>
          <IconText
            viewStyle={styles.touchableIcon}
            name="comment-outline"
            size={24}
            color={Colors.black}
            textStyle={styles.iconText}
            text={person.counts.comment}
            onPress={commentPressed}
          />
          <IconText
            viewStyle={styles.touchableIcon}
            name="twitter"
            size={24}
            color={Colors.lightBlue500}
            textStyle={styles.iconText}
            text={person.counts.retweet}
            onPress={retweetPressed}
          />
          <IconText
            viewStyle={styles.touchableIcon}
            name="heart"
            size={24}
            color={Colors.red500}
            textStyle={styles.iconText}
            text={person.counts.heart}
            onPress={heartPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonUsingObjectState;
