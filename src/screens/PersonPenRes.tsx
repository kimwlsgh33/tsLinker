import React, {useCallback, useEffect, useMemo, useState} from 'react';
import type {FC} from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  Platform,
} from 'react-native';
import * as D from '../data';
import {useScrollEnabled} from '../context';
import {MyView as View, MyText as Text} from '../theme/paper';

const ios = Platform.OS == 'ios';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonPenRes: FC<PersonProps> = ({person, deletePressed}) => {
  const [gestureState, setGestureState] = useState<State | null>(null);
  const [scrollEnabled, setScrollEnabled] = useScrollEnabled();

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        // default callback
        onStartShouldSetPanResponder() {
          return true;
        },
        onMoveShouldSetPanResponder() {
          return true;
        },

        // custom callback
        onPanResponderGrant(e: Event, s: State) {
          ios && setScrollEnabled(false);
          console.log(Platform.OS, 'onPanResponderGrant', s);
        },
        onPanResponderRelease(e: Event, s: State) {
          ios && setScrollEnabled(true);
          console.log(Platform.OS, 'onPanResponderRelease', s);
        },

        onPanResponderMove(e: Event, s: State) {
          console.log(Platform.OS, 'onPanResponderMove', s);
        },
      }),
    [],
  );
  return (
    <View background style={[{width: '100%'}]}>
      <Text>scrollEnabled : {scrollEnabled.toString()}</Text>
      <View accent {...panResponder.panHandlers} style={{height: 300, flex: 1}}>
        {gestureState && <Text>{JSON.stringify(gestureState, null, 2)}</Text>}
      </View>
    </View>
  );
};

export default PersonPenRes;
