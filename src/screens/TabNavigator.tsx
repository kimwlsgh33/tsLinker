import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import HomeNavigator from './HomeNavigator'

import type {RouteProp, ParamListBase} from '@react-navigation/native'
import {Colors} from 'react-native-paper'
import Download from './Download'
import Picker from './Picker'
import TakePicture from './TakePicture'
import Uploaded from './Uploaded'
import {MyText} from '../theme'
type TabBarIconProps = {focused: boolean; color: string; size: number}
type TabBarLabelProps = {focused: boolean; color: string}

// 아이콘 레코드 만들기
const icons: Record<string, string[]> = {
  HomeNavigator: ['home-circle', 'home-circle-outline'],
  Download: ['file-upload', 'file-upload-outline'],
  Picker: ['book-minus-multiple', 'book-minus-multiple-outline'],
  TakePicture: ['camera-retake', 'camera-retake-outline'],
  Uploaded: ['download-network', 'download-network-outline']
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
    },
    tabBarLabel: ({focused, color}: TabBarLabelProps) => {
      const {name} = route
      const fontSize = focused ? 12 : 8
      const focusedColor = focused ? Colors.lightBlue500 : color
      return <MyText style={{color: focusedColor, fontSize}}>{name}</MyText>
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
      <Tab.Screen name="Download" component={Download} />
      <Tab.Screen name="Picker" component={Picker} />
      <Tab.Screen name="TakePicture" component={TakePicture} />
      <Tab.Screen name="Uploaded" component={Uploaded} />
    </Tab.Navigator>
  )
}
