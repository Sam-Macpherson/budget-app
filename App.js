import React, { useState } from 'react';
import ColorPalette from "./ColorPalette";

import { FlatList, StyleSheet, View } from 'react-native';

import { FloatingAction } from "react-native-floating-action";
import IncomeHeader from "./components/IncomeHeader";
import BalanceSheetItem from "./components/BalanceSheetItem";
import { items } from "./Constants";

import balanceSheet from "./styles/balanceSheet.less";
import cardStyles from "./styles/card.less";


const actions = [
  {
    text: "Expense",
    name: "bt_expense",
    color: ColorPalette.ORANGE,
    icon: require('./images/receipt-outline.png'),
    position: 2,
  },
  {
    text: "Income",
    name: "bt_income",
    color: ColorPalette.ORANGE,
    icon: require("./images/piggy-bank-outline.png"),
    position: 1,
  }
];

const App = () => {
  const [addingItem, setAddingItem] = useState(false);

  const renderItem = ({ item }) => (
      <BalanceSheetItem {...item} />
  );

  return (
    <View style={styles.container}>
      <IncomeHeader />
      <FlatList
        style={[cardStyles.card, balanceSheet.balanceSheet]}
        data={items}
        renderItem={renderItem}
      />
      <FloatingAction
        actions={actions}
        color={addingItem ? ColorPalette.WHITE : ColorPalette.ORANGE}
        iconColor={addingItem ? ColorPalette.DARKEST_GRAY : ColorPalette.WHITE}
        onClose={() => setAddingItem(false)}
        onOpen={() => setAddingItem(true)}
        onPressItem={name => {
          console.log("Selected button", name);
        }}
      />
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
