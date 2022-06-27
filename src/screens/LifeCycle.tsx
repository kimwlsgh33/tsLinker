import React, {useEffect, useLayoutEffect} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Colors} from 'react-native-paper';
import * as D from '../data';
import type {LayoutChangeEvent} from 'react-native';
import {onLayout} from '../hooks';

const LifeCycle = () => {
  // useEffect(() => {
  //   console.log(Platform.OS, 'useEffect called.');
  //   return () => console.log(Platform.OS, 'useEffect finished.');
  // }, []);

  // useLayoutEffect(() => {
  //   console.log(Platform.OS, 'useLayoutEffect called.');
  //   return () => console.log(Platform.OS, 'useLayoutEffect finished.');
  // }, []);

  const [layout, setLayout] = onLayout();

  // 렌더링 마쳤을시, setLayout실행
  return (
    <View style={[styles.view]} onLayout={setLayout}>
      <Text style={[styles.text]}>LifeCycle</Text>
      <Text>layout: {JSON.stringify(layout, null, 2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5, backgroundColor: Colors.blue900},
  text: {fontSize: 30, color: 'white'},
});

export default LifeCycle;
