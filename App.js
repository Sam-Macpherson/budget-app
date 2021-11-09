/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import type {Node} from 'react';
import _ from "lodash";
import {
  ScrollView,
  StyleSheet, Text,
  View,
} from 'react-native';

import { FloatingAction } from "react-native-floating-action";


const ORANGE = "#f89b16";
const WHITE = "#ffffff";
const GRAY = "#a9a9a9";
const DARK_GRAY = "#444444";

const actions = [
  {
    text: "Expense",
    name: "bt_expense",
    color: ORANGE,
    icon: require('./images/receipt-outline.png'),
    position: 2,
  },
  {
    text: "Income",
    name: "bt_income",
    color: ORANGE,
    icon: require("./images/piggy-bank-outline.png"),
    position: 1,
  }
];

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

const App: () => Node = () => {
  const [addingItem, setAddingItem] = useState(false);

  return (
    <View style={styles.container}>
      <FloatingAction
        actions={actions}
        color={addingItem ? WHITE : ORANGE}
        iconColor={addingItem ? DARK_GRAY : WHITE}
        onClose={() => setAddingItem(false)}
        onOpen={() => setAddingItem(true)}
        onPressItem={name => {
          console.log("Selected button", name);
        }}
      />
      <ScrollView>
        {_.map(items, item => <Text>{item.text}</Text>)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: {DARK_GRAY},
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
});

export default App;
