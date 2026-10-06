import React from 'react';
import {Text, View} from 'react-native';
import typography from '../theme/typography';

const TONES = {
  need: {bg: 'bg-need-tint', fg: 'text-need-text'},
  want: {bg: 'bg-want-tint', fg: 'text-want-text'},
  neutral: {bg: 'bg-neutral-tint', fg: 'text-ink'},
};

const Pill = ({text, tone = 'neutral', className = ''}) => (
  <View
    className={`items-center justify-center px-2.5 py-[3px] rounded-full ${TONES[tone].bg} ${className}`}>
    <Text className={`${typography.amountSmall} ${TONES[tone].fg}`} numberOfLines={1}>
      {text}
    </Text>
  </View>
);

export default Pill;
