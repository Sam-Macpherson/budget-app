import React from "react";
import {Text, View} from "react-native";
import styles from "../styles/badge.less";
import typography from "../styles/typography.less";
import ColorPalette from "../ColorPalette";

const Badge = props => {
  return (
    <View style={[styles.badge, typography.overline, props.style]}>
      <Text style={
        [typography.overline, { color: props.style.color || ColorPalette.WHITE }, props.textStyle]
      }>
        {props.text}
      </Text>
    </View>
  )
};

export default Badge;
