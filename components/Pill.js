import React from 'react';
import {Text, View} from 'react-native';
import styles from '../styles/pill.less';
import typography from '../styles/typography.less';
import ColorPalette from '../ColorPalette';

const TONES = {
  need: {bg: ColorPalette.NEED_TINT, fg: ColorPalette.NEED_TEXT},
  want: {bg: ColorPalette.WANT_TINT, fg: ColorPalette.WANT_TEXT},
  neutral: {bg: ColorPalette.NEUTRAL_TINT, fg: ColorPalette.TEXT},
};

const Pill = ({text, tone = 'neutral', style}) => (
  <View style={[styles.pill, {backgroundColor: TONES[tone].bg}, style]}>
    <Text style={[typography.amountSmall, {color: TONES[tone].fg}]} numberOfLines={1}>
      {text}
    </Text>
  </View>
);

export default Pill;
