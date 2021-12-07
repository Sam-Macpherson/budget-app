import roundToTwoDecimals from "../utils/roundToTwoDecimals";
import _ from "lodash";
import { CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE } from "../Constants";
import { Text, View } from "react-native";
import cardStyles from "../styles/card.less";
import balanceSheet from "../styles/balanceSheet.less";
import Badge from "./Badge";
import badge from "../styles/badge.less";
import BalanceSheetItem from "./BalanceSheetItem";
import React from "react";


const BalanceSheetDate = ({ item }) => {
  const want = roundToTwoDecimals(_.sum(_.map(_.filter(item.items, {
    type: TYPE_EXPENSE, category: CATEGORY_WANT
  }), 'amount')));
  const need = roundToTwoDecimals(_.sum(_.map(_.filter(item.items, {
    type: TYPE_EXPENSE, category: CATEGORY_NEED
  }), 'amount')));

  return (
    <View style={[cardStyles.card, balanceSheet.balanceSheetDate]}>
      <View style={balanceSheet['balanceSheetDate.header']}>
        <Text style={{fontSize: 12}}>{item.date.toDateString()}</Text>
        <View style={balanceSheet['balanceSheetDate.header.totals']}>
          <Badge
            textStyle={{ fontSize: 8 }}
            style={badge['badge.white-on-blue']}
            text={need}
          />
          <Badge
            textStyle={{ fontSize: 8 }}
            style={badge['badge.white-on-orange']}
            text={want}
          />
        </View>
      </View>
      {_.map(item.items, i => <BalanceSheetItem key={`${i.date}_${i.expenseName}`} {...i} />)}
    </View>
  );
};

export default BalanceSheetDate;
