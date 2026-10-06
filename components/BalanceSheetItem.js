import React from 'react';
import {Text, View} from 'react-native';
import {CATEGORY_NEED, TYPE_INCOME} from '../Constants';
import ColorPalette from '../ColorPalette';
import formatAmount from '../utils/formatAmount';
import balanceSheet from '../styles/balanceSheet.less';
import typography from '../styles/typography.less';
import Icon from './Icon';

const iconColors = (type, category) => {
  if (type === TYPE_INCOME) {
    return {bg: ColorPalette.NEUTRAL_TINT, fg: ColorPalette.NEED_TEXT};
  }
  if (category === CATEGORY_NEED) {
    return {bg: ColorPalette.NEED_TINT, fg: ColorPalette.NEED_TEXT};
  }
  return {bg: ColorPalette.WANT_TINT, fg: ColorPalette.WANT_TEXT};
};

const BalanceSheetItem = ({type, category, amount, description, recurringId, isLast}) => {
  const colors = iconColors(type, category);
  const isIncome = type === TYPE_INCOME;
  return (
    <View style={[balanceSheet.itemRow, isLast && balanceSheet.itemRowLast]}>
      <View style={[balanceSheet.itemIcon, {backgroundColor: colors.bg}]}>
        <Icon name={isIncome ? 'coin' : 'receipt'} size={20} color={colors.fg} />
      </View>
      <View style={balanceSheet.itemDescriptionRow}>
        <Text style={[typography.body, balanceSheet.itemDescriptionText]} numberOfLines={1}>
          {description}
        </Text>
        {recurringId && <Icon name="repeat" size={14} color={ColorPalette.TEXT_FAINT} />}
      </View>
      <Text style={[typography.amount, isIncome && {color: ColorPalette.NEED_TEXT}]}>
        {isIncome ? '+' : ''}
        {formatAmount(amount)}
      </Text>
    </View>
  );
};

export default BalanceSheetItem;
