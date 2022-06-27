import React, {useCallback, useState, useRef} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../context';

import * as D from '../data';
import {useAnimatedValue, useStyle} from '../hooks';
import Person from './PersonTransform';

export default function Transform() {
  const [people, setPeople] = useState<D.IPerson[]>([D.createRandomPerson()]);
  const theme = useTheme();
  const toggleTheme = useToggleTheme();

  const add = useCallback(() => {
    setPeople(people => [...people, D.createRandomPerson()]);
  }, []);

  const deletePerson = useCallback(
    (id: string) => () => {
      setPeople(people => people.filter(person => person.id != id));
    },
    [],
  );

  const removeAll = useCallback(() => {
    setPeople(notUsed => []);
  }, []);

  return (
    <View style={[styles.view, {backgroundColor: theme.colors.background}]}>
      <View style={[styles.topBar, {backgroundColor: theme.colors.accent}]}>
        <Text onPress={add} style={styles.text}>
          add
        </Text>
        <Text onPress={removeAll} style={styles.text}>
          remove all
        </Text>
        <View style={{flex: 1}} />
        <Switch value={theme.dark} onValueChange={toggleTheme} />
      </View>
      <FlatList
        data={people}
        renderItem={({item}) => (
          <Person person={item} deletePressed={deletePerson(item.id)} />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  text: {marginRight: 10, fontSize: 20},
});
