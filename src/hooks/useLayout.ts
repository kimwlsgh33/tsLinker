import {useCallback, useState} from 'react';
import type {LayoutChangeEvent, LayoutRectangle} from 'react-native';

// 현재 레이아웃 가져오는 훅 만들기
export const useLayout = (): [
  LayoutRectangle,
  (e: LayoutChangeEvent) => void,
] => {
  const [layout, setLayout] = useState<LayoutRectangle>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  // 레이아웃 이벤트 들어오면, state에 저장
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const {layout} = e.nativeEvent;
    setLayout(layout);
  }, []);

  return [layout, onLayout];
};
