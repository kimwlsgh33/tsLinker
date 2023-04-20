import React, {useCallback, useEffect, useState} from 'react'
import {Alert, ImageBackground, StyleSheet} from 'react-native'
import {ScrollEnabledProvider} from '../context'
import {type RouteProp, useNavigation, useRoute} from '@react-navigation/native'
import {LeftRightNavigation} from '../components'
import {
  MySafeAreaView,
  MyView,
  MyText,
  MaterialCommunityIcon as Icon
} from '../theme'

type ParamList = {
  Uploaded: {
    uri: string
    name: string
  }
}

export default function Uploaded() {
  const {params} = useRoute<RouteProp<ParamList, 'Uploaded'>>()
  if (!params) {
    return <MySafeAreaView></MySafeAreaView>
  }

  const {name, uri} = params

  const navigation = useNavigation()
  const goHome = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView style={[styles.view]}>
          <LeftRightNavigation distance={40} onLeftToRight={goHome}>
            <MyText style={[styles.text]}>uri : {uri}</MyText>
            <MyText style={[styles.text]}>uploader : {name}</MyText>
            {uri && uri.length > 0 && (
              <ImageBackground source={{uri: uri}} style={{flex: 1}} />
            )}
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
