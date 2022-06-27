import React from 'react';
import type {ComponentProps, FC} from 'react';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export type IconProps = ComponentProps<typeof Icon>;

export const MaterialCommunityIcon: FC<IconProps> = props => {
  const {colors} = useTheme();
  return <Icon color={colors.text} {...props} />;
};
