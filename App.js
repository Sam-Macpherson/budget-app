import _ from 'lodash';
import React, {useRef, useState, useEffect} from 'react';
import ColorPalette from './ColorPalette';

import {FlatList, StyleSheet, Text, View} from 'react-native';

import IncomeHeader from './components/IncomeHeader';
import {
  CATEGORY_NEED,
  january_2022,
  january_2021,
  december_2021,
  october_2021,
  TYPE_EXPENSE,
} from './Constants';

import balanceSheet from './styles/balanceSheet.less';
import typography from './styles/typography.less';
import BalanceSheetDate from './components/BalanceSheetDate';
import Button from './components/Button';
import footerStyles from './styles/footer.less';
import Modal from 'react-native-modalbox';
import ExpenseModal from './components/ExpenseModal';
import storage from './storage/storage';
import {formatDateMonth} from './utils/dates';
import expensesReducer from './storage/reducers/expensesReducer';

const App = () => {
  const addExpenseModal = useRef(null);
  const [viewingMonth, setViewingMonth] = useState(new Date());
  const [sheetItems, setSheetItems] = useState({});

  useEffect(() => {
    storage.getObject(formatDateMonth(viewingMonth), expensesReducer).then(dataForMonth => {
      setSheetItems(dataForMonth);
    });
  }, [viewingMonth]);

  return (
    <View style={styles.container}>
      <IncomeHeader />
      <FlatList
        style={[balanceSheet.balanceSheet]}
        data={sheetItems}
        renderItem={({item}) => <BalanceSheetDate item={item} />}
      />
      <View style={footerStyles.footer}>
        <Button style={typography.largest} text={formatDateMonth(viewingMonth)} />
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
