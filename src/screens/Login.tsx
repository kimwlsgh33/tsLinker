import React, {useCallback, useEffect, useState} from 'react'

import {Alert, StyleSheet} from 'react-native'
import {
  MySafeAreaView,
  MyText,
  MyView,
  MyTextInput,
  MyTouchableView,
  UnderlineText
} from '../theme/navigation'
import {AutoFocusProvider, useAutoFocus} from '../context'
import {useNavigation} from '@react-navigation/native'
import {useAppDispatch, useAppSelector} from '../hooks/useRedux'
import * as U from '../utils'
import {loggedUserKey, login} from '../store/slice/loginSlice'
import {getHostUrl, postWithJWT} from '../server'
import {signUpJWT} from '../store/slice'

export default function Login() {
  const [email, setEmail] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const focus = useAutoFocus()
  const navigation = useNavigation()

  // store에서 jwt 가져옴 ( 있으면 )
  // const signUpJWT = useAppSelector(selectStorage)

  const dispatch = useAppDispatch()
  const goTabNavigator = useCallback(
    () =>
      // 기기 storage에서 jwt 받아오기, initial {}
      U.readFromStorage('signUpJWT')
        .then((jwt) => {
          postWithJWT(getHostUrl('/auth/login'), {email, name, password}, jwt)
            .then((res) => res.json())
            .then((result) => {
              console.log(result)
              const {success, provider, name, message} = result

              // 로그인 성공시,
              if (success === true) {
                // store에 jwt, 데이터 저장
                dispatch(login({email, name, password}))
                dispatch(signUpJWT(jwt))
                // Tab으로 이동
                navigation.navigate('TabNavigator')
              }
              // 환영 메시지 or 에러 메시지 알림
              Alert.alert(message)
            })
            .catch((err) => Alert.alert(err.message)) // 비정상적인 오류 (앱사이드) 감지해서 알림
        })
        .catch((err) => Alert.alert(err.message)),

    [email, name, password]
  )

  const goSignUp = useCallback(() => navigation.navigate('SignUp'), [])

  const loggedIn = useAppSelector(({login}) => login.loggedIn)

  // AsyncStorage 정보가져와서, login 입력창 채우기 - login 화면 첫 렌더링시, logout으로 렌더링시
  useEffect(() => {
    U.readFromStorage(loggedUserKey)
      .then((value) => {
        if (value.length > 0) {
          const savedUser = JSON.parse(value)
          const {email, name, password} = savedUser
          setEmail(email)
          setName(name)
          setPassword(password)
        }
      })
      .catch((e) => console.log('Login Error : ', e.message))
    // U.removeToStorage('signUpJWT')
    //   .then(() => console.log('Removed.'))
    //   .catch((e) => console.log(e.message))
  }, [loggedIn])

  return (
    <MySafeAreaView>
      <MyView style={[styles.view]}>
        <AutoFocusProvider contentContainerStyle={[styles.keyboardAwareFocus]}>
          <MyView style={[styles.textView]}>
            <MyText style={[styles.text]}>email</MyText>
            <MyView border style={[styles.textInputView]}>
              <MyTextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={email}
                onChangeText={setEmail}
                placeholder="enter your email"
              />
            </MyView>
          </MyView>
          <MyView style={[styles.textView]}>
            <MyText style={[styles.text]}>password</MyText>
            <MyView border style={[styles.textInputView]}>
              <MyTextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput]}
                value={password}
                onChangeText={setPassword}
                placeholder="enter your password"
              />
            </MyView>
          </MyView>
          <MyTouchableView
            notification
            style={[styles.touchableView]}
            onPress={goTabNavigator}>
            <MyText style={[styles.text]}>Login</MyText>
          </MyTouchableView>
          <UnderlineText
            style={[styles.text, {marginTop: 15}]}
            onPress={goSignUp}>
            SignUp
          </UnderlineText>
        </AutoFocusProvider>
      </MyView>
    </MySafeAreaView>
  )
}

const styles = StyleSheet.create({
  view: {flex: 1, justifyContents: 'space-between', alignItems: 'center'},
  text: {fontSize: 20},
  keyboardAwareFocus: {
    flex: 1,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textView: {width: '100%', padding: 5, marginBottom: 10},
  textInput: {fontSize: 24, padding: 10},
  textInputView: {marginTop: 5, borderRadius: 10},
  touchableView: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 10,
    width: '90%',
    justifyContents: 'center',
    alignItems: 'center'
  }
})
