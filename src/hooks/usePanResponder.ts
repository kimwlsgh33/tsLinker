import {useMemo} from 'react';
import {
  GestureResponderEvent,
  PanResponder,
  PanResponderCallbacks,
  PanResponderGestureState,
  PanResponderInstance,
} from 'react-native';

type Event = GestureResponderEvent;
type State = PanResponderGestureState;

const defaultCallbacks = {
  onStartShouldSetPanResponder: (e: Event, s: State) => true,
  onMoveShouldSetPanResponder: (e: Event, s: State) => true,
};

export const usePanResponder = (
  callbacks: PanResponderCallbacks,
  deps: any[] = [],
) => {
  const panResponder = useMemo<PanResponderInstance>(
    () =>
      PanResponder.create({
        ...defaultCallbacks,
        ...callbacks,
      }),
    deps,
  );
  return panResponder;
};
