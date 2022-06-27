import React from 'react';
import {StyleSheet} from 'react-native';
import {MySafeAreaView, MyText, MyView, TopBar} from '../theme/navigation';
import type {FC} from 'react';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

export function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* <DrawerItem label="Help" onPress={() => console.log('help')} /> */}
    </DrawerContentScrollView>
  );
}
