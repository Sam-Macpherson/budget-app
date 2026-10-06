import _ from 'lodash';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import formatAmount from '../utils/formatAmount';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE} from '../Constants';
import {formatDateDayDisplay} from '../utils/dates';
import typography from '../theme/typography';
import Pill from './Pill';
import BalanceSheetItem from './BalanceSheetItem';

const sumExpenses = (items, category) =>
  roundToTwoDecimals(_.sum(_.map(_.filter(items, {type: TYPE_EXPENSE, category}), 'amount')));

const BalanceSheetDate = ({onPressItem, item}) => (
  <View className="px-3 py-1 mb-3 rounded-2xl bg-surface">
    <View className="flex-row justify-between items-center pt-2.5 pb-1.5">
      <Text className={typography.bodyStrong}>{formatDateDayDisplay(item.date)}</Text>
      <View className="flex-row">
        <Pill tone="need" text={formatAmount(sumExpenses(item.items, CATEGORY_NEED))} />
        <Pill
          className="ml-1.5"
          tone="want"
          text={formatAmount(sumExpenses(item.items, CATEGORY_WANT))}
        />
      </View>
    </View>
    {_.map(item.items, (i, index) => (
      <TouchableOpacity key={`${i.date}_${i.description}`} onPress={() => onPressItem(i)}>
        <BalanceSheetItem {...i} isLast={index === item.items.length - 1} />
      </TouchableOpacity>
    ))}
  </View>
);

export default BalanceSheetDate;
