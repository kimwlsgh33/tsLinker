import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Alert, StyleSheet} from 'react-native';
import {LeftRightNavigation} from '../components';
import {
  NavigationHeader,
  MySafeAreaView,
  MyText,
  MyView,
  TopBar,
  MaterialCommunityIcon as Icon,
} from '../theme';

const title = 'HomeRight';
export default function HomeRight() {
  const navigation = useNavigation();
  const route = useRoute();
  const goBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    [],
  );
  const goHome = useCallback(() => navigation.navigate('Home'), []);
  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <NavigationHeader
          title={title}
          Left={() => (
            <Icon name="arrow-left-bold" size={50} onPress={goBack} />
          )}
          Right={() => (
            <Icon
              name="shield-airplane"
              size={50}
              onPress={() => Alert.alert('menu pressed')}
            />
          )}
        />
        <TopBar>
          <MyText onPress={goBack} style={[styles.text]}>
            go back
          </MyText>
          <MyText onPress={goHome} style={[styles.text, {marginLeft: 10}]}>
            go Home
          </MyText>
        </TopBar>
        <LeftRightNavigation distance={40} onLeftToRight={goHome}>
          <MyView style={[styles.contents]}>
            <MyText style={[styles.text]}>{title}</MyText>
            <MyText style={[styles.text]}>
              {JSON.stringify(route, null, 2)}
            </MyText>
          </MyView>
        </LeftRightNavigation>
      </MyView>
    </MySafeAreaView>
  );
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  contents: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text: {fontSize: 20},
});
