import React, {useCallback, useRef, useState} from 'react';
import type {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Switch, useTheme} from 'react-native-paper';
import * as D from '../data';
import {AutoFocusProvider, useAutoFocus, useToggleTheme} from '../context';
import {MyText as Text, MyView as View} from '../theme/paper';
import ImperativeTextInput, {TextInputMethod} from './ImperativeTextInput';

const Imperative: FC = () => {
  const [person, setPerson] = useState<D.IPerson>(D.createRandomPerson());
  const {dark} = useTheme();
  const toggleTheme = useToggleTheme();
  const autoFocus = useAutoFocus();
  // const methodsRef = useRef<TextInput | null>(null);
  const methodsRef = useRef<TextInputMethod | null>(null);

  const setFocus = useCallback(() => methodsRef.current?.focus(), []);
  const dismissKeyboard = useCallback(() => methodsRef.current?.dismiss(), []);

  return (
    <View style={[styles.view]}>
      <View accent style={[styles.topBar]}>
        <Text onPress={setFocus} style={[styles.textButton]}>
          focus
        </Text>
        <Text onPress={dismissKeyboard} style={[styles.textButton]}>
          dismiss
        </Text>
        <View style={styles.flex} />
        <Switch value={dark} onValueChange={toggleTheme} />
      </View>
      <AutoFocusProvider contentContainerStyle={styles.flex}>
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>email</Text>
          <ImperativeTextInput
            style={[styles.textInput]}
            onFocus={autoFocus}
            value={person.email}
            placeholder="enter your email"
            onChangeText={email => setPerson(person => ({...person, email}))}
          />
        </View>
        <View style={[styles.textView]}>
          <Text style={[styles.text]}>name</Text>
          <ImperativeTextInput
            ref={methodsRef}
            style={[styles.textInput]}
            onFocus={autoFocus}
            value={person.name}
            placeholder="enter your name"
            onChangeText={name => setPerson(person => ({...person, name}))}
          />
        </View>
      </AutoFocusProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {flex: 1},
  topBar: {flexDirection: 'row', padding: 5},
  textButton: {marginLeft: 10, fontSize: 20},
  textView: {padding: 5},
  text: {fontSize: 24},
  textInput: {fontSize: 24, borderWidth: 1, borderRadius: 5},
  flex: {flex: 1},
});

export default Imperative;
