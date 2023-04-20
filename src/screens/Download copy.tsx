import React, {useCallback, useState} from 'react'
import {Alert, ImageBackground, StyleSheet} from 'react-native'
import {ScrollEnabledProvider} from '../context'
import {useNavigation} from '@react-navigation/native'
import {LeftRightNavigation} from '../components'
import {
  MySafeAreaView,
  MyView,
  MyText,
  MaterialCommunityIcon as Icon,
  TopBar,
  UnderlineText
} from '../theme'
import {ActivityIndicator} from 'react-native-paper'
import {useAppDispatch, useAppSelector} from '../store'
import {addImage, resetImages, selectJWT} from '../store/slice'
import * as U from '../utils'
import * as D from '../data'
import {getHostUrl} from '../server'
import {random} from 'faker'

export type ResponseObject = {
  header: {
    alg: string
    typ: string
  }
  payload: {
    email: string
    exp: number
    iat: number
    name: string
    password: string
    provider: string
  }
  signature: string
  uri: string
}

export default function Uploaded() {
  const [loading, setLoading] = useState<boolean>(false)
  const [imageUri, setImageUri] = useState<string>('')
  const [base64Uri, setBase64Uri] = useState<string>('')
  const [error, setError] = useState<Error | null>()

  const signUpJWT = useAppSelector(selectJWT)

  const navigation = useNavigation()

  const goHome = useCallback(
    () => navigation.canGoBack() && navigation.goBack(),
    []
  )

  const dispatch = useAppDispatch()

  const download = useCallback(() => {
    ;(async () => {
      // 로딩 화면 활성화
      setLoading(true)
      try {
        // 이전 에러 내용 제거
        setError(null)
        // 이전 uri 제거
        setBase64Uri('')
        // DocDir/download.jpg로 파일다운
        const {uri} = await U.downloadToDocDirP(D.randomImage(), 'download.jpg')
        setImageUri(uri)
        // base64 문자열로 변환
        const base64 = await U.readImageAsBase64EncodeingP(uri)
        // state에 저장
        setBase64Uri(base64)
        // storage에 저장
        dispatch(addImage({id: D.randomId(), uri}))
      } catch (e) {
        // 에러 설정
        setError(e)
      }
      // 로딩 종료
      setLoading(false)
    })()
  }, [signUpJWT])

  const upload = useCallback(() => {
    ;(async () => {
      try {
        setError(null)
        const url = getHostUrl('/upload')
        const {uri} = await U.multipartUplaodP(url, imageUri)
        if (uri) Alert.alert('Upload Complete', U.getFilename(uri))
      } catch (e) {
        setError(e)
      }
    })()
  }, [])

  // imageUri와 signUpJWT가 변경될때 마다 함수 최신화
  const uploadWithJWT = useCallback(() => {
    ;(async () => {
      // jwt없으면 오류 알람
      if (!signUpJWT || !signUpJWT.length) {
        Alert.alert('JSON Web Token empty. Please signUp or Login!')
        return
      }

      try {
        const result = await U.multipartUploadWithJWTP<ResponseObject>(
          getHostUrl('/upload'),
          imageUri,
          signUpJWT
        )

        const {
          uri,
          payload: {name}
        } = result

        if (uri) Alert.alert('Upload Complete', U.getFilename(uri))
        navigation.navigate('Uploaded', {uri, name})
      } catch (e) {
        // e가 Error이면, 에러 설정
        if (e instanceof Error) setError(e)
      }
    })()
  }, [imageUri, signUpJWT])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setImageUri('')
    setBase64Uri('')
  }, [])

  const removeAllImages = useCallback(() => dispatch(resetImages()), [])

  if (loading)
    return (
      <MySafeAreaView
        style={[{alignItems: 'center', justifyContent: 'center'}]}>
        <ActivityIndicator size="large" color="blue" />
      </MySafeAreaView>
    )

  return (
    <MySafeAreaView>
      <ScrollEnabledProvider>
        <MyView style={[styles.view]}>
          <TopBar>
            <UnderlineText onPress={download} style={[styles.text]}>
              download
            </UnderlineText>
            <UnderlineText onPress={uploadWithJWT} style={[styles.text]}>
              upload
            </UnderlineText>
            <UnderlineText onPress={reset} style={[styles.text]}>
              reset
            </UnderlineText>
            <UnderlineText onPress={removeAllImages} style={[styles.text]}>
              reset Images
            </UnderlineText>
          </TopBar>
          <LeftRightNavigation distance={40} onLeftToRight={goHome}>
            <MyText style={[styles.text]}>signUpJWT: {signUpJWT}</MyText>
            {/* {loading && <ActivityIndicator style={{flex: 1}} />} */}
            {base64Uri.length > 0 && (
              <>
                <MyText style={[styles.text]}>imageUri : {imageUri}</MyText>
                <ImageBackground
                  source={{uri: base64Uri}}
                  style={[styles.content]}
                />
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
  view: {flex: 1, padding: 5},
  text: {marginRight: 10},
  debugView: {flex: 1},
  content: {flex: 2, alignItems: 'center', justifyContent: 'center'}
})
