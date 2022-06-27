import React, {useCallback, useState, useEffect} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  MySafeAreaView,
  MyView,
  UnderlineText,
  TopBar,
} from '../theme/navigation';
import {ScrollEnabledProvider} from '../context';

import * as D from '../data';
import Person from '../copy/Person';

import {useAppDispatch, useAppSelector} from '../store';
import {addPerson, deleteAll, selectPeople} from '../store/slice';

export default function People() {
  const people = useAppSelector(selectPeople);
  const dispatch = useAppDispatch();
  const add = useCallback(
    () => dispatch(addPerson(D.createRandomPerson())),
    [],
  );
  const deletePerson = useCallback(
    (id: string) => () => {
      dispatch(deletePerson(id));
    },
    [],
  );
  const removeAll = useCallback(() => {
    dispatch(deleteAll());
  }, []);

  useEffect(() => D.makeArray(5).forEach(add), []);

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
