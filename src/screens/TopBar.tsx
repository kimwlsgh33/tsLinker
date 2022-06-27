import React, {SetStateAction, useCallback} from 'react';
import type {FC, Dispatch} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';

type TopBarProps = {
  setPeople: Dispatch<SetStateAction<D.IPerson[]>>;
};

const TopBar: FC<TopBarProps> = ({setPeople}) => {
  // 이전 people과, 다음 people을 비교해야 state가 변경되므로, 깊은복사를 활용해야한다.
  const add = useCallback(
    () => setPeople(prevPeople => [D.createRandomPerson(), ...prevPeople]),
    [],
  );
  const deleteAll = useCallback(() => setPeople([]), []);
  return (
    <View style={[styles.topBar]}>
      <Text style={[styles.textButton]} onPress={add}>
        add
      </Text>
      <Text style={[styles.textButton]} onPress={deleteAll}>
        deleteAll
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    backgroundColor: Colors.blue700,
  },
  textButton: {fontSize: 20, color: 'white'},
});

export default TopBar;
