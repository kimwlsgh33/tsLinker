import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import SignUp from './SignUp';
import TabNavigator from './TabNavigator';
import DrawerContent from './DrawerContent';
const Drawer = createDrawerNavigator();

export default function MainNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{headerShown: false}}
      // 컴포넌트에서 훅 사용불가
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Login" component={Login} />
      <Drawer.Screen name="SignUp" component={SignUp} />
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{title: 'Home'}}
      />
    </Drawer.Navigator>
  );
}
