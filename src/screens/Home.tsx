import React, {useCallback} from 'react'
import {Alert, StyleSheet} from 'react-native'
import {ScrollEnabledProvider} from '../context'
import {useNavigation} from '@react-navigation/native'
import {LeftRightNavigation} from '../components'
import {
  NavigationHeader,
  MySafeAreaView,
  MyView,
  MyText,
  MaterialCommunityIcon as Icon
} from '../theme'
import {useAppDispatch, useAppSelector} from '../store'
import * as U from '../utils'
import {removeJWT, selectJWT} from '../store/slice'

export default function Home() {
  const navigation = useNavigation()
  const goBack = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )
  const goHome = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )
  const signUpJWT = useAppSelector(selectJWT)

  const dispatch = useAppDispatch()

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
                onPress={() =>
                  U.removeToStorage('signUpJWT')
                    .then(() => {
                      dispatch(removeJWT())
                      Alert.alert('JWT removed')
                    })
                    .catch(() => Alert.alert("can't remove"))
                }
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
