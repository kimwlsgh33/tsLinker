import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';
import Person from './Person';
import createOrUse from './createOrUse';

export default function Cache() {
  const people = useMemo(() => D.makeArray(5).map(D.createRandomPerson), []);
  // useMemo로 처음 렌더링 할때 한번만 객체 생성, []: 의존성없음 - 처음 한번만 실행

  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>Cache</Text>
      <FlatList
        style={[styles.flatList]}
        data={people}
        renderItem={({item}) => <Person person={item} />}
        keyExtractor={(item, idx) => item.id}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5, backgroundColor: Colors.blue900},
  text: {fontSize: 20, color: 'white'},
  flatList: {width: '100%'},
  itemSeparator: {borderWidth: 1, borderColor: Colors.grey500},
});
