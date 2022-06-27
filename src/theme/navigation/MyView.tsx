import React from 'react';
import type {ComponentProps, FC} from 'react';
import {View} from 'react-native';
import {useTheme} from '@react-navigation/native';

export type MyViewProps = ComponentProps<typeof View> & {
  card?: boolean;
  notification?: boolean;
  primary?: boolean;
  border?: boolean;
  background?: boolean;
};

export const MyView: FC<MyViewProps> = ({
  card,
  notification,
  primary,
  border,
  background,
  style,
  ...props
}) => {
  const {colors} = useTheme();
  const backgroundColor = card
    ? colors.card
    : primary
    ? colors.primary
    : notification
    ? colors.notification
    : colors.background;
  const borderColor = border ? colors.border : undefined;
  const borderWidth = border ? 1 : undefined;
  return (
    <View
      style={[{backgroundColor, borderColor, borderWidth}, style]}
      {...props}
    />
  );
};
