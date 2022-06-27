/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import 'react-native-gesture-handler'
import React, {useCallback, useState} from 'react'
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer
} from '@react-navigation/native'
import MainNavigator from './src/screens/MainNavigator'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {enableScreens} from 'react-native-screens'

// 현재 시스템 테마 가져오기
import {useColorScheme} from 'react-native'

// 자식요소에서 테마 변경가능
import {ToggleThemeProvider} from './src/context'

// redux provider
import {Provider as ReduxProvider} from 'react-redux'
import {store} from './src/store'

enableScreens()

const App = () => {
  const scheme = useColorScheme()
  const [theme, setTheme] = useState(
    scheme === 'dark' ? DarkTheme : DefaultTheme
  )

  const toggleTheme = useCallback(
    // 현재 사용중인 theme state의 dark 멤버변수 체크
    () => setTheme(({dark}) => (dark ? DefaultTheme : DarkTheme)),
    []
  )
  return (
    <ToggleThemeProvider toggleTheme={toggleTheme}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <NavigationContainer theme={theme}>
            <MainNavigator />
          </NavigationContainer>
        </ReduxProvider>
      </SafeAreaProvider>
    </ToggleThemeProvider>
  )
}

export default App
