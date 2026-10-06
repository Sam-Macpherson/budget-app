import React, {forwardRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';

const TextField = forwardRef(
  ({label, prefix, className, inputClassName = '', ...inputProps}, ref) => {
    const {colors} = useTheme();
    const [focused, setFocused] = useState(false);
    return (
      <View className={className}>
        <Text className={`${typography.label} mb-1.5`}>{label}</Text>
        <View
          className={`flex-row items-center h-11 px-3 rounded-[10px] border-[1.5px] bg-field ${
            focused ? 'border-muted' : 'border-field'
          }`}>
          {prefix && <Text className="text-body text-muted mr-1">{prefix}</Text>}
          <TextInput
            ref={ref}
            className={`flex-1 p-0 text-input text-ink ${inputClassName}`}
            placeholderTextColor={colors.TEXT_FAINT}
            selectionColor={colors.TEXT_MUTED}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...inputProps}
          />
        </View>
      </View>
    );
  },
);

export default TextField;
