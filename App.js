import React, { useState } from 'react';
import _ from "lodash";

import ColorPalette from "./ColorPalette";

import {
  FlatList,
  StyleSheet, Text,
  View,
  Dimensions,
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";


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
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

// Some sample items for now.
const items = [
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
  {
    text: "Item 1",
  },
  {
    text: "Item 2",
  },
  {
    text: "Item 3",
  },
  {
    text: "Item 4",
  },
  {
    text: "Item 5",
  },
  {
    text: "Item 6",
  },
  {
    text: "Item 7",
  },
  {
    text: "Item 8",
  },
];

const totalIncome = 7465;
const totalExpenses = 1345;


const CategoryCard = ({ title, text, style }) => {
  return (
    <View style={{...styles.card, ...style }}>
      <Text style={{ textAlign: "center", fontSize: 10, fontStyle: "italic", color: ColorPalette.LIGHTEST_GRAY}}>{title}</Text>
      <Text style={{ textAlign: "center", fontSize: 18, fontWeight: "bold", color: ColorPalette.DARKEST_GRAY}}>{text}</Text>
      <Text style={{ textAlign: "center", fontSize: 8, fontStyle: "italic", color: ColorPalette.LIGHTEST_GRAY}}>{text}</Text>
    </View>
  );
};

const IncomeHeader = () => {

  return (
    <View style={styles.header}>
      <CategoryCard title="income" text={totalIncome}/>
      <CategoryCard title="need" text={roundToTwoDecimals(totalIncome * 0.5)} />
      <CategoryCard title="want" text={roundToTwoDecimals(totalIncome * 0.3)} />
      <CategoryCard title="save" text={roundToTwoDecimals(totalIncome * 0.2)} />
    </View>
  );
};
const RemainingHeader = () => {

  return (
    <View style={styles.header}>
      <CategoryCard title="Remaining" text={(totalIncome - totalExpenses)}/>
      <CategoryCard title={50} text={roundToTwoDecimals((totalIncome - totalExpenses) * 0.5)} />
      <CategoryCard title={30} text={roundToTwoDecimals((totalIncome - totalExpenses) * 0.3)} />
    </View>
  );
};

const roundToTwoDecimals = (num) => {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
};

const App = () => {
  const [addingItem, setAddingItem] = useState(false);

  const renderItem = ({ item }) => (
      <CategoryCard title={item.text} text={item.text} />
  );

  return (
    <View style={styles.container}>
      <IncomeHeader />
      <FlatList
        style={styles.expenseList}
        data={items}
        renderItem={renderItem}
      />
      <FloatingAction
        actions={actions}
        color={addingItem ? ColorPalette.WHITE : ColorPalette.ORANGE}
        iconColor={addingItem ? ColorPalette.DARK_GRAY : ColorPalette.WHITE}
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
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: ColorPalette.DARK_GRAY,
  },
  expenseList: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 16,
    borderRadius: 8,
    backgroundColor: ColorPalette.DARK_GRAY,
  },
  card: {
    // width: (screenWidth / 5),
    padding: 16,
    borderRadius: 8,
    backgroundColor: ColorPalette.GRAY,
    margin: 0,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: ColorPalette.DARKEST_GRAY,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  list: {
    flex: 1,
    width: "100%",
  },
});

export default App;
