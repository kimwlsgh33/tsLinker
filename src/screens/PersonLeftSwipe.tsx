import React, {useCallback} from 'react';
import type {FC} from 'react';
import {
  Alert,
  GestureResponderEvent,
  Image,
  PanResponderGestureState,
  Platform,
  Text,
  View,
  Animated,
} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Colors, useTheme} from 'react-native-paper';
import {Avatar} from '../../test/3-5/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment-with-locales-es6';
import {LeftSwipe} from '../components';
import {MyView} from '../theme/paper';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonLeftSwipe: FC<PersonProps> = ({person, deletePressed}) => {
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), []);
  const {colors} = useTheme();

  // 특정함수를 받아서, 아이콘View의 onLayout 속성에 넣어준다.
  // left(func) 사용시, onLayout속성에 func 설정됨
  return (
    <LeftSwipe
      left={setLayout => (
        <MyView
          style={[{padding: 5, flexDirection: 'row'}]}
          onLayout={setLayout}>
          <Icon
            name="trash-can-outline"
            size={40}
            color={colors.text}
            onPress={deletePressed}
          />
        </MyView>
      )}>
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
          <Text style={[styles.name]}>{person.name}</Text>
          <Text style={[styles.email]}>{person.email}</Text>
          <View style={[styles.dateView]}>
            <Text style={[styles.createDate]}>
              {moment(person.createdDate).startOf('day').fromNow()}
            </Text>
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
        </View>
      </View>
    </LeftSwipe>
  );
};

export default PersonLeftSwipe;
