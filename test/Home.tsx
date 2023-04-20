import React, {useCallback, useEffect, useState} from 'react'
import {Alert, Image, ImageBackground, StyleSheet} from 'react-native'
import {ScrollEnabledProvider} from '../context'
import {useNavigation} from '@react-navigation/native'
import {LeftRightNavigation} from '../components'
import {
  NavigationHeader,
  MySafeAreaView,
  MyView,
  MyText,
  MaterialCommunityIcon as Icon,
  TopBar,
  UnderlineText
} from '../theme'
import {useAppDispatch, useAppSelector} from '../store'
import * as U from '../utils'
import * as D from '../data'
import {removeJWT, selectJWT} from '../store/slice'
import {useToggle} from '../hooks'
import {existsP, getDocPath, getCachePath, getFilename} from '../utils'
import {ActivityIndicator} from 'react-native-paper'
import {getHostUrl} from '../server'

type ResponseObject = {
  success?: boolean
  message?: string
  header?: {
    alg: string
    typ: string
  }
  payload?: {
    email: string
    exp: number
    iat: number
    name: string
    password: string
    provider: string
  }
  signature?: string
  uri?: string
}

export default function Home() {
  const [imageUri, setImageUri] = useState<string>('')
  const [base64Uri, setBase64Uri] = useState<string>('')
  const [error, setError] = useState<Error | null>()
  const [loading, toggleLoading] = useToggle()

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

  const download = useCallback(() => {
    ;(async () => {
      try {
        // 이전 에러 내용 제거
        setError(null)
        // 이전 uri 제거
        setBase64Uri('')
        // 로딩 화면 활성화
        toggleLoading()
        // DocDir/download.jpg로 파일다운
        const {uri} = await U.downloadToDocDirP(D.randomImage(), 'download.jpg')
        setImageUri(uri)
        // base64 문자열로 변환
        const base64 = await U.readImageAsBase64EncodeingP(uri)
        // state에 저장
        setBase64Uri(base64)

        // loading 종료
        toggleLoading()
      } catch (e) {
        // 에러 설정
        setError(e)
        // 로딩 종료
        toggleLoading()
      }
    })()
  }, [])

  const upload = useCallback(() => {
    ;(async () => {
      try {
        setError(null)
        const url = getHostUrl('/upload')
        const {uri} = await U.multipartUplaodP(url, imageUri)
        if (uri) Alert.alert('Upload Complete', getFilename(uri))
      } catch (e) {
        setError(e)
      }
    })()
  }, [])

  // imageUri와 signUpJWT가 변경될때 마다
  const uploadWithJWT = useCallback(() => {
    ;(async () => {
      try {
        setError(null)
        const url = getHostUrl('/upload')
        const data: ResponseObject = await U.multipartUploadWithJWTP<object>(
          url,
          imageUri,
          signUpJWT
        )

        const {uri, success} = data
        if (uri) Alert.alert('Upload Complete', getFilename(uri))
      } catch (e) {
        setError(e)
      }
    })()
  }, [imageUri, signUpJWT])

  const reset = useCallback(() => {
    setError(null)
    setImageUri('')
    setBase64Uri('')
  }, [])

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
          <TopBar>
            <UnderlineText onPress={download} style={[{padding: 5}]}>
              download
            </UnderlineText>
            <UnderlineText onPress={uploadWithJWT} style={[{padding: 5}]}>
              upload
            </UnderlineText>
            <UnderlineText onPress={reset} style={[{padding: 5}]}>
              reset
            </UnderlineText>
          </TopBar>
          <LeftRightNavigation distance={40} onLeftToRight={goHome}>
            <MyText style={[styles.text]}>signUpJWT: {signUpJWT}</MyText>
            {loading && <ActivityIndicator style={{flex: 1}} />}
            {base64Uri.length > 0 && (
              <>
                <MyText>imageUri : {imageUri}</MyText>
                <ImageBackground source={{uri: base64Uri}} style={{flex: 1}} />
              </>
            )}
            {error && <MyText style={[styles.text]}>{error.message}</MyText>}
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
