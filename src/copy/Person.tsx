import React, {useCallback, useState} from 'react';
import type {FC} from 'react';
import {Alert, Image} from 'react-native';
import {Colors} from 'react-native-paper';

import {
  MyView,
  MyText,
  UnderlineText,
  MyTouchableView,
  MaterialCommunityIcon as Icon,
} from '../theme/navigation';

import moment from 'moment-with-locales-es6';
import * as D from '../data';
import {Avatar} from '../components';
import {styles} from './Person.style';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const Person: FC<PersonProps> = ({person: initialPerson, deletePressed}) => {
  const [person, setPerson] = useState<D.IPerson>(initialPerson);

  return (
    <MyView style={[styles.view]}>
      <MyView style={[styles.leftView]}>
        <Avatar uri={person.avatar} size={50} imageStyle={styles.avatar} />
      </MyView>
      <MyView style={[styles.rightView]}>
        <MyText style={[styles.name]}>{person.name}</MyText>
        <MyText style={[styles.email]}>{person.email}</MyText>
        <MyView style={[styles.dateView]}>
          <MyText style={[styles.createDate]}>
            {moment(initialPerson.createdDate).startOf('day').fromNow()}
          </MyText>
          <Icon
            name="trash-can"
            size={30}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </MyView>
        <MyText
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.comments]}>
          {person.comments}
        </MyText>
        <Image source={{uri: person.image}} style={[styles.image]} />
        <MyView style={styles.countsView}>
          <MyTouchableView style={[styles.countView]}>
            <Icon name="comment" size={24} color={Colors.purple500} />
            <MyText>{person.counts.comment}</MyText>
          </MyTouchableView>
          <MyTouchableView style={[styles.countView]}>
            <Icon name="twitter" size={24} color={Colors.blue500} />
            <MyText>{person.counts.retweet}</MyText>
          </MyTouchableView>
          <MyTouchableView style={[styles.countView]}>
            <Icon name="heart" size={24} color={Colors.red500} />
            <MyText>{person.counts.heart}</MyText>
          </MyTouchableView>
        </MyView>
      </MyView>
    </MyView>
  );
};

export default Person;
