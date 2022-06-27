import React from 'react';
import type {FC, ComponentProps} from 'react';
import {GestureResponderEvent, TouchableOpacity, View} from 'react-native';
import type {StyleProp, ViewStyle} from 'react-native';

type TouchableOpacityProps = ComponentProps<typeof TouchableOpacity>;
// ComponentProps로, React Native의 컴포넌트 타입을 불러올 수 있다

export type TouchableViewProps =
  | TouchableOpacityProps & {
      viewStyle?: StyleProp<ViewStyle>;
    };
// 컴포넌트 타입 + 나의 커스텀 타입 만들기
// viewStyle = children의 스타일 가져올 수 있다.

const TouchableView: FC<TouchableViewProps> = ({
  children,
  viewStyle,
  ...props
}) => {
  return (
    <TouchableOpacity {...props}>
      <View style={[viewStyle]}>{children}</View>
    </TouchableOpacity>
  );
};

export default TouchableView;
