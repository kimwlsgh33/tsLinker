import React from 'react';
import type {ComponentProps, FC} from 'react';
import {Switch} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {useToggleTheme} from '../../context';

export type MySwitchProps = ComponentProps<typeof Switch> & {};

export const MySwitch: FC<MySwitchProps> = props => {
  const theme = useTheme();
  const toggleTheme = useToggleTheme();
  return <Switch {...props} value={theme.dark} onValueChange={toggleTheme} />;
};
