import _ from 'lodash';
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';
import ColorPalette from './ColorPalette';

import {FlatList, StyleSheet, View} from 'react-native';

import IncomeHeader from './components/IncomeHeader';
import {TYPE_EXPENSE, TYPE_INCOME} from './Constants';

import balanceSheet from './styles/balanceSheet.less';
import BalanceSheetDate from './components/BalanceSheetDate';
import Button from './components/Button';
import footerStyles from './styles/footer.less';
import Modal from 'react-native-modalbox';
import ExpenseModal from './components/ExpenseModal';
import si from './storage/storage';
import {formatDateMonth} from './utils/dates';
import IncomeModal from './components/IncomeModal';
import BackupModal from './components/BackupModal';
import MonthPickerModal from './components/MonthPickerModal';

const App = () => {
  const [editingEntry, setEditingEntry] = useState(null);
  const addExpenseModal = useRef(null);
  const addIncomeModal = useRef(null);
  const backupModal = useRef(null);
  const [viewingMonth, setViewingMonth] = useState(new Date());
  const monthPickerModal = useRef(null);

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
          icon="calendar"
          trailingIcon="chevronDown"
          text={formatDateMonth(viewingMonth)}
          onPress={() => monthPickerModal.current?.open()}
        />
        <View style={footerStyles.buttons}>
          <Button variant="ghost" icon="more" onPress={() => backupModal.current?.open()} />
          <Button
            style={footerStyles.buttonGap}
            icon="coin"
            iconColor={ColorPalette.NEED_TEXT}
            onPress={() => addIncomeModal.current?.open()}
          />
          <Button
            style={footerStyles.buttonGap}
            variant="primary"
            icon="receipt"
            onPress={() => addExpenseModal.current?.open()}
          />
        </View>
      </View>
      <Modal
        ref={addExpenseModal}
        style={[styles.sheet, styles.expenseSheet]}
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
        style={[styles.sheet, styles.incomeSheet]}
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
      <Modal ref={backupModal} style={[styles.sheet, styles.backupSheet]} position={'bottom'}>
        <BackupModal onImported={resetViewingMonth} />
      </Modal>
      <Modal ref={monthPickerModal} style={[styles.sheet, styles.monthSheet]} position={'bottom'}>
        <MonthPickerModal
          value={viewingMonth}
          onSelect={date => {
            setViewingMonth(date);
            monthPickerModal.current?.close();
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: ColorPalette.BG,
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  sheet: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: ColorPalette.SURFACE_RAISED,
  },
  expenseSheet: {height: 280},
  incomeSheet: {height: 224},
  backupSheet: {height: 172},
  monthSheet: {height: 300},
});

export default App;
