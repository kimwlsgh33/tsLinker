import React from 'react';
import type {ComponentProps, FC} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';

export type MyViewProps = ComponentProps<typeof View> & {
  accent?: boolean;
  notification?: boolean;
  primary?: boolean;
  surface?: boolean;
  background?: boolean;
};

export const MyView: FC<MyViewProps> = ({
  style,
  accent,
  notification,
  primary,
  surface,
  background,
  ...props
}) => {
  const {colors} = useTheme();
  const backgroundColor = accent
    ? colors.accent
    : notification
    ? colors.notification
    : primary
    ? colors.primary
    : surface
    ? colors.surface
    : background
    ? colors.background
    : 'transparent';
  return <View style={[{backgroundColor}, style]} {...props} />;
};
