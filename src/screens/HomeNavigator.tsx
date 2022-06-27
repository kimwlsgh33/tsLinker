import React, {useMemo} from 'react';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Home';
import HomeLeft from './HomeLeft';
import HomeRight from './HomeRight';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useNavigationHorizontalInterpolator} from '../hooks';
// import {Colors} from 'react-native-paper';

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export default function HomeNavigator() {
  const interpolator = useNavigationHorizontalInterpolator();
  const leftOptions = useMemo<StackNavigationOptions>(
    () => ({
      gestureDirection: 'horizontal-inverted',
      cardStyleInterpolator: interpolator,
    }),
    [],
  );
  const rightOptions = useMemo<StackNavigationOptions>(
    () => ({
      gestureDirection: 'horizontal',
      cardStyleInterpolator: interpolator,
    }),
    [],
  );

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="HomeLeft"
        component={HomeLeft}
        options={leftOptions}
      />
      <Stack.Screen
        name="HomeRight"
        component={HomeRight}
        options={rightOptions}
      />
    </Stack.Navigator>
  );
}

/*

  screenOptions={{
        // 헤더 박스 스타일 지정
        headerStyle: {
          backgroundColor: Colors.pink500,
        },
        // 헤더 버튼 색상 지정
        headerTintColor: 'white',
        // 헤더 제목 스타일 지정
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}

*/
