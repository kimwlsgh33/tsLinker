import React, {useCallback} from 'react';
import {StyleSheet} from 'react-native';
import type {FC} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import * as D from '../data';
import {DrawerActions} from '@react-navigation/native';
import {
  MyText,
  MyView,
  NavigationHeader,
  UnderlineText,
  MySwitch,
  MaterialCommunityIcon as Icon,
} from '../theme';
import {Avatar} from '../components';

import type {AppState} from '../store';
import * as L from '../store/login';
import {useSelector} from 'react-redux';

const loginUser = D.createRandomPerson();

const DrawerContent: FC<DrawerContentComponentProps> = props => {
  const login = useSelector<AppState, L.State>(state => state.login);
  const {loggedIn, loggedUser} = login;
  /* 
    useSelector({login: L.State, L.State}) 형식
  */

  const {navigation} = props;
  // const go = useCallback(() => {}, []);

  const close = useCallback(
    () => navigation.dispatch(DrawerActions.closeDrawer()),
    [],
  );

  if (!loggedIn) {
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
        <NavigationHeader
          Right={() => <Icon name="close" size={24} onPress={close} />}
        />
        <MyView style={[styles.content]}>
          <MyText style={[styles.text]}>Please login or signup.</MyText>
          <MyView style={[styles.row, {marginTop: 20}]}>
            <MySwitch />
          </MyView>
        </MyView>
      </DrawerContentScrollView>
    );
  }
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={[styles.view]}>
      <NavigationHeader
        Right={() => <Icon name="close" size={24} onPress={close} />}
      />
      <MyView style={[styles.content]}>
        <MyView style={[styles.row]}>
          <Avatar uri={loginUser.avatar} size={40} />
          <MyText style={[styles.text, styles.m]}>{loggedUser.name}</MyText>
        </MyView>
        <MyView style={[styles.row]}>
          <UnderlineText
            numberOfLines={1}
            ellipsizeMode="tail"
            style={[styles.text, styles.m]}>
            {loggedUser.email}
          </UnderlineText>
        </MyView>
        <MyView style={[styles.row, {marginTop: 20}]}>
          <MySwitch />
        </MyView>
      </MyView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  row: {flexDirection: 'row', padding: 5, alignItems: 'center'},
  m: {marginLeft: 5},
  text: {fontSize: 20},
  content: {flex: 1, padding: 5},
});

export default DrawerContent;
