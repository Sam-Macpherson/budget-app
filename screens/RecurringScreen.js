import _ from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import ColorPalette from '../ColorPalette';
import BottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Pill from '../components/Pill';
import RecurringModal from '../components/RecurringModal';
import Screen from '../components/Screen';
import si from '../storage/storage';
import balanceSheet from '../styles/balanceSheet.less';
import styles from '../styles/recurring.less';
import typography from '../styles/typography.less';
import formatAmount from '../utils/formatAmount';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';

const SHEET_HEIGHT = 360;

const KIND_COLORS = {
  need: {bg: ColorPalette.NEED_TINT, fg: ColorPalette.NEED_TEXT},
  want: {bg: ColorPalette.WANT_TINT, fg: ColorPalette.WANT_TEXT},
  income: {bg: ColorPalette.NEUTRAL_TINT, fg: ColorPalette.NEED_TEXT},
};

const RecurringRow = ({item, isLast, onPress}) => {
  const colors = KIND_COLORS[item.kind];
  const isIncome = item.kind === 'income';
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[balanceSheet.itemRow, isLast && balanceSheet.itemRowLast]}>
        <View style={[balanceSheet.itemIcon, {backgroundColor: colors.bg}]}>
          <Icon name={isIncome ? 'coin' : 'receipt'} size={20} color={colors.fg} />
        </View>
        <View style={balanceSheet.itemDescription}>
          <Text style={typography.body} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={typography.caption}>
            Monthly on the {moment.localeData().ordinal(item.day)}
          </Text>
        </View>
        <Text style={[typography.amount, isIncome && {color: ColorPalette.NEED_TEXT}]}>
          {isIncome ? '+' : ''}
          {formatAmount(item.amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const RecurringScreen = ({navigation}) => {
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const sheet = useRef(null);

  const load = useCallback(() => si.getRecurring().then(config => setItems(config.items)), []);
  useEffect(() => {
    load();
  }, [load]);

  const sorted = _.sortBy(items, ['day', i => i.description.toLowerCase()]);
  const total = kind => roundToTwoDecimals(_.sum(_.map(_.filter(items, {kind}), 'amount')));

  const open = item => {
    setEditing(item);
    sheet.current?.open();
  };

  const askAboutThisMonth = saved => {
    const month = moment().format('MMMM');
    Alert.alert(
      `Add to ${month} too?`,
      `Choose "Next month" if you've already entered ${saved.description} for ${month}.`,
      [
        {text: 'Next month'},
        {
          text: 'This month too',
          onPress: async () => {
            await si.unskipRecurringForMonth(saved.id);
            await si.applyRecurring();
          },
        },
      ],
      {cancelable: false},
    );
  };

  const save = async data => {
    const isNew = !data.id;
    const saved = await si.saveRecurringItem(data);
    if (isNew) {
      // Held back until the user answers, so a background refresh can't add it first.
      await si.skipRecurringForMonth(saved.id);
    }
    sheet.current?.close();
    await load();
    if (isNew) {
      askAboutThisMonth(saved);
    }
  };

  const confirmDelete = item =>
    Alert.alert(`Delete ${item.description}?`, 'Entries already added stay in your budget.', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await si.deleteRecurringItem(item.id);
          sheet.current?.close();
          await load();
        },
      },
    ]);

  return (
    <Screen title="Recurring" onMenu={navigation.openDrawer}>
      <ScrollView style={styles.list}>
        {_.isEmpty(items) ? (
          <View style={styles.emptyCard}>
            <Icon name="repeat" size={28} color={ColorPalette.TEXT_MUTED} />
            <Text style={[typography.bodyStrong, styles.emptyTitle]}>No recurring items yet</Text>
            <Text style={[typography.caption, styles.emptyText]}>
              Rent, subscriptions and salary set up here get added to each month automatically.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.totals}>
              {_.map(['need', 'want', 'income'], kind => (
                <View key={kind} style={styles.total}>
                  <Text style={[typography.label, styles.totalLabel]}>{kind}</Text>
                  <Pill
                    tone={kind === 'income' ? 'neutral' : kind}
                    text={formatAmount(total(kind))}
                  />
                </View>
              ))}
            </View>
            <View style={balanceSheet.dateCard}>
              {_.map(sorted, (item, index) => (
                <RecurringRow
                  key={item.id}
                  item={item}
                  isLast={index === sorted.length - 1}
                  onPress={() => open(item)}
                />
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <Button
        variant="primary"
        icon="plus"
        text="Add recurring item"
        style={styles.addButton}
        onPress={() => open(null)}
      />
      <BottomSheet ref={sheet} height={SHEET_HEIGHT}>
        <RecurringModal item={editing} onSave={save} onDelete={confirmDelete} />
      </BottomSheet>
    </Screen>
  );
};

export default RecurringScreen;
