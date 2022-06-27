import React from 'react';
import type {ComponentProps, FC} from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';

export type MyTextProps = ComponentProps<typeof Text>;

export const MyText: FC<MyTextProps> = ({style, ...props}) => {
  const {colors} = useTheme();
  return <Text style={[{color: colors.text}, style]} {...props} />;
};
