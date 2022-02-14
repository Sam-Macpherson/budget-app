import React from 'react';
import {Image, Text, Pressable, View} from 'react-native';
import styles from '../styles/button.less';
import ColorPalette from '../ColorPalette';

const Button = ({image, text, ...props}) => {
  return (
    <Pressable
      onPress={props.onPress}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? ColorPalette.GRAY : ColorPalette.LIGHT_GRAY,
        },
        styles.button,
        props.style,
      ]}>
      <View>
        {image && <Image source={image} />}
        {text && <Text style={props.style}>{text}</Text>}
      </View>
    </Pressable>
  );
};

export default Button;
