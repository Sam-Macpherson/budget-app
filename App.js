import _ from "lodash";
import React, { useState } from 'react';
import ColorPalette from "./ColorPalette";

import {FlatList, StyleSheet, View} from 'react-native';

import IncomeHeader from "./components/IncomeHeader";
import { items } from "./Constants";

import balanceSheet from "./styles/balanceSheet.less";
import cardStyles from "./styles/card.less";
import BalanceSheetDate from "./components/BalanceSheetDate";
import Button from "./components/Button";
import footerStyles from "./styles/footer.less";
import moment from "moment";

const App = () => {
  const [viewingMonth, setViewingMonth] = useState(moment());

  // Bucket the data up by date, and sort it in descending order.
  const dates = _.sortBy(_.uniqBy(_.map(items, 'date'), d => d.getTime()), d => -d.getTime());

  let itemsByDate = _.map(dates, d => ({
    date: d,
    items: _.filter(items, i => i.date.getTime() === d.getTime())
  }));

  return (
    <View style={styles.container}>
      <IncomeHeader />
      <FlatList
        style={[cardStyles.card, balanceSheet.balanceSheet]}
        data={itemsByDate}
        renderItem={({ item }) => <BalanceSheetDate item={item} />}
      />
      <View style={footerStyles.footer}>
        <Button style={{ fontSize: 18 }} text={viewingMonth.format('MMM YY')} />
        <Button style={{ marginLeft: 4 }} image={require("./images/piggy-bank-outline.png")} />
        <Button style={{ marginLeft: 4 }} image={require("./images/receipt-outline.png")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: ColorPalette.DARKEST_GRAY,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
});

export default App;
