import React, {useCallback, useState} from 'react'
import {Alert, FlatList, ImageBackground, StyleSheet} from 'react-native'
import {ScrollEnabledProvider, useScrollEnabled} from '../context'
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
import {addImage, resetImages, selectImages, selectJWT} from '../store/slice'
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
  const [error, setError] = useState<Error | null>()
  const [scrollEnabled] = useScrollEnabled()
  const images = useAppSelector(selectImages)

  console.log(imageUri)

  const signUpJWT = useAppSelector(selectJWT)

  const navigation = useNavigation()

  const dispatch = useAppDispatch()

  const download = useCallback(() => {
    ;(async () => {
      // 로딩 화면 활성화
      setLoading(true)
      try {
        // 이전 에러 내용 제거
        setError(null)
        // DocDir/랜덤이름.jpg로 파일다운
        const {uri} = await U.downloadToDocDirP(
          D.randomImage(),
          `${Math.random() * 1000000}.jpg`
        )
        setImageUri(uri)
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
  }, [])

  const removeAllImages = useCallback(() => dispatch(resetImages()), [])

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
            <UnderlineText onPress={removeAllImages} style={[styles.text]}>
              reset Images
            </UnderlineText>
          </TopBar>
          {loading && (
            <MyView
              style={[
                {height: 300, alignItems: 'center', justifyContent: 'center'}
              ]}>
              <ActivityIndicator size="large" color="blue" />
            </MyView>
          )}
          {error && <MyText style={[styles.text]}>{error.message}</MyText>}
          {images.length === 0 ? (
            <MyView style={[styles.view]}>
              <MyText style={[styles.text]}>No Images</MyText>
            </MyView>
          ) : (
            <FlatList
              data={images}
              renderItem={({item: {uri}}) => (
                <ImageBackground
                  source={{uri}}
                  style={{width: '100%', height: 300}}
                />
              )}
              keyExtractor={(item) => item.id}
              scrollEnabled={scrollEnabled}
            />
          )}
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
