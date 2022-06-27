import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import type {FC} from 'react';
import {Animated, Image, View, Text, Easing} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {Avatar} from './Avatar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {useToggle} from '../hooks';
// import {MyView as View, MyText as Text} from '../theme/paper';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonBasic: FC<PersonProps> = ({person, deletePressed}) => {
  // const animValue = new Animated.Value(0);
  /* 
    useRef 이용하여, 첫렌더링시 한번만 애니메이션 생성하기 
    ⬇️ useMemo나, useCallback대신 사용하는 이유 ⬇️
    Animated.Value 객체는, 한번 만들고나선 다시 만들필요가 전혀 없으므로,
    의존성배열을 사용할 필요가 없다. ( 사용시 성능 저하 )
  */

  // Animated.Value 객체 생성, value 0으로 설정
  const animValue = useRef(new Animated.Value(0)).current;

  // opacity를 animValue value 값으로 설정
  const rightViewAnimStyle = useMemo(
    () => ({
      opacity: animValue,
    }),
    [],
  );

  const [show, toggleShow] = useToggle(false);

  // 프로필누르면, animValue value 값 0 => 1로, 1초 동안 변경
  // show가 바뀔때마다, 새로운 함수 생성
  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: show ? 0 : 1,
      useNativeDriver: true,
      duration: 1500,
      easing: Easing.bounce,
    }).start(({finished}: {finished: boolean}) =>
      console.log('Animation Ended :', finished),
    );
    toggleShow();
  }, [show]);

  const [realAnimValue, setRealAnimValue] = useState<number>(0);

  useEffect(() => {
    const id = animValue.addListener((state: {value: number}) => {
      setRealAnimValue(state.value);
    });
    return () => animValue.removeListener(id);
  }, []);

  return (
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
        <Text numberOfLines={3} ellipsizeMode="tail" style={[styles.comments]}>
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
  );
};

export default PersonBasic;
