import React, {useMemo} from 'react';
import type {FC} from 'react';
import {Text, View} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Avatar} from '../../test/3-5/components';
import {useLayout, useToggle} from '../hooks';
import {ImageSlider} from '../components';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const PersonCarousel: FC<PersonProps> = ({person, deletePressed}) => {
  // 1 ~ 7 랜덤한 갯수의 이미지 생성
  const imageUrls = useMemo(
    () => D.makeArray(D.random(2, 6 + 1)).map(D.randomImage),
    [],
  );
  const [layout, setLayout] = useLayout();
  const [showThumbnails, toggleShowThumbnails] = useToggle();

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar uri={person.avatar} size={50} imageStyle={styles.avatar} />
      </View>
      <View style={[styles.rightView]} onLayout={setLayout}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            },
          ]}>
          <Text style={[styles.text]}>
            imageUrls.length: {imageUrls.length}
          </Text>

          <Text style={[styles.email]} onPress={toggleShowThumbnails}>
            show thumbnails
          </Text>
        </View>
        <ImageSlider
          imageUrls={imageUrls}
          imageWidth={layout.width - 10}
          showThumbnails={showThumbnails}
        />
      </View>
    </View>
  );
};

export default PersonCarousel;
