import _ from 'lodash';
import React from 'react';
import {Text, View} from 'react-native';
import {CATEGORY_NEED, CATEGORY_WANT, TYPE_EXPENSE, TYPE_INCOME} from '../Constants';
import roundToTwoDecimals from '../utils/roundToTwoDecimals';
import formatAmount from '../utils/formatAmount';
import Pill from './Pill';
import style from '../styles/incomeHeader.less';
import typography from '../styles/typography.less';

const sumExpenses = (items, category) =>
  roundToTwoDecimals(_.sum(_.map(_.filter(items, {type: TYPE_EXPENSE, category}), 'amount')));

const Row = ({label, need, want, save}) => (
  <View style={style.headerRow}>
    <Text style={[typography.caption, style.rowLabel]}>{label}</Text>
    <Pill style={style.cell} tone="need" text={formatAmount(need)} />
    <Pill style={style.cell} tone="want" text={formatAmount(want)} />
    {_.isUndefined(save) ? (
      <View style={style.cell} />
    ) : (
      <Pill style={style.cell} tone="neutral" text={formatAmount(save)} />
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
    <View style={style.incomeHeader}>
      <View style={style.headerRow}>
        <View style={style.rowLabel} />
        <Text style={[typography.label, style.columnLabel]}>need</Text>
        <Text style={[typography.label, style.columnLabel]}>want</Text>
        <Text style={[typography.label, style.columnLabel]}>save</Text>
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
