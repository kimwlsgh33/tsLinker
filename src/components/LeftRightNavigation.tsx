import React, {forwardRef, useImperativeHandle, useState} from 'react';
import type {
  ReactNode,
  ForwardRefRenderFunction,
  MutableRefObject,
} from 'react';
import {usePanResponder} from '../hooks';
import {Animated, FlatList, Platform, StyleSheet} from 'react-native';

export type LeftRightNavigationMethods = {
  resetOffset: () => void;
};

export type LeftRightNavigationProps = {
  distance: number;
  onLeftToRight?: () => void;
  onRightToLeft?: () => void;
  flatListRef?: MutableRefObject<FlatList | null>;
  children?: ReactNode;
};

/*
    Flatlist의 스크롤 기능과, Left Right이동 기능 수동 구현
 */
const _LeftRightNavigation: ForwardRefRenderFunction<
  LeftRightNavigationMethods,
  LeftRightNavigationProps
> = ({distance, children, onRightToLeft, onLeftToRight, flatListRef}, ref) => {
  // 스크롤의 현재 위치 상태 저장
  const [offset, setOffset] = useState<number>(0);

  /*
    부모 컴포넌트에 보여지는 인스턴스 값을 커스텀한다. (leftRef)
    인스턴스내부에 y위치(offset) 0으로 설정하는 함수 만들기
   */
  useImperativeHandle(
    ref,
    () => ({
      resetOffset() {
        setOffset(0);
      },
    }),
    [],
  );

  // 스크롤 동작이 감지 될때마다 함수 작동하기
  const panResponder = usePanResponder(
    {
      onPanResponderMove(e, s) {
        const {dx, dy} = s;

        // flatList가 존재할때, (이전 스크롤 위치[오프셋] - 수직이동거리)만큼 스크롤하기, 애니메이션 없음(보간값이므로)
        if (flatListRef) {
          flatListRef.current?.scrollToOffset({
            // 스크롤 현재 위치 - 이동 거리 ( 위로 드래그 ? offset증가 : offset감소 )
            offset: offset - dy,
            animated: false,
          });
          // 이동후 현재 스크롤 위치 저장
          setOffset(offset => offset - dy);
        }
        // 수직 방향 스크롤 절댓값이 40미만 일때, 좌우 화면 전환 기능 사용하기
        if (Math.abs(dy) < 40) {
          // distance : 일정 거리이상 스크롤시 좌우 화면 전환
          if (dx > distance) {
            onLeftToRight && onLeftToRight();
          } else if (dx < -distance) {
            onRightToLeft && onRightToLeft();
          }
        }
      },
    },
    [offset],
  );
  return (
    <Animated.View style={[styles.view]} {...panResponder.panHandlers}>
      {children}
    </Animated.View>
  );
};

// 부모 ref 가져오기
export const LeftRightNavigation = forwardRef(_LeftRightNavigation);

const styles = StyleSheet.create({
  view: {
    width: '100%',
    flex: 1,
    backgroundColor: Platform.select({ios: undefined, android: 'transparent'}),
  },
});
