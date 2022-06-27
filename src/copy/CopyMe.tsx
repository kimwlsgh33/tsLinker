import React from 'react';

import {StyleSheet} from 'react-native';
import {MySafeAreaView, MyText, MyView, TopBar} from '../theme/navigation';

const title = 'CopyMe';
export default function CopyMe() {
  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <TopBar />
        <MyView style={[styles.contents]}>
          <MyText style={[styles.text]}>{title}</MyText>
        </MyView>
      </MyView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  contents: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20},
});
