import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Alert, Image, Text, View} from 'react-native';
import * as D from '../data';
import {DateTime} from 'luxon';
import {styles} from './Person.style';
import {Colors} from 'react-native-paper';
import {Avatar} from '../../test/3-5/components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PersonIcons from './PersonIcons';

export type PersonProps = {
  person: D.IPerson;
};

const PersonUsingPassingState: FC<PersonProps> = ({person: initialPerson}) => {
  const [person, setPerson] = useState({
    ...initialPerson,
    counts: {comment: 0, retweet: 0, heart: 0},
  });
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), []);
  const deletePressed = useCallback(() => Alert.alert('delete pressed.'), []);

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
        <PersonIcons person={person} setPersonState={setPerson} />
      </View>
    </View>
  );
};

export default PersonUsingPassingState;
