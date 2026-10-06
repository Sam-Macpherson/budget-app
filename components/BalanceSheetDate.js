import _ from 'lodash';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import formatAmount from '../utils/formatAmount';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE} from '../Constants';
import {formatDateDayDisplay} from '../utils/dates';
import balanceSheet from '../styles/balanceSheet.less';
import typography from '../styles/typography.less';
import Pill from './Pill';
import BalanceSheetItem from './BalanceSheetItem';

const sumExpenses = (items, category) =>
  roundToTwoDecimals(_.sum(_.map(_.filter(items, {type: TYPE_EXPENSE, category}), 'amount')));

const BalanceSheetDate = ({onPressItem, item}) => (
  <View style={balanceSheet.dateCard}>
    <View style={balanceSheet.dateHeader}>
      <Text style={typography.bodyStrong}>{formatDateDayDisplay(item.date)}</Text>
      <View style={balanceSheet.dateTotals}>
        <Pill tone="need" text={formatAmount(sumExpenses(item.items, CATEGORY_NEED))} />
        <Pill
          style={balanceSheet.dateTotalGap}
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
