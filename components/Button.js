import React from 'react';
import {Pressable, Text} from 'react-native';
import {useTheme} from '../theme/ThemeProvider';
import Icon from './Icon';

const VARIANTS = {
  primary: {container: 'bg-ink active:bg-muted', text: 'text-canvas', icon: 'BG'},
  secondary: {container: 'bg-field active:bg-pressed', text: 'text-ink', icon: 'TEXT'},
  ghost: {container: 'active:bg-pressed', text: 'text-ink', icon: 'TEXT'},
};

/**
 * Text and/or icon button. With an icon and no text it renders as a round icon button, which needs
 * an accessibilityLabel.
 */
const Button = ({
  text,
  icon,
  iconColor,
  trailingIcon,
  variant = 'secondary',
  onPress,
  accessibilityLabel,
  className = '',
}) => {
  const {colors} = useTheme();
  const v = VARIANTS[variant];
  const shape = icon && !text ? 'w-11 rounded-full' : 'px-4 rounded-xl';
  return (
    <Pressable
      onPress={onPress}
      hitSlop={6}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      className={`h-11 flex-row items-center justify-center ${shape} ${v.container} ${className}`}>
      {icon && <Icon name={icon} color={iconColor || colors[v.icon]} />}
      {text && (
        <Text className={`text-body font-semibold ${v.text} ${icon ? 'ml-2 mr-1' : ''}`}>
          {text}
        </Text>
      )}
      {trailingIcon && <Icon name={trailingIcon} size={18} color={colors.TEXT_MUTED} />}
    </Pressable>
  );
};

export default Button;
