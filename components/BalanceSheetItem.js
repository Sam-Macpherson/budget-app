import React from "react";
import { CATEGORY_NEED, TYPE_INCOME } from "../Constants";
import { Image, Text, View } from "react-native";
import Badge from "./Badge";

import badge from "../styles/badge.less";
import cardStyles from "../styles/card.less";
import balanceSheet from "../styles/balanceSheet.less"

const BalanceSheetItem = ({ type, category, amount, expenseName }) => {
  const badgeStyle = category === CATEGORY_NEED ?
    badge['badge.white-on-red'] :
    badge['badge.white-on-orange'];

  return (
    <View style={[cardStyles.card, balanceSheet.balanceSheetItemContainer]}>
      <View style={{ height: "100%", flexDirection: "row", alignItems: "center" }}>
        <Image
          style={balanceSheet.balanceSheetItemIcon}
          source={type === TYPE_INCOME ? require("../images/piggy-bank-outline.png") : require("../images/receipt-outline.png")}
        />
        <Text>{expenseName}</Text>
      </View>
      <View>
        <Text style={{ textAlign: "right" }}>{amount}</Text>
        {type !== TYPE_INCOME && <Badge
          textStyle={{fontSize: 8}}
          style={badgeStyle}
          text={category === CATEGORY_NEED ? "need" : "want"}
        />}
      </View>
    </View>
  );
};


export default BalanceSheetItem;
