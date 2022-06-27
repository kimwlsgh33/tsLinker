import React, {useCallback, useMemo, useRef} from 'react'
import type {FC} from 'react'
import {
  Animated,
  Easing,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View
} from 'react-native'
import {Colors} from 'react-native-paper'
import {
  useAnimatedValue,
  useMonitorAnimatedValue,
  useStyle,
  useTransformStyle
} from '../hooks'
import TouchableView from './TouchableView'

export type ImageSliderType = {
  imageUrls: string[]
  imageWidth: number
  showThumbnails: boolean
}

const circleWidth = 10,
  circleMarginRight = 5,
  thumbnailSize = 30

export const ImageSlider: FC<ImageSliderType> = ({
  imageUrls,
  imageWidth,
  showThumbnails
}) => {
  const flatListRef = useRef<FlatList | null>(null)

  // Animated Value만들기 - Animated.Value 값은 보간값을
  const selectedIndexAnimValue = useAnimatedValue()
  const circleWidthAnimValue = useAnimatedValue(circleWidth)
  const circleMarginRightAnimValue = useAnimatedValue(circleMarginRight)

  // 보간값 불러오기
  const selectedIndex = useMonitorAnimatedValue(selectedIndexAnimValue)

  // 이미지 선택시, 해당 인덱스로 스크롤
  const selectImage = useCallback(
    (index: number) => () => {
      // selectedIndexAnimValue.setValue(index);
      flatListRef.current?.scrollToIndex({index})
    },
    []
  )

  // 스타일에 애니메이션 지정 ( 이동 )
  const translateX = useTransformStyle({
    translateX: Animated.multiply(
      Animated.add(circleWidthAnimValue, circleMarginRightAnimValue),
      selectedIndexAnimValue
    )
  })

  // 스크롤시 x좌표 / 이미지 가로길이로 현재 index 구하고, Animated.Value 설정
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (imageWidth == 0) {
        return
      }
      const {contentOffset} = e.nativeEvent
      // 이벤트에서 전해주는 x값은 보간값이다.
      const index = Math.round(contentOffset.x / imageWidth)
      selectedIndexAnimValue.setValue(index)
    },
    [imageWidth]
  )

  // 링크 개수만큼 원 만들기
  const circles = useMemo(
    () => imageUrls.map((uri, idx) => <View key={idx} style={styles.circle} />),
    []
  )

  // 링크 개수만큼 이미지 만들기
  const thumbnails = useMemo(
    () =>
      imageUrls.map((uri, idx) => (
        <TouchableView
          key={idx}
          style={[styles.thumbnail]}
          onPress={selectImage(idx)}>
          <Image
            source={{uri}}
            style={{width: thumbnailSize, height: thumbnailSize}}
          />
        </TouchableView>
      )),
    []
  )

  return (
    <>
      <FlatList
        ref={flatListRef}
        horizontal
        contentContainerStyle={{
          width: imageUrls.length * imageWidth
        }}
        data={imageUrls}
        renderItem={({item}) => (
          <Image
            source={{uri: item}}
            style={[styles.image, {width: imageWidth}]}
          />
        )}
        keyExtractor={(item, idx) => idx.toString()}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
      <View style={[styles.iconBar, {justifyContent: 'center'}]}>
        <View style={{flexDirection: 'row'}}>
          {circles}
          <Animated.View
            style={[styles.circle, styles.selectedCircle, translateX]}
          />
        </View>
      </View>
      {showThumbnails && (
        <View style={[styles.iconBar, {justifyContent: 'space-between'}]}>
          {thumbnails}
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  image: {height: 150, resizeMode: 'cover'},
  iconBar: {flexDirection: 'row', padding: 5},
  thumbnail: {borderWidth: 1, padding: 2},
  circle: {
    width: circleWidth,
    height: circleWidth,
    borderRadius: circleWidth / 2,
    marginRight: circleMarginRight,
    backgroundColor: Colors.pink100
  },
  selectedCircle: {position: 'absolute', backgroundColor: Colors.pink700}
})
