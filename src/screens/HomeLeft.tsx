import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {
  NavigationHeader,
  MySafeAreaView,
  MyText,
  MyView,
  MaterialCommunityIcon as Icon,
} from '../theme';
import {LeftRightNavigation} from '../components';

const title = '카메라 접근을 허가해 주세요';
export default function HomeLeft() {
  const navigation = useNavigation();
  const goHome = useCallback(() => navigation.navigate('Home'), []);

  // 이 컴포넌트가 네비게이션이 보여주고 있는 화면 일때 true 반환
  const focused = useIsFocused();
  useEffect(() => {
    console.log('HomeLeft isFocused', focused);
  });

  // 이 컴포넌트가 네비게이션에 보여지고 나서, 함수 실행
  useFocusEffect(() => {
    console.log('useFocusEffect called');
  });

  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <NavigationHeader
          Right={() => <Icon name="close" size={30} onPress={goHome} />}
        />
        <LeftRightNavigation distance={40} onRightToLeft={goHome}>
          <MyView style={[styles.contents]}>
            <MyText style={[styles.text]}>{title}</MyText>
          </MyView>
        </LeftRightNavigation>
      </MyView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  text: {fontSize: 20},
  contents: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
