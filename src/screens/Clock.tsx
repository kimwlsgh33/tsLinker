import React from 'react';
import type {FC} from 'react';
import {StyleSheet} from 'react-native';
import {MyText, MyView, NavigationHeader, TopBar} from '../theme';
import {useInterval} from '../hooks';
import {useTheme} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '../store';
import {setTime} from '../store/slice';

const Clock: FC = () => {
  const {dark} = useTheme();
  const dispatch = useAppDispatch();
  useInterval(() => dispatch(setTime(new Date())), 1000, [dark]);

  const {currentDate, currentTime} = useAppSelector(state => state.clock);
  return (
    <MyView style={[styles.flex]}>
      <NavigationHeader title="clock" />
      <TopBar />
      <MyView style={[styles.flex, styles.textView]}>
        <MyText style={[styles.text]}>{currentTime}</MyText>
        <MyText style={[styles.text]}>{currentDate}</MyText>
      </MyView>
    </MyView>
  );
};
const styles = StyleSheet.create({
  flex: {flex: 1},
  textView: {alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 30},
});

export default Clock;
