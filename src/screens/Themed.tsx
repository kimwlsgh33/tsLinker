import React, {useCallback, useState, useRef} from 'react';
import type {FC} from 'react';
import {Keyboard, StyleSheet, Switch} from 'react-native';
import type {TextInput} from 'react-native';
import {useTheme} from 'react-native-paper';
import * as D from '../data';
import {AutoFocusProvider, useAutoFocus, useToggleTheme} from '../context';
import {MyText, MyTextInput, MyView} from '../theme/paper';

const AutoFocus: FC = () => {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark, colors} = useTheme();
  const toggleTheme = useToggleTheme();

  const textInputRef = useRef<TextInput | null>(null);
  const setFocus = useCallback(() => {
    textInputRef.current?.focus();
  }, [textInputRef.current]);

  // const textInputStyle = useMemo(
  //   () => [
  //     styles.textInput,
  //     {color: colors.text, borderColor: colors.placeholder},
  //   ],
  //   [colors.text, colors.placeholder],
  // );

  const autoFocus = useAutoFocus();

  // 테마가 적용된 컴포넌트 재사용, 일일히 테마를 적용할 필요가 없어짐
  return (
    <MyView surface style={[styles.view]}>
      <MyView accent style={[styles.topBar]}>
        <MyText style={[styles.textButton]} onPress={setFocus}>
          focus
        </MyText>
        <MyText style={[styles.textButton]} onPress={Keyboard.dismiss}>
          dismiss keyboard
        </MyText>
        <MyView style={{flex: 1}} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </MyView>
      <AutoFocusProvider contentContainerStyle={[styles.flex]}>
        <MyView style={[styles.flex]} />
        <MyView style={[styles.textView]}>
          <MyText style={[styles.text, {color: colors.text}]}>email</MyText>
          <MyTextInput
            style={[styles.textInput]}
            onFocus={autoFocus}
            value={person.email}
            placeholder="enter your email"
            onChangeText={email => setPerson(person => ({...person, email}))}
          />
        </MyView>
        <MyView style={[styles.textView]}>
          <MyText style={[styles.text, {color: colors.text}]}>name</MyText>
          <MyTextInput
            ref={textInputRef}
            style={[styles.textInput]}
            onFocus={autoFocus}
            value={person.name}
            placeholder="enter your name"
            onChangeText={name => setPerson(person => ({...person, name}))}
          />
        </MyView>
      </AutoFocusProvider>
    </MyView>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  textButton: {marginLeft: 10, fontSize: 20},
  keyboardAvoidingView: {flex: 1, padding: 10},
  textView: {padding: 5},
  text: {fontSize: 20},
  textInput: {fontSize: 24, borderWidth: 1, borderRadius: 5},
  flex: {flex: 1},
});

export default AutoFocus;
