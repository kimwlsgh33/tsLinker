import React, {useMemo} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {fibonacci} from './fibonacci';
import * as D from '../data';
import {Colors} from 'react-native-paper';

/*
  <memo>
  fibo(0) 값
  fibo(1) 값
  fibo(2) -> fibo(1) + fibo(0) - 메모된 값 불러와 사용
  fibo(3) -> fibo(2) + fibo(1) - 메모된 값 불러와 사용
  ...
  fibo(20) -> fibo(19) + fibo(18) - 메모된 값 불러와 사용
  </memo>
*/

export default function Fibo() {
  // 피보나치 함수 계산값 메모하는 함수 생성
  const memoizedFibonacci = useMemo(() => fibonacci, []);

  // 피보나치 20 함수 계산값 메모 (첫렌더링 후엔 계산 안하도록)
  const fibos = useMemo(
    () =>
      D.makeArray(20 + 1).map((notUsed, idx) => ({
        number: idx,
        fibonacci: memoizedFibonacci(idx),
        // 현재 idx에 대한 피보나치 값 메모
      })),
    [],
  );

  return (
    <View style={[styles.view]}>
      <Text style={[styles.text]}>Fibo</Text>
      <FlatList
        contentContainerStyle={[styles.contentContainerStyle]}
        data={fibos}
        renderItem={({item}) => (
          <Text style={[styles.text]}>
            {item.number} : {item.fibonacci}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, backgroundColor: Colors.blue900},
  text: {fontSize: 20, color: 'white'},
  contentContainerStyle: {alignItems: 'center'},
});
