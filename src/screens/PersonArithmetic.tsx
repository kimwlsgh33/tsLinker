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
  useStyle,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {interpolate} from '../utils';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonArithmetic: FC<PersonProps> = ({person, deletePressed}) => {
  const animValue = useAnimatedValue(10);

  // fontSize 상태관리
  const [fontSize, setFontSize] = useState<number>(0);
  // Animated.Value 타입의 fontSize 만들기 ( 렌더링 시 마다 새로만들기 )
  const _fontSize = new Animated.Value(fontSize);
  // fontSize가 바뀔때마다, _fontSize + animValue 해서 스타일 지정
  const nameAnimStyle = useStyle(
    {
      fontSize: Animated.add(animValue, _fontSize),
    },
    [fontSize],
  );

  const increaseFontSize = useCallback(
    (fontSize: number) => () => {
      setFontSize(notUsed => fontSize);
    },
    [],
  );

  // const [_10, set_10] = useState(new Animated.Value(10));
  // const [_20, set_20] = useState(new Animated.Value(20));
  // const textAnimStyle = useTransformStyle({
  //   fontSize: Animated.add(_10, Animated.multiply(animValue, _20)),
  // });

  return (
    <MyView>
      <View style={[styles.view]}>
        <View style={[styles.rightView]}>
          <Animated.Text style={[styles.name, nameAnimStyle]}>
            {person.name}
          </Animated.Text>
          <Text style={[styles.email]}>{person.email}</Text>
          <View style={[styles.countsView]}>
            <Text
              onPress={increaseFontSize(20)}
              style={[styles.text, styles.iconText]}>
              set fontSize + 20
            </Text>
            <Text
              onPress={increaseFontSize(30)}
              style={[styles.text, styles.iconText]}>
              set fontSize + 30
            </Text>
            <Text
              onPress={increaseFontSize(40)}
              style={[styles.text, styles.iconText]}>
              set fontSize + 40
            </Text>
          </View>
        </View>
      </View>
    </MyView>
  );
};

export default PersonArithmetic;
