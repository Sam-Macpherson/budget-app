import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import _ from 'lodash';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE} from '../Constants';
import {Text, TouchableOpacity, View} from 'react-native';
import cardStyles from '../styles/card.less';
import typography from '../styles/typography.less';
import balanceSheet from '../styles/balanceSheet.less';
import Badge from './Badge';
import badge from '../styles/badge.less';
import BalanceSheetItem from './BalanceSheetItem';
import React from 'react';
import {formatDateDayMedium} from '../utils/dates';

const BalanceSheetDate = ({onPressItem, item}) => {
  const want = roundToTwoDecimals(
    _.sum(
      _.map(
        _.filter(item.items, {
          type: TYPE_EXPENSE,
          category: CATEGORY_WANT,
        }),
        'amount',
      ),
    ),
  );
  const need = roundToTwoDecimals(
    _.sum(
      _.map(
        _.filter(item.items, {
          type: TYPE_EXPENSE,
          category: CATEGORY_NEED,
        }),
        'amount',
      ),
    ),
  );

  return (
    <View style={[cardStyles.card, balanceSheet.balanceSheetDate]}>
      <View style={balanceSheet['balanceSheetDate.header']}>
        <Text style={typography.medium}>{formatDateDayMedium(item.date)}</Text>
        <View style={balanceSheet['balanceSheetDate.header.totals']}>
          <Badge textStyle={typography.small} style={badge['badge.white-on-green']} text={need} />
          <Badge textStyle={typography.small} style={badge['badge.white-on-orange']} text={want} />
        </View>
      </View>
      {_.map(item.items, i => (
        <TouchableOpacity key={`${i.date}_${i.description}`} onPress={() => onPressItem(i)}>
          <BalanceSheetItem {...i} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BalanceSheetDate;
