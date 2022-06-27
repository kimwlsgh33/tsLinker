import React, {useMemo, useState} from 'react';
import type {FC} from 'react';
import {
  GestureResponderEvent,
  PanResponderGestureState,
  Platform,
} from 'react-native';
import * as D from '../data';
import {useScrollEnabled} from '../context';
import {MyView as View, MyText as Text} from '../theme/paper';
import {usePanResponder} from '../hooks';
import {Colors} from 'react-native-paper';
import DragAvatar from './DragAvatar';

const ios = Platform.OS == 'ios';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonDrag: FC<PersonProps> = ({person, deletePressed}) => {
  const colors = useMemo(
    () => [
      Colors.pink500,
      Colors.yellow500,
      Colors.lime500,
      Colors.lightBlue500,
    ],
    [],
  );

  const circles = useMemo(
    () =>
      colors.map((color, index) => {
        return <DragAvatar key={index} size={70} backgroundColor={color} />;
      }),
    [],
  );

  return (
    <View background style={[{flex: 1, height: 600}]}>
      {circles}
    </View>
  );
};

export default PersonDrag;
