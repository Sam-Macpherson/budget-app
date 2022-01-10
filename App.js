import _ from 'lodash';
import React, {useRef, useState} from 'react';
import ColorPalette from './ColorPalette';

import {FlatList, StyleSheet, Text, View} from 'react-native';

import IncomeHeader from './components/IncomeHeader';
import {items, TYPE_EXPENSE} from './Constants';

import balanceSheet from './styles/balanceSheet.less';
import typography from './styles/typography.less';
import cardStyles from './styles/card.less';
import BalanceSheetDate from './components/BalanceSheetDate';
import Button from './components/Button';
import footerStyles from './styles/footer.less';
import moment from 'moment';
import Modal from 'react-native-modalbox';
import ExpenseModal from './components/ExpenseModal';

const App = () => {
  const addExpenseModal = useRef(null);
  const [viewingMonth, setViewingMonth] = useState(moment());
  const [sheetItems, setSheetItems] = useState(items);

  // Bucket the data up by date, and sort it in descending order.
  const dates = _.sortBy(
    _.uniqBy(_.map(sheetItems, 'date'), d => d.getTime()),
    d => -d.getTime(),
  );

  let itemsByDate = _.map(dates, d => ({
    date: d,
    items: _.filter(sheetItems, i => i.date.getDate() === d.getDate()),
  }));

  return (
    <View style={styles.container}>
      <IncomeHeader />
      <FlatList
        style={[cardStyles.card, balanceSheet.balanceSheet]}
        data={itemsByDate}
        renderItem={({item}) => <BalanceSheetDate item={item} />}
      />
      <View style={footerStyles.footer}>
        <Button style={typography.largest} text={viewingMonth.format('MMM YY')} />
        <Button style={{marginLeft: 4}} image={require('./images/piggy-bank-outline.png')} />
        <Button
          onPress={() => addExpenseModal.current?.open()}
          style={{marginLeft: 4}}
          image={require('./images/receipt-outline.png')}
        />
      </View>
      <Modal
        ref={addExpenseModal}
        style={{height: 150, borderRadius: 8, backgroundColor: ColorPalette.DARK_GRAY}}
        position={'bottom'}>
        <ExpenseModal
          onSubmit={data => {
            setSheetItems([
              ...sheetItems,
              {
                date: new Date(),
                type: TYPE_EXPENSE,
                ...data,
              },
            ]);
            addExpenseModal.current?.close();
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: ColorPalette.DARKEST_GRAY,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default App;
