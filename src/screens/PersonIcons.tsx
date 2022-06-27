import React, {useCallback} from 'react';
import type {Dispatch, SetStateAction} from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native-paper';
import {IconText} from '../../test/3-5/components';
import * as D from '../data';
import {styles} from './Person.style';

export type PersonIconsProps = {
  person: D.IPerson;
  setPersonState: Dispatch<SetStateAction<D.IPerson>>;
};

const PersonIcons = ({person, setPersonState}: PersonIconsProps) => {
  const commentPressed = useCallback(
    () =>
      setPersonState(person => ({
        ...person,
        counts: {...person.counts, comment: person.counts.comment + 1},
        // counts의 나머지 요소도 지정하지 않으면, 타입이 맞지 않는다.
        // 깊은 복사를 하지 않으면, react가 비교점을 찾지 못해, 렌더링 하지 않는다.
      })),
    [],
  );
  const retweetPressed = useCallback(
    () =>
      setPersonState(person => ({
        ...person,
        counts: {...person.counts, retweet: person.counts.retweet + 1},
      })),
    [],
  );

  const heartPressed = useCallback(
    () =>
      setPersonState(person => ({
        ...person,
        counts: {...person.counts, heart: person.counts.heart + 1},
      })),
    [],
  );

  return (
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
  );
};

export default PersonIcons;
