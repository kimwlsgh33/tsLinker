import React from 'react';
import type {FC} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';
import {MyView} from './MyView';
import type {MyViewProps} from './MyView';

export type MyTouchableViewProps = MyViewProps & {
  onPress?: () => void;
  touchableStyle?: StyleProp<ViewStyle>;
};

export const MyTouchableView: FC<MyTouchableViewProps> = ({
  children,
  onPress,
  touchableStyle,
  ...viewProps
}) => {
  // 터치 기능 있는 View, viewProps와 viewStyle 받아와 적용
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.touchable, touchableStyle]}>
      <MyView {...viewProps}>{children}</MyView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {width: '100%', alignItems: 'center', justifyContent: 'center'},
});
