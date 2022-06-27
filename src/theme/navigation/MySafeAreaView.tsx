import React from 'react';
import type {FC, ComponentProps} from 'react';
import {StyleSheet} from 'react-native';
// import {SafeAreaView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

export type MySafeAreaViewProps = ComponentProps<typeof SafeAreaView>;

export const MySafeAreaView: FC<MySafeAreaViewProps> = ({
  style,
  children,
  ...props
}) => {
  // 터치 기능 있는 View, viewProps와 viewStyle 받아와 적용
  return (
    <SafeAreaView {...props} style={[styles.flex, style]}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
