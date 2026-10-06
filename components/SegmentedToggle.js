import React from 'react';
import {Pressable, Text, View} from 'react-native';

const TONES = {
  need: {bg: 'bg-need-tint', fg: 'text-need-text'},
  want: {bg: 'bg-want-tint', fg: 'text-want-text'},
  income: {bg: 'bg-neutral-tint', fg: 'text-need-text'},
  neutral: {bg: 'bg-raised', fg: 'text-ink'},
};

const SegmentedToggle = ({options, value, onChange, className = ''}) => (
  <View className={`flex-row h-10 p-[3px] rounded-xl bg-field ${className}`}>
    {options.map(option => {
      const selected = option.value === value;
      return (
        <Pressable
          key={option.value}
          onPress={() => onChange(option.value)}
          className={`flex-1 items-center justify-center rounded-[9px] ${
            selected ? TONES[option.tone].bg : ''
          }`}>
          <Text
            className={`text-body font-semibold ${
              selected ? TONES[option.tone].fg : 'text-muted'
            }`}>
            {option.label}
          </Text>
        </Pressable>
      );
    })}
  </View>
);

export default SegmentedToggle;
