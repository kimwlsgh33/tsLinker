import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  MySafeAreaView,
  MyView,
  UnderlineText,
  TopBar,
} from '../theme/navigation';
import {useTheme} from 'react-native-paper';
import {ScrollEnabledProvider, useToggleTheme} from '../context';

import * as D from '../data';
import Person from './Person';

export default function People() {
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

  useEffect(() => D.makeArray(5).forEach(addPerson), []);

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView>
          <TopBar>
            <UnderlineText onPress={addPerson} style={styles.text}>
              add
            </UnderlineText>
            <UnderlineText onPress={removeAll} style={styles.text}>
              remove all
            </UnderlineText>
          </TopBar>
          <FlatList
            data={people}
            renderItem={({item}) => (
              <Person person={item} deletePressed={deletePerson(item.id)} />
            )}
            keyExtractor={item => item.id}
          />
        </MyView>
      </ScrollEnabledProvider>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  text: {marginRight: 10, fontSize: 20},
});
