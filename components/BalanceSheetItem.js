import React from 'react';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_INCOME} from '../Constants';
import {Image, Text, View} from 'react-native';
import Badge from './Badge';

import badge from '../styles/badge.less';
import cardStyles from '../styles/card.less';
import balanceSheet from '../styles/balanceSheet.less';
import typography from '../styles/typography.less';

const BalanceSheetItem = ({type, category, amount, description}) => {
  let iconStyle;
  if (category === CATEGORY_WANT) {
    iconStyle = balanceSheet['balanceSheetItemIcon.white-on-orange'];
  }
  if (category === CATEGORY_NEED) {
    iconStyle = balanceSheet['balanceSheetItemIcon.white-on-green'];
  }
  if (type === TYPE_INCOME) {
    iconStyle = balanceSheet['balanceSheetItemIcon.transparent'];
  }

  return (
    <View style={[cardStyles.card, balanceSheet.balanceSheetItemContainer]}>
      <View style={balanceSheet.balanceSheetItemLabel}>
        <View style={[balanceSheet.balanceSheetItemIcon, iconStyle]}>
          <Image
            style={balanceSheet['balanceSheetItemIcon.icon']}
            source={
              type === TYPE_INCOME
                ? require('../images/piggy-bank-outline.png')
                : require('../images/receipt-outline.png')
            }
          />
        </View>
        <Text>{description}</Text>
      </View>
      <View style={balanceSheet.balanceSheetValue}>
        <Badge textStyle={typography.medium} style={badge['badge.transparent']} text={amount} />
      </View>
    </View>
  );
};

export default BalanceSheetItem;
