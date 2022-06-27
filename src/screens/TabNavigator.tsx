import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeNavigator from './HomeNavigator'

import type {RouteProp, ParamListBase} from '@react-navigation/native'
import {Colors} from 'react-native-paper'
type TabBarIconProps = {focused: boolean; color: string; size: number}

// 아이콘 레코드 만들기
const icons: Record<string, string[]> = {
  HomeNavigator: ['home-circle', 'home-circle-outline'],
  Fetch: ['eye-plus', 'eye-plus-outline'],
  ThunkFetch: ['clock-alert', 'clock-alert-outline']
}

const screenOptions = ({route}: {route: RouteProp<ParamListBase, string>}) => {
  return {
    headerShown: false,
    tabBarIcon: ({focused, color, size}: TabBarIconProps) => {
      const {name} = route
      const focusedSize = focused ? size + 6 : size
      const focusedColor = focused ? Colors.lightBlue500 : color
      const [icon, iconOutline] = icons[name]
      const iconName = focused ? icon : iconOutline
      return <Icon name={iconName} size={focusedSize} color={focusedColor} />
    }
  }
}

const Tab = createBottomTabNavigator()

export default function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="HomeNavigator"
        component={HomeNavigator}
        options={{tabBarLabel: 'Home', tabBarBadge: 3}}
      />
    </Tab.Navigator>
  )
}
