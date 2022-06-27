import React, {useCallback, useState, useRef, useEffect} from 'react';
import {FlatList, StyleSheet, Switch} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useToggleTheme} from '../context';
import {MyView as View, MyText as Text} from '../theme/paper';

import * as D from '../data';
import Person from './PersonInterpolate';

export default function Interpolate() {
  const [people, setPeople] = useState<D.IPerson[]>([]);
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  const addPerson = useCallback(() => {
    setPeople(people => [D.createRandomPerson(), ...people]);
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

  useEffect(addPerson, []);

  return (
    <View style={[styles.view]}>
      <View accent style={[styles.topBar]}>
        <Text onPress={addPerson} style={styles.text}>
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
