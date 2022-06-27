import React from 'react';
import type {FC} from 'react';
import {StyleSheet, ViewProps} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {MySwitch} from './MySwitch';
import {MyView} from './MyView';

export type TopBarProps = ViewProps & {
  noSwitch?: boolean;
};

export const TopBar: FC<TopBarProps> = ({
  noSwitch,
  children,
  style,
  ...props
}) => {
  const {dark} = useTheme();
  return (
    <MyView
      card={!dark}
      primary={dark}
      style={[styles.topBar, style]}
      {...props}>
      {children}
      <MyView style={[styles.flex]} />
      {!noSwitch && <MySwitch />}
    </MyView>
  );
};

const styles = StyleSheet.create({
  topBar: {flexDirection: 'row', padding: 5, alignItems: 'center'},
  flex: {flex: 1},
});
