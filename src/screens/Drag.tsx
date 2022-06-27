import React, {useCallback, useState} from 'react';
import {FlatList, StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {
  ScrollEnabledProvider,
  useScrollEnabled,
  useToggleTheme,
} from '../context';

import * as D from '../data';
import Person from './PersonDrag';

export default function Drag() {
  const [scrollEnabled] = useScrollEnabled();
  const [people, setPeople] = useState<D.IPerson[]>([D.createRandomPerson()]);
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const add = useCallback(() => {
    setPeople(people => [...people, D.createRandomPerson()]);
  }, []);
  const deletePressed = useCallback(
    (id: string) => () => {
      setPeople(people => people.filter(person => person.id != id));
    },
    [],
  );
  const removeAll = useCallback(() => {
    setPeople(notUsed => []);
  }, []);

  return (
    <ScrollEnabledProvider>
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
          scrollEnabled={scrollEnabled}
          data={people}
          renderItem={({item}) => (
            <Person person={item} deletePressed={deletePressed(item.id)} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    </ScrollEnabledProvider>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  text: {marginRight: 10, fontSize: 20},
});
