import React from "react";
import {Image, Text, Pressable, View} from "react-native";
import styles from "../styles/button.less";

const Button = ({ image, text, ...props}) => {
  return (
    <Pressable onPress={() => console.log(`pressed ${text}`)}>
      <View style={[styles.button, props.style]}>
        {image && <Image source={image} />}
        {text && <Text style={props.style}>{text}</Text>}
      </View>
    </Pressable>
  );
}

export default Button;
