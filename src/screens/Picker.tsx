import React, {useCallback, useState} from 'react'
import {
  requestMediaLibraryPermissionsAsync,
  launchImageLibraryAsync,
  MediaTypeOptions,
  type ImageInfo
} from 'expo-image-picker'
import {Alert, ImageBackground, StyleSheet} from 'react-native'
import {
  MySafeAreaView,
  MyText,
  MyView,
  TopBar,
  UnderlineText
} from '../theme/navigation'
import {
  FileUriP,
  multipartUploadWithJWTP,
  readDocDir,
  readImageAsBase64EncodeingP
} from '../utils'
import {useNavigation} from '@react-navigation/native'
import {useAppSelector} from '../store'
import {selectJWT} from '../store/slice'
import {getHostUrl} from '../server'
import {ResponseObject} from './Download'
import {getInfoAsync} from 'expo-file-system'

const title = 'Picker'
export default function Picker() {
  const [error, setError] = useState<Error | null>()
  const [imageUri, setImageUri] = useState<string>('')
  const [base64Uri, setBase64Uri] = useState<string>('')

  const navigation = useNavigation()
  const signUpJWT = useAppSelector(selectJWT)

  const open = useCallback(() => {
    ;(async () => {
      try {
        // 사용자 미디어라이브러리 권한 획득
        const {status} = await requestMediaLibraryPermissionsAsync()

        // 권한이 없으면 알람
        if (status !== 'granted') {
          Alert.alert(
            'Sorry, we need camera roll permissions to make this work'
          )
          return
        }

        // 미디어 가져오기
        const result = await launchImageLibraryAsync({
          mediaTypes: MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        })

        console.log(result)

        if (!result.cancelled) {
          const {uri} = result as ImageInfo
          setImageUri(uri)
          const base64 = await readImageAsBase64EncodeingP(uri)
          setBase64Uri(base64)
        }
      } catch (e) {
        setError(e)
      }
    })()
  }, [])

  const upload = useCallback(() => {
    ;(async () => {
      if (!signUpJWT || !signUpJWT.length) {
        Alert.alert('JSON Web Token empty. Please signUp or Login!')
        return
      }
      try {
        const {
          uri,
          payload: {name}
        } = await multipartUploadWithJWTP<ResponseObject>(
          getHostUrl('/upload'),
          imageUri,
          signUpJWT
        )
        navigation.navigate('Uploaded', {uri, name})
      } catch (e) {
        setError(e)
      }
    })()
  }, [signUpJWT, imageUri])

  const reset = useCallback(() => {
    setError(null)
    setImageUri('')
    setBase64Uri('')
  }, [])

  const getDocImage = useCallback(() => {
    ;(async () => {
      try {
        const uri = await FileUriP(
          'file:///Users/gimjinho/Library/Developer/CoreSimulator/Devices/89A930FF-0A76-4401-B142-C34F7BE7E8E5/data/Containers/Data/Application/C2501A92-0311-4F37-A936-85C3F6D2097E/Documents/ExponentExperienceData/%2540jinhokim%252Fbare_project/download.jpg'
        )

        if (typeof uri === 'string') {
          const data = await readDocDir(uri)
          console.log(data)
        }
      } catch (e) {
        console.log(e.message)
      }
    })()
  }, [])

  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <TopBar>
          <UnderlineText style={[styles.text]} onPress={open}>
            open
          </UnderlineText>
          <UnderlineText style={[styles.text]} onPress={getDocImage}>
            getDoc
          </UnderlineText>
          <UnderlineText style={[styles.text]} onPress={upload}>
            upload
          </UnderlineText>
          <UnderlineText style={[styles.text]} onPress={reset}>
            reset
          </UnderlineText>
        </TopBar>
        <MyView style={[styles.debugView]}>
          <MyText style={[styles.text]}>signUpJWT: {signUpJWT}</MyText>
          {error && <MyText style={[styles.text]}>{error.message}</MyText>}
        </MyView>
        {base64Uri.length > 0 && (
          <ImageBackground
            source={{uri: base64Uri}}
            style={[styles.contents]}
          />
        )}
      </MyView>
    </MySafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  text: {fontSize: 20, padding: 5},
  debugView: {flex: 1},
  contents: {flex: 2, alignItems: 'center', justifyContent: 'center'}
})
