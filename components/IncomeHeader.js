import _ from 'lodash';
import React from 'react';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE, TYPE_INCOME} from '../Constants';
import {View} from 'react-native';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import HeaderCard from './HeaderCard';
import style from '../styles/incomeHeader.less';

const IncomeHeader = ({items}) => {
  const totalIncome = _.sum(_.map(_.filter(items, {type: TYPE_INCOME}), item => item.amount));
  const [need, want, save] = [
    roundToTwoDecimals(totalIncome * 0.5),
    roundToTwoDecimals(totalIncome * 0.3),
    roundToTwoDecimals(totalIncome * 0.2),
  ];
  const needsExpenses = roundToTwoDecimals(
    _.sum(
      _.map(_.filter(items, {type: TYPE_EXPENSE, category: CATEGORY_NEED}), item => item.amount),
    ),
  );
  const wantsExpenses = roundToTwoDecimals(
    _.sum(
      _.map(_.filter(items, {type: TYPE_EXPENSE, category: CATEGORY_WANT}), item => item.amount),
    ),
  );
  const needsBalance = roundToTwoDecimals(need - needsExpenses);
  const wantsBalance = roundToTwoDecimals(want - wantsExpenses);

  return (
    <View style={style.incomeHeader}>
      <HeaderCard
        title="income"
        showLabels
        showSave
        need={need}
        want={want}
        save={save}
        totalIncome={totalIncome}
      />
      <HeaderCard title="expenses" need={needsExpenses} want={wantsExpenses} />
      <HeaderCard title="balance" need={needsBalance} want={wantsBalance} />
    </View>
  );
};

export default IncomeHeader;
