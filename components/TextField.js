import React, {forwardRef, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from '../styles/textField.less';
import typography from '../styles/typography.less';
import ColorPalette from '../ColorPalette';

const TextField = forwardRef(({label, prefix, style, inputStyle, ...inputProps}, ref) => {
  const [focused, setFocused] = useState(false);
  return (
    <View style={style}>
      <Text style={[typography.label, styles.fieldLabel]}>{label}</Text>
      <View style={[styles.field, focused && styles.fieldFocused]}>
        {prefix && <Text style={[typography.body, styles.fieldPrefix]}>{prefix}</Text>}
        <TextInput
          ref={ref}
          style={[styles.fieldInput, inputStyle]}
          placeholderTextColor={ColorPalette.TEXT_FAINT}
          selectionColor={ColorPalette.TEXT_MUTED}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...inputProps}
        />
      </View>
    </View>
  );
});

export default TextField;
