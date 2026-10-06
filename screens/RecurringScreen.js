import _ from 'lodash';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import moment from 'moment';
import BottomSheet from '../components/BottomSheet';
import Button from '../components/Button';
import Icon from '../components/Icon';
import ListRow from '../components/ListRow';
import Pill from '../components/Pill';
import RecurringModal from '../components/RecurringModal';
import Screen from '../components/Screen';
import si from '../storage/storage';
import {useTheme} from '../theme/ThemeProvider';
import typography from '../theme/typography';
import formatAmount from '../utils/formatAmount';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';

const SHEET_HEIGHT = 360;

const RecurringScreen = ({navigation}) => {
  const {colors} = useTheme();
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null);
  const sheet = useRef(null);

  const load = useCallback(() => si.getRecurring().then(config => setItems(config.items)), []);
  useEffect(() => {
    load();
  }, [load]);
  useEffect(() => si.subscribe(load), [load]);

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
      <ScrollView className="flex-1">
        {_.isEmpty(items) ? (
          <View className="items-center px-6 py-8 rounded-2xl bg-surface">
            <Icon name="repeat" size={28} color={colors.TEXT_MUTED} />
            <Text className={`${typography.bodyStrong} mt-3`}>No recurring items yet</Text>
            <Text className={`${typography.caption} mt-1 text-center`}>
              Rent, subscriptions and salary set up here get added to each month automatically.
            </Text>
          </View>
        ) : (
          <>
            <View className="flex-row px-[9px] py-3 mb-3 rounded-2xl bg-surface">
              {_.map(['need', 'want', 'income'], kind => (
                <View key={kind} className="flex-1 mx-[3px]">
                  <Text className={`${typography.label} text-center mb-1.5`}>{kind}</Text>
                  <Pill
                    tone={kind === 'income' ? 'neutral' : kind}
                    text={formatAmount(total(kind))}
                  />
                </View>
              ))}
            </View>
            <View className="px-3 py-1 mb-3 rounded-2xl bg-surface">
              {_.map(sorted, (item, index) => (
                <TouchableOpacity key={item.id} onPress={() => open(item)}>
                  <ListRow
                    tone={item.kind}
                    description={item.description}
                    subtitle={`Monthly on the ${moment.localeData().ordinal(item.day)}`}
                    amount={item.amount}
                    isLast={index === sorted.length - 1}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
      <Button
        variant="primary"
        icon="plus"
        text="Add recurring item"
        className="mt-3"
        onPress={() => open(null)}
      />
      <BottomSheet ref={sheet} height={SHEET_HEIGHT}>
        <RecurringModal item={editing} onSave={save} onDelete={confirmDelete} />
      </BottomSheet>
    </Screen>
  );
};

export default RecurringScreen;
