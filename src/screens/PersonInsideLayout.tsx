import React, {useCallback} from 'react';
import type {FC} from 'react';
import {Animated, View, Text, Easing} from 'react-native';
import * as D from '../data';
import {styles} from './Person.style';
import {Avatar} from './Avatar';
import FontawesomeIcon from 'react-native-vector-icons/FontAwesome5';
import {MyView, MyText} from '../theme/paper';
import {
  useAnimatedValue,
  useLayout,
  useToggle,
  useTransformStyle,
} from '../hooks';
import {interpolate} from '../utils';

export type PersonProps = {
  person: D.IPerson;
  deletePressed: () => void;
};

const iconSize = 50;
const AnimatedIcon = Animated.createAnimatedComponent(FontawesomeIcon);

const PersonTransform: FC<PersonProps> = ({person, deletePressed}) => {
  const [layout, setLayout] = useLayout();

  const [started, toggleStarted] = useToggle(false);
  const animValue = useAnimatedValue();
  const avatarPressed = useCallback(() => {
    Animated.timing(animValue, {
      toValue: started ? 0 : 1,
      useNativeDriver: false,
      duration: 1000,
      easing: Easing.bounce,
    }).start(toggleStarted);
  }, [started]);

  const iconAnimStyle = useTransformStyle(
    {
      translateX: interpolate(animValue, [0, layout.width - iconSize]),
      rotate: interpolate(animValue, ['0deg', '720deg']),
    },
    [layout.width],
  );

  return (
    <MyView>
      <MyText style={[{fontSize: 20}]}>
        started : {started ? 'true' : 'false'}
      </MyText>
      <View style={[styles.view]}>
        <View style={[styles.leftView]}>
          <Avatar
            uri={person.avatar}
            size={50}
            imageStyle={[styles.avatar]}
            onPress={avatarPressed}
          />
          <Text style={[styles.text]}>Press Me</Text>
        </View>
        <View style={[styles.rightView]}>
          <Text style={[styles.name]}>{person.name}</Text>
          <Text style={[styles.email]}>{person.email}</Text>
          <View
            onLayout={setLayout}
            style={[{flexDirection: 'row', padding: 5}]}>
            <AnimatedIcon
              name="futbol"
              size={iconSize}
              style={[iconAnimStyle]}
            />
          </View>
        </View>
      </View>
    </MyView>
  );
};

export default PersonTransform;
