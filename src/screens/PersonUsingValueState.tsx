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

// person 배열 받아서, 피드 형식으로 출력하는 컴포넌트
// person 속성은, 한번받으면 변하지 않는다.
const PersonUsingValueState: FC<PersonProps> = ({person: initialPerson}) => {
  const [comment, setComment] = useState<number>(0);
  const [retweet, setRetweet] = useState<number>(0);
  const [heart, setHeart] = useState<number>(0);

  // const [comment, setComment] = useState<number>(initialPerson.counts.comment);
  // const [retweet, setRetweet] = useState<number>(initialPerson.counts.retweet);
  // const [heart, setHeart] = useState<number>(initialPerson.counts.heart);

  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), []);
  const deletePressed = useCallback(() => Alert.alert('delete pressed.'), []);

  // useCallback 함수는 의존성이 바뀌지 않으면, 캐시에 저장된 값을 바꾸지 않는다.
  // 그냥 comment + 1 사용한다면, 캐시에 comment + 1 값이 저장되어, 더이상 state에서 comment를 받아오지 않는다
  const commentPressed = useCallback(
    () => setComment(comment => comment + 1),
    [],
  );
  const retweetPressed = useCallback(
    () => setRetweet(retweet => retweet + 1),
    [],
  );

  const heartPressed = useCallback(() => setHeart(heart => heart + 1), []);
  // const heartPressed = () => setHeart(heart => heart + 1);

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          uri={initialPerson.avatar}
          size={24}
          imageStyle={styles.avatar}
          onPress={avatarPressed}
        />
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{initialPerson.name}</Text>
        <Text style={[styles.email]}>{initialPerson.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.createDate]}>
            {DateTime.fromJSDate(initialPerson.createdDate).toRelative()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.comments]}>
          {initialPerson.comments}
        </Text>
        <Image source={{uri: initialPerson.image}} style={[styles.image]} />
        <View style={[styles.countsView]}>
          <IconText
            viewStyle={styles.touchableIcon}
            name="comment-outline"
            size={24}
            color={Colors.black}
            textStyle={styles.iconText}
            text={comment}
            onPress={commentPressed}
          />
          <IconText
            viewStyle={styles.touchableIcon}
            name="twitter"
            size={24}
            color={Colors.lightBlue500}
            textStyle={styles.iconText}
            text={retweet}
            onPress={retweetPressed}
          />
          <IconText
            viewStyle={styles.touchableIcon}
            name="heart"
            size={24}
            color={Colors.red500}
            textStyle={styles.iconText}
            text={heart}
            onPress={heartPressed}
          />
        </View>
      </View>
    </View>
  );
};

export default PersonUsingValueState;
