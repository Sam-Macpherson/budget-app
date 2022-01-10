import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../styles/badge.less';
import typography from '../styles/typography.less';
import ColorPalette from '../ColorPalette';

const Badge = props => {
  return (
    <Pressable onPress={props.onPress}>
      <View style={[styles.badge, props.style]}>
        <Text
          style={[
            typography.overline,
            {color: props.style.color || ColorPalette.WHITE},
            props.textStyle,
          ]}>
          {props.text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Badge;
