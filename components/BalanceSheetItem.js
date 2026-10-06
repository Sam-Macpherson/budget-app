import React from 'react';
import {CATEGORY_NEED, TYPE_INCOME} from '../Constants';
import ListRow from './ListRow';

const tone = (type, category) => {
  if (type === TYPE_INCOME) {
    return 'income';
  }
  return category === CATEGORY_NEED ? 'need' : 'want';
};

const BalanceSheetItem = ({type, category, amount, description, recurringId, isLast}) => (
  <ListRow
    tone={tone(type, category)}
    description={description}
    amount={amount}
    recurring={Boolean(recurringId)}
    isLast={isLast}
  />
);

export default BalanceSheetItem;
