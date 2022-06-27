import React, {useCallback, useEffect, useReducer} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  MySafeAreaView,
  MyView,
  UnderlineText,
  TopBar,
} from '../theme/navigation';
import {ScrollEnabledProvider, useScrollEnabled} from '../context';

import * as D from '../data';
import Person from '../copy/Person';
import {addPerson, deleteAll, deletePerson, peopleSlice} from '../store/slice';

export default function UseReducer() {
  const [scrollEnabled] = useScrollEnabled();
  const [people, dispatch] = useReducer(peopleSlice.reducer, []);

  const add = useCallback(
    () => dispatch(addPerson(D.createRandomPerson())),
    [],
  );
  const deletePerso = useCallback(
    (id: string) => () => dispatch(deletePerson(id)),
    [],
  );
  const removeAll = useCallback(() => dispatch(deleteAll()), []);

  useEffect(add, []);

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView>
          <TopBar>
            <UnderlineText onPress={add} style={styles.text}>
              add
            </UnderlineText>
            <UnderlineText onPress={removeAll} style={styles.text}>
              remove all
            </UnderlineText>
          </TopBar>
          <FlatList
            data={people}
            renderItem={({item}) => (
              <Person person={item} deletePressed={deletePerso(item.id)} />
            )}
            keyExtractor={item => item.id}
            scrollEnabled={scrollEnabled}
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
