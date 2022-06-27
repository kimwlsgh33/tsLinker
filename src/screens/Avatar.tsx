import React from 'react';
import type {FC, ComponentProps} from 'react';
import {Animated, Image, TouchableOpacity} from 'react-native';
import type {StyleProp, ImageStyle} from 'react-native';
import TouchableView from '../../test/3-5/components/TouchableView';
import type {TouchableViewProps} from '../../test/3-5/components/TouchableView';

export type AvatarProps = TouchableViewProps & {
  uri: string;
  size: number;
  imageStyle?: StyleProp<ImageStyle>;
};

export const Avatar: FC<AvatarProps> = ({
  uri,
  size = 0,
  imageStyle,
  ...props
}) => {
  return (
    <TouchableView {...props}>
      <Image
        source={{uri}}
        style={[
          imageStyle,
          {width: size, height: size, borderRadius: size / 2},
        ]}
      />
    </TouchableView>
  );
};
