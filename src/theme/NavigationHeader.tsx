import React from 'react';
import type {FC, ReactNode} from 'react';
import {StyleProp, StyleSheet, TextStyle, ViewStyle} from 'react-native';
import {MyView, MyText} from './navigation';

export type NavigationHeaderProps = {
  title?: string;
  Left?: () => ReactNode;
  Right?: () => ReactNode;
  viewStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
};

export const NavigationHeader: FC<NavigationHeaderProps> = ({
  title,
  Left,
  Right,
  viewStyle,
  titleStyle,
}) => {
  return (
    <MyView style={[styles.view, viewStyle]}>
      {Left && Left()}
      <MyView style={[styles.flex]}>
        <MyText style={[styles.title, titleStyle]}>{title}</MyText>
      </MyView>
      {Right && Right()}
    </MyView>
  );
};

const styles = StyleSheet.create({
  view: {width: '100%', padding: 5, flexDirection: 'row', alignItems: 'center'},
  title: {fontSize: 20, fontWeight: '500', textAlign: 'center'},
  flex: {flex: 1, backgroundColor: 'transparent'},
});
