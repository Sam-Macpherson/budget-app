import _ from 'lodash';
import React, {useRef, useState, useEffect, useMemo, useCallback} from 'react';

import {AppState, FlatList, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {useTheme} from '../theme/ThemeProvider';

import IncomeHeader from '../components/IncomeHeader';
import {TYPE_EXPENSE, TYPE_INCOME} from '../Constants';

import BalanceSheetDate from '../components/BalanceSheetDate';
import Button from '../components/Button';
import BottomSheet from '../components/BottomSheet';
import ExpenseModal from '../components/ExpenseModal';
import si from '../storage/storage';
import {formatDateMonth} from '../utils/dates';
import IncomeModal from '../components/IncomeModal';
import MonthPickerModal from '../components/MonthPickerModal';
import Screen from '../components/Screen';

const SHEET_HEIGHTS = {expense: 280, income: 224, month: 300};

const BudgetScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [editingEntry, setEditingEntry] = useState(null);
  const addExpenseModal = useRef(null);
  const addIncomeModal = useRef(null);
  const [viewingMonth, setViewingMonth] = useState(new Date());
  const monthPickerModal = useRef(null);

  const [sheetItems, setSheetItems] = useState([]);
  // Flat list of all items for the header.
  const allItems = useMemo(() => _.flatten(_.map(sheetItems, 'items')), [sheetItems]);

  useEffect(() => {
    si.getEntriesForMonth(viewingMonth).then(entries => {
      setSheetItems(entries || []);
    });
  }, [viewingMonth]);

  const applyRecurring = useCallback(
    () =>
      si.applyRecurring().then(added => {
        if (added > 0) {
          setViewingMonth(month => new Date(month));
        }
      }),
    [],
  );
  useFocusEffect(applyRecurring);
  useEffect(() => si.subscribe(() => setViewingMonth(month => new Date(month))), []);
  useEffect(() => {
    const subscription = AppState.addEventListener('change', state => {
      if (state === 'active') {
        applyRecurring();
      }
    });
    return () => subscription.remove();
  }, [applyRecurring]);

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
        si.editEntry({
          date: editingEntry.date,
          recurringId: editingEntry.recurringId,
          ...data,
        }).then(() => resetViewingMonth());
      }
    },
    [resetViewingMonth, editingEntry],
  );

  return (
    <Screen title="Budget" onMenu={navigation.openDrawer}>
      <IncomeHeader items={allItems} />
      <FlatList
        className="w-full"
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
      <View className="flex-row justify-between items-center pt-3">
        <Button
          icon="calendar"
          trailingIcon="chevronDown"
          text={formatDateMonth(viewingMonth)}
          onPress={() => monthPickerModal.current?.open()}
        />
        <View className="flex-row items-center">
          <Button
            icon="coin"
            iconColor={colors.NEED_TEXT}
            accessibilityLabel="Add income"
            onPress={() => addIncomeModal.current?.open()}
          />
          <Button
            className="ml-2"
            variant="primary"
            icon="receipt"
            accessibilityLabel="Add expense"
            onPress={() => addExpenseModal.current?.open()}
          />
        </View>
      </View>
      <BottomSheet
        ref={addExpenseModal}
        height={SHEET_HEIGHTS.expense}
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
      </BottomSheet>
      <BottomSheet
        ref={addIncomeModal}
        height={SHEET_HEIGHTS.income}
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
      </BottomSheet>
      <BottomSheet ref={monthPickerModal} height={SHEET_HEIGHTS.month}>
        <MonthPickerModal
          value={viewingMonth}
          onSelect={date => {
            setViewingMonth(date);
            monthPickerModal.current?.close();
          }}
        />
      </BottomSheet>
    </Screen>
  );
};

export default BudgetScreen;
