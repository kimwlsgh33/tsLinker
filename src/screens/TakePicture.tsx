import React, {useCallback, useEffect, useRef, useState} from 'react'
import {Alert, ImageBackground, StyleSheet} from 'react-native'
import {
  MySafeAreaView,
  MyText,
  MyTouchableView,
  MyView,
  TopBar,
  MaterialCommunityIcon as Icon,
  UnderlineText
} from '../theme/navigation'
import {Camera, CameraType} from 'expo-camera'
import {multipartUploadWithJWTP, readImageAsBase64EncodeingP} from '../utils'
import {Colors} from 'react-native-paper'
import {useAppSelector} from '../store'
import {selectJWT} from '../store/slice'
import {getHostUrl} from '../server'
import {ResponseObject} from './Download'
import {useNavigation} from '@react-navigation/native'

const title = 'TakePicture'
export default function TakePicture() {
  const [error, setError] = useState<Error | null>()
  const [imageUri, setImageUri] = useState<string>('')
  const [base64Uri, setBase64Uri] = useState<string>('')

  const cameraRef = useRef<Camera | null>(null)
  const [type, setType] = useState(CameraType.back)
  const [hasPermission, setHasPermission] = useState(null)

  useEffect(() => {
    ;(async () => {
      setError(null)
      try {
        const {status} = await Camera.requestCameraPermissionsAsync()
        setHasPermission(status === 'granted')
      } catch (e) {
        if (e instanceof Error) setError(e)
      }
    })()
  }, [])

  const takePicture = useCallback(() => {
    ;(async () => {
      setError(null)
      try {
        const result = await cameraRef.current?.takePictureAsync()
        if (result) {
          setImageUri(result.uri)
          const base64 = await readImageAsBase64EncodeingP(result.uri)
          setBase64Uri(base64)
        }
      } catch (e) {
        if (e instanceof Error) setError(e)
      }
    })()
  }, [])

  const reset = useCallback(() => {
    setError(null)
    setImageUri('')
    setBase64Uri('')
  }, [])

  const jwt = useAppSelector(selectJWT)
  const navigation = useNavigation()
  const upload = useCallback(() => {
    ;(async () => {
      if (!jwt || !jwt.length) {
        Alert.alert('JSON Web Token empty. Please signUp or Login!')
      }

      try {
        const result = await multipartUploadWithJWTP<ResponseObject>(
          getHostUrl('/upload'),
          imageUri,
          jwt
        )

        if (result) {
          const {
            uri,
            payload: {name}
          } = result
          navigation.navigate('Uploaded', {uri, name})
        }
      } catch (e) {
        if (e instanceof Error) setError(e)
      }
    })()
  }, [imageUri, jwt])

  if (hasPermission === null) {
    return <MySafeAreaView />
  }

  if (hasPermission === false) {
    return (
      <MySafeAreaView style={[styles.view]}>
        <MyText style={[styles.text]}>Sorry. You have to Allow Camera.</MyText>
      </MySafeAreaView>
    )
  }

  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <TopBar>
          <UnderlineText style={[styles.text]} onPress={upload}>
            upload
          </UnderlineText>
          <UnderlineText style={[styles.text]} onPress={reset}>
            reset
          </UnderlineText>
        </TopBar>
        {error && <MyText style={[styles.text]}>{error.message}</MyText>}
        {base64Uri.length > 0 ? (
          <MySafeAreaView style={[styles.view]}>
            <MyText style={[styles.text]}>Photo</MyText>
            <ImageBackground
              source={{uri: base64Uri}}
              style={[styles.content]}
            />
          </MySafeAreaView>
        ) : (
          <MyView style={[styles.view]}>
            <MyText style={[styles.text]}>{imageUri}</MyText>
            <Camera ref={cameraRef} type={type} style={[styles.camera]}>
              <MyView style={[styles.buttonContainer]}>
                <MyTouchableView
                  style={[styles.touchBar]}
                  onPress={() => {
                    setType(
                      type === CameraType.back
                        ? CameraType.front
                        : CameraType.back
                    )
                  }}>
                  <MyText style={[styles.text]}>Flip</MyText>
                </MyTouchableView>
                <MyTouchableView
                  style={[styles.touchBar]}
                  onPress={takePicture}>
                  <Icon name="camera-iris" size={50} />
                </MyTouchableView>
              </MyView>
            </Camera>
          </MyView>
        )}
      </MyView>
    </MySafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, padding: 5},
  text: {fontSize: 20, padding: 5},
  debugView: {flex: 1},
  content: {flex: 2, alignItems: 'center', justifyContent: 'center'},

  camera: {flex: 3},
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'space-between'
  },
  touchBar: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5
  },
  button: {marginRight: 30},
  uploadText: {fontSize: 20, color: Colors.blue700}
})
