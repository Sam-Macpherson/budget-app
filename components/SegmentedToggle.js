import React from 'react';
import {Pressable, Text, View} from 'react-native';
import styles from '../styles/segmentedToggle.less';
import ColorPalette from '../ColorPalette';

const TONES = {
  need: {bg: ColorPalette.NEED_TINT, fg: ColorPalette.NEED_TEXT},
  want: {bg: ColorPalette.WANT_TINT, fg: ColorPalette.WANT_TEXT},
};

const SegmentedToggle = ({options, value, onChange, style}) => (
  <View style={[styles.toggle, style]}>
    {options.map(option => {
      const selected = option.value === value;
      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          style={[styles.segment, selected && {backgroundColor: TONES[option.tone].bg}]}>
          <Text
            style={[
              styles.segmentText,
              {color: selected ? TONES[option.tone].fg : ColorPalette.TEXT_MUTED},
            ]}>
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export default SegmentedToggle;
