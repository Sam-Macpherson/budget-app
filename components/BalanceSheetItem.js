import React from "react";
import { CATEGORY_NEED, CATEGORY_WANT, TYPE_INCOME } from "../Constants";
import { Image, Text, View } from "react-native";
import Badge from "./Badge";

import badge from "../styles/badge.less";
import cardStyles from "../styles/card.less";
import balanceSheet from "../styles/balanceSheet.less"

const BalanceSheetItem = ({ type, category, amount, expenseName }) => {
  let badgeStyle;
  if (category === CATEGORY_NEED) {
    badgeStyle = badge['badge.white-on-blue'];
  }
  if (category === CATEGORY_WANT) {
    badgeStyle = badge['badge.white-on-orange'];
  }
  if (type === TYPE_INCOME) {
    badgeStyle = badge['badge.transparent'];
  }

  return (
    <View style={[cardStyles.card, balanceSheet.balanceSheetItemContainer]}>
      <View style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
        <Image
          style={balanceSheet.balanceSheetItemIcon}
          source={type === TYPE_INCOME ? require("../images/piggy-bank-outline.png") : require("../images/receipt-outline.png")}
        />
        <Text>{expenseName}</Text>
      </View>
      <View style={balanceSheet.balanceSheetValue}>
        <Badge
          textStyle={{ fontSize: 12 }}
          style={badgeStyle}
          text={amount}
        />
      </View>
    </View>
  );
};


export default BalanceSheetItem;
