import React from 'react';
import {Pressable, Text} from 'react-native';
import styles from '../styles/button.less';
import ColorPalette from '../ColorPalette';
import Icon from './Icon';

const VARIANTS = {
  primary: {bg: ColorPalette.TEXT, pressed: ColorPalette.TEXT_MUTED, fg: ColorPalette.BG},
  secondary: {bg: ColorPalette.FIELD, pressed: ColorPalette.PRESSED, fg: ColorPalette.TEXT},
  ghost: {bg: 'transparent', pressed: ColorPalette.PRESSED, fg: ColorPalette.TEXT},
};

/**
 * Text and/or icon button. With an icon and no text it renders as a round icon button.
 */
const Button = ({text, icon, iconColor, trailingIcon, variant = 'secondary', onPress, style}) => {
  const v = VARIANTS[variant];
  const iconOnly = icon && !text;
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      style={({pressed}) => [
        styles.button,
        iconOnly && styles.iconButton,
        {backgroundColor: pressed ? v.pressed : v.bg},
        style,
      ]}>
      {icon && <Icon name={icon} color={iconColor || v.fg} />}
      {text && (
        <Text style={[styles.buttonText, icon && styles.buttonTextWithIcon, {color: v.fg}]}>
          {text}
        </Text>
      )}
      {trailingIcon && <Icon name={trailingIcon} size={18} color={ColorPalette.TEXT_MUTED} />}
    </Pressable>
  );
};

export default Button;
