import React, {forwardRef} from 'react';
import type {ComponentProps, ForwardRefRenderFunction} from 'react';
import {TextInput} from 'react-native';
// import type {StyleProp, TextStyle} from 'react-native';
import {useTheme} from 'react-native-paper';
export type TextInputProps = ComponentProps<typeof TextInput>;
// & {
// TextInput의 props 타입 지정 : FC 기본지원
//   style?: StyleProp<TextStyle>;
// };

// 원래 TextInput에 주어지는 props 정보들 전해주기
const _TextInput: ForwardRefRenderFunction<TextInput, TextInputProps> = (
  {style, ...props},
  ref,
) => {
  const {colors} = useTheme();
  return (
    <TextInput
      ref={ref}
      style={[{color: colors.text, borderColor: colors.placeholder}, style]}
      {...props}
    />
  );
};

export const MyTextInput = forwardRef(_TextInput);
/*
  forwardRef을 사용해서, MyTextInput 컴포넌트에 전해지는 ref을 _TextInput 컴포넌트의 props로 전달해준다.
*/
