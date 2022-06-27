import React, {useCallback} from 'react'
import {Alert, StyleSheet} from 'react-native'
import {ScrollEnabledProvider} from '../context'
import {useNavigation, useRoute} from '@react-navigation/native'
import {LeftRightNavigation} from '../components'
import {
  NavigationHeader,
  MySafeAreaView,
  MyView,
  MyText,
  MaterialCommunityIcon as Icon
} from '../theme'
import {useAppSelector} from '../store'

export default function Home() {
  const navigation = useNavigation()
  const route = useRoute()
  const goBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )
  const goHome = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )
  const {signUpJWT} = useAppSelector(({storage}) => storage)

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView style={[styles.view]}>
          <NavigationHeader
            title="Home"
            Left={() => (
              <Icon name="arrow-left-bold" size={30} onPress={goBack} />
            )}
            Right={() => (
              <Icon
                name="shield-airplane"
                size={30}
                onPress={() => Alert.alert('menu pressed')}
              />
            )}
          />

          <LeftRightNavigation distance={40} onLeftToRight={goHome}>
            <MyText style={[styles.text]}>signUpJWT: {signUpJWT}</MyText>
          </LeftRightNavigation>
        </MyView>
      </ScrollEnabledProvider>
    </MySafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1},
  text: {marginRight: 10, fontSize: 20}
})
