import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
} from 'react';
import {Keyboard} from 'react-native';
import type {TextInput} from 'react-native';
import {MyTextInput} from '../theme/paper';
import type {TextInputProps} from '../theme/paper';

export type TextInputMethod = {
  focus: () => void;
  dismiss: () => void;
};

type ImperativeTextInputProps = TextInputProps;

const ImperativeTextInput: ForwardRefRenderFunction<
  TextInputMethod,
  ImperativeTextInputProps
> = (props, ref) => {
  const textInputRef = useRef<TextInput | null>(null);
  // ref을 전달받아, 메소드를 만들어준다. ( 다른 ref 호출 가능 )
  useImperativeHandle(
    ref,
    () => ({
      focus() {
        textInputRef.current?.focus();
      },
      dismiss() {
        Keyboard.dismiss();
      },
    }),
    [],
  );
  return <MyTextInput ref={textInputRef} {...props} />;
};

export default forwardRef(ImperativeTextInput);
