import _ from 'lodash';
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import ColorPalette from './ColorPalette';

import {FlatList, StyleSheet, View} from 'react-native';

import IncomeHeader from './components/IncomeHeader';
import {TYPE_EXPENSE, TYPE_INCOME} from './Constants';

import balanceSheet from './styles/balanceSheet.less';
import typography from './styles/typography.less';
import BalanceSheetDate from './components/BalanceSheetDate';
import Button from './components/Button';
import footerStyles from './styles/footer.less';
import Modal from 'react-native-modalbox';
import ExpenseModal from './components/ExpenseModal';
import si from './storage/storage';
import {formatDateMonth} from './utils/dates';
import MonthPicker from 'react-native-month-year-picker';
import IncomeModal from './components/IncomeModal';

const App = () => {
  const [editingEntry, setEditingEntry] = useState(null);
  const addExpenseModal = useRef(null);
  const addIncomeModal = useRef(null);
  const [viewingMonth, setViewingMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const showPicker = useCallback(value => setShowDatePicker(value), []);

  const [sheetItems, setSheetItems] = useState({});
  // Flat list of all items for the header.
  const allItems = useMemo(() => _.flatten(_.map(sheetItems, 'items')), [sheetItems]);

  useEffect(() => {
    si.getEntriesForMonth(viewingMonth).then(entries => {
      setSheetItems(entries);
    });
  }, [viewingMonth]);

  const resetViewingMonth = useCallback(
    () => setViewingMonth(new Date(viewingMonth)),
    [viewingMonth],
  );

  const submitEntry = useCallback(
    data => {
      if (_.isNull(editingEntry)) {
        si.addEntry({date: new Date(), ...data}).then(() =>
          // Setting the viewing month (despite no-op) forces a rerender & fetch.
          resetViewingMonth(),
        );
      } else {
        si.editEntry({date: editingEntry.date, ...data}).then(() => resetViewingMonth());
      }
    },
    [resetViewingMonth, editingEntry],
  );

  const onDateChanged = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || viewingMonth;

      showPicker(false);
      setViewingMonth(selectedDate);
    },
    [showPicker, viewingMonth],
  );

  return (
    <View style={styles.container}>
      <IncomeHeader items={allItems} />
      <FlatList
        style={[balanceSheet.balanceSheet]}
        data={sheetItems}
        renderItem={({item}) =>
          !_.isEmpty(item.items) ? (
            <BalanceSheetDate
              onPressItem={i => {
                setEditingEntry(i);
                if (i.type === TYPE_INCOME) {
                  addIncomeModal.current?.open();
                } else {
                  addExpenseModal.current?.open();
                }
              }}
              item={item}
            />
          ) : null
        }
      />
      <View style={footerStyles.footer}>
        <Button
          style={typography.largest}
          text={formatDateMonth(viewingMonth)}
          onPress={() => showPicker(true)}
        />
        <View style={footerStyles.buttons}>
          <Button
            onPress={() => addIncomeModal.current?.open()}
            style={{marginLeft: 4}}
            image={require('./images/piggy-bank-outline.png')}
          />
          <Button
            onPress={() => addExpenseModal.current?.open()}
            style={{marginLeft: 4}}
            image={require('./images/receipt-outline.png')}
          />
        </View>
      </View>
      {showDatePicker && (
        <MonthPicker
          onChange={onDateChanged}
          value={viewingMonth}
          minimumDate={new Date(1998, 4)}
          maximumDate={new Date()}
          mode="short"
        />
      )}
      <Modal
        ref={addExpenseModal}
        style={{height: 150, borderRadius: 8, backgroundColor: ColorPalette.DARK_GRAY}}
        position={'bottom'}
        onClosed={_.partial(setEditingEntry, null)}>
        <ExpenseModal
          entry={editingEntry}
          deleteEntry={async entry => {
            await si.removeEntry(entry);
            resetViewingMonth();
            setEditingEntry(null);
            addExpenseModal.current?.close();
          }}
          onSubmit={data => {
            submitEntry({type: TYPE_EXPENSE, ...data});
            setEditingEntry(null);
            addExpenseModal.current?.close();
          }}
        />
      </Modal>
      <Modal
        ref={addIncomeModal}
        style={{height: 110, borderRadius: 8, backgroundColor: ColorPalette.DARK_GRAY}}
        position={'bottom'}
        onClosed={_.partial(setEditingEntry, null)}>
        <IncomeModal
          entry={editingEntry}
          deleteEntry={async entry => {
            await si.removeEntry(entry);
            resetViewingMonth();
            setEditingEntry(null);
            addIncomeModal.current?.close();
          }}
          onSubmit={data => {
            submitEntry({type: TYPE_INCOME, ...data});
            setEditingEntry(null);
            addIncomeModal.current?.close();
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
