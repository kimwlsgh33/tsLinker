import React, {useCallback, useState} from 'react'

import {Alert, StyleSheet} from 'react-native'
import {
  MySafeAreaView,
  MyText,
  MyView,
  MyTextInput,
  MyTouchableView,
  UnderlineText
} from '../theme/navigation'
import {useNavigation} from '@react-navigation/native'
import * as D from '../data'
import * as U from '../utils'

import {AutoFocusProvider, useAutoFocus} from '../context'
import {useAppDispatch} from '../store'
import {signUp, signUpJWT} from '../store/slice'
import {getHostUrl, post} from '../server'

export default function SignUp() {
  const [email, setEmail] = useState<string>(D.randomEmail)
  const [name, setName] = useState<string>(D.randomName)
  const [password, setPassword] = useState<string>('1')
  const [confirmPassword, setConfirmPassword] = useState<string>(password)

  const focus = useAutoFocus()
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const goTabNavigator = useCallback(() => {
    if (password === confirmPassword) {
      // authServer에 signUp 요청 보내기
      post(getHostUrl('/auth/signUp'), {name, email, password})
        .then((res) => res.json()) // 받은응답을, json 형식으로 바꾸기
        .then((result) => {
          // jwt 받아오기
          const {jwt} = result
          // 기기의 storage에 저장 - 이후에 store에 자동저장
          U.writeToStorage('signUpJWT', jwt)
            .then(() => {
              // store에 토큰, 데이터 저장
              dispatch(signUpJWT(jwt))
              dispatch(signUp({email, name, password}))
              // Tab으로 이동
              Alert.alert(`환영합니다. ${name}님`)
              navigation.navigate('TabNavigator')
            })
            .catch((err) => Alert.alert(err.message))
        })
        .catch((err) => Alert.alert(err.message))
    } else Alert.alert('password is invalid')
  }, [email, name, password, confirmPassword])

  const goLogin = useCallback(() => navigation.navigate('Login'), [])

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
            <MyText style={[styles.text]}>name</MyText>
            <MyView border style={[styles.textInputView]}>
              <MyTextInput
                onFocus={focus}
                style={[styles.textInput]}
                value={name}
                onChangeText={setName}
                placeholder="enter your name"
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

          <MyView style={[styles.textView]}>
            <MyText style={[styles.text]}>confirm password</MyText>
            <MyView border style={[styles.textInputView]}>
              <MyTextInput
                secureTextEntry
                onFocus={focus}
                style={[styles.textInput]}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="confirm password"
              />
            </MyView>
          </MyView>
          <MyTouchableView
            notification
            style={[styles.touchableView]}
            onPress={goTabNavigator}>
            <MyText style={[styles.text]}>SignUp</MyText>
          </MyTouchableView>
          <UnderlineText
            style={[styles.text, {marginTop: 15}]}
            onPress={goLogin}>
            Login
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
