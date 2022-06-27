// Input으로 자동 Focus하는 컴포넌트
import React, {createContext, useCallback, useContext, useRef} from 'react'; // createContext 함수 불러오기
import type {ComponentProps, FC} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {findNodeHandle} from 'react-native';
import type {NativeSyntheticEvent, TextInputFocusEventData} from 'react-native';

export type FocusEvent = NativeSyntheticEvent<TextInputFocusEventData>;

// context type
export type AutoFocusContextType = {
  autoFocus: (event: FocusEvent) => void;
};

// context default value
const defaultFocusContext = {autoFocus: (event: FocusEvent) => {}};

// createContext
const AutoFocusContext =
  createContext<AutoFocusContextType>(defaultFocusContext);

//-----------------------------------------

type AutoFocusProviderProps = ComponentProps<typeof KeyboardAwareScrollView>;

// Provider에 값 저장하기 전에 한번거쳐서 가기 - 이름 간소화

export const AutoFocusProvider: FC<AutoFocusProviderProps> = ({
  children,
  ...props
}) => {
  const scrollRef = useRef<KeyboardAwareScrollView | null>(null);
  // ScrollView가 가지고 있는 Input으로 스크롤하기 기능 사용
  const scrollToInput = useCallback((reactNode: any) => {
    scrollRef.current?.scrollToFocusedInput(reactNode);
  }, []);
  const autoFocus = useCallback((event: FocusEvent) => {
    scrollToInput(findNodeHandle(event.target));
  }, []);
  const value = {
    autoFocus,
  };
  return (
    <AutoFocusContext.Provider value={value}>
      <KeyboardAwareScrollView
        {...props}
        style={{flex: 1, width: '100%'}}
        ref={scrollRef}>
        {children}
      </KeyboardAwareScrollView>
    </AutoFocusContext.Provider>
  );
};

// 콘텍스트를 사용하는 함수까지 생성
export const useAutoFocus = () => {
  const {autoFocus} = useContext(AutoFocusContext);
  return autoFocus;
};
