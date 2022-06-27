import React, {useCallback} from 'react';
import type {FC} from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationHeader,
  TopBar,
  MaterialCommunityIcon as Icon,
  MyView,
  MyText,
} from '../theme';
import {useAppDispatch, useAppSelector} from '../store';
import {decrement, increment, selectCount} from '../store/slice';

const title = 'Counter';
const Counter: FC = () => {
  // store에 저장된 counter state 불러오기
  const counter = useAppSelector(selectCount);
  const dispatch = useAppDispatch();
  const increaseCounter = useCallback(() => {
    dispatch(increment);
  }, []);

  const decreaseCounter = useCallback(() => {
    dispatch(decrement);
  }, []);
  return (
    <MyView style={[styles.flex]}>
      <NavigationHeader title={title} />
      <TopBar>
        <Icon name="plus" size={30} onPress={increaseCounter} />
        <Icon name="minus" size={30} onPress={decreaseCounter} />
      </TopBar>
      <MyView style={[styles.flex, styles.textView]}>
        <MyText style={[styles.text]}>counter: {counter}</MyText>
      </MyView>
    </MyView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
  textView: {alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 30},
});

export default Counter;
