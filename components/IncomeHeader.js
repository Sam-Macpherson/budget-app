import _ from 'lodash';
import React from 'react';
import {Text, View} from 'react-native';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE, TYPE_INCOME} from '../Constants';
import typography from '../theme/typography';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import formatAmount from '../utils/formatAmount';
import Pill from './Pill';

// Every cell has the same horizontal padding so empty cells get the same flex share as pills.
const CELL = 'flex-1 mx-[3px] px-2.5';

const sumExpenses = (items, category) =>
  roundToTwoDecimals(_.sum(_.map(_.filter(items, {type: TYPE_EXPENSE, category}), 'amount')));

const Row = ({label, need, want, save}) => (
  <View className="flex-row items-center my-[3px]">
    <Text className={`${typography.caption} w-[52px]`}>{label}</Text>
    <Pill className={CELL} tone="need" text={formatAmount(need)} />
    <Pill className={CELL} tone="want" text={formatAmount(want)} />
    {_.isUndefined(save) ? (
      <View className={CELL} />
    ) : (
      <Pill className={CELL} tone="neutral" text={formatAmount(save)} />
    )}
  </View>
);

const IncomeHeader = ({items}) => {
  const totalIncome = _.sum(_.map(_.filter(items, {type: TYPE_INCOME}), 'amount'));
  const [need, want, save] = [
    roundToTwoDecimals(totalIncome * 0.5),
    roundToTwoDecimals(totalIncome * 0.3),
    roundToTwoDecimals(totalIncome * 0.2),
  ];
  const needsExpenses = sumExpenses(items, CATEGORY_NEED);
  const wantsExpenses = sumExpenses(items, CATEGORY_WANT);

  return (
    <View className="p-3 mb-3 rounded-2xl bg-surface">
      <View className="flex-row items-center my-[3px]">
        <View className="w-[52px]" />
        <Text className={`${typography.label} ${CELL} text-center`}>need</Text>
        <Text className={`${typography.label} ${CELL} text-center`}>want</Text>
        <Text className={`${typography.label} ${CELL} text-center`}>save</Text>
      </View>
      <Row label="income" need={need} want={want} save={save} />
      <Row label="spent" need={needsExpenses} want={wantsExpenses} />
      <Row
        label="left"
        need={roundToTwoDecimals(need - needsExpenses)}
        want={roundToTwoDecimals(want - wantsExpenses)}
      />
    </View>
  );
};

export default IncomeHeader;
