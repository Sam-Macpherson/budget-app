// Constants for the app.
import moment from 'moment';

const TYPE_INCOME = 'TYPE_INCOME';
const TYPE_EXPENSE = 'TYPE_EXPENSE';

const CATEGORY_NEED = 'CATEGORY_NEED';
const CATEGORY_WANT = 'CATEGORY_WANT';
const CATEGORY_SAVE = 'CATEGORY_SAVE';
const EXPENSE_CATEGORIES = [CATEGORY_NEED, CATEGORY_WANT, CATEGORY_SAVE];

// Some sample items for now.
const january_2021 = [
  {
    date: new Date(2021, 0, 1),
    type: TYPE_EXPENSE,
    expenseName: 'Groceries',
    amount: 123.45,
    category: CATEGORY_NEED,
  },
];

const january_2022 = [
  {
    date: new Date(2022, 0, 4),
    type: TYPE_EXPENSE,
    expenseName: 'Groceries',
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    date: new Date(2022, 0, 2),
    type: TYPE_EXPENSE,
    expenseName: 'Coffee',
    amount: 24.45,
    category: CATEGORY_WANT,
  },
];

const october_2021 = [
  {
    date: new Date(2021, 9, 3),
    type: TYPE_INCOME,
    expenseName: 'Salary',
    amount: 1213.45,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 9, 3),
    type: TYPE_EXPENSE,
    expenseName: 'Electricity bill',
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    date: new Date(2021, 9, 3),
    type: TYPE_EXPENSE,
    expenseName: '1 oz cappuccino',
    amount: 5.07,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 9, 3),
    type: TYPE_EXPENSE,
    expenseName: 'coffee beans',
    amount: 123.45,
    category: CATEGORY_WANT,
  },
];

const december_2021 = [
  {
    date: new Date(2021, 11, 1),
    type: TYPE_INCOME,
    expenseName: 'Dividends',
    amount: 1233.45,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 11, 1),
    type: TYPE_EXPENSE,
    expenseName: 'Toiletries',
    amount: 1233.45,
    category: CATEGORY_NEED,
  },
  {
    date: new Date(2021, 11, 1),
    type: TYPE_INCOME,
    expenseName: 'Found money',
    amount: 60.21,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 11, 1),
    type: TYPE_EXPENSE,
    expenseName: 'Groceries',
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    date: new Date(2021, 11, 3),
    type: TYPE_EXPENSE,
    expenseName: "Domino's Pizza",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 11, 3),
    type: TYPE_INCOME,
    expenseName: 'Salary',
    amount: 1213.45,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 11, 3),
    type: TYPE_EXPENSE,
    expenseName: 'Electricity bill',
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    date: new Date(2021, 11, 3),
    type: TYPE_EXPENSE,
    expenseName: '1 oz cappuccino',
    amount: 5.07,
    category: CATEGORY_WANT,
  },
  {
    date: new Date(2021, 11, 3),
    type: TYPE_EXPENSE,
    expenseName: 'coffee beans',
    amount: 123.45,
    category: CATEGORY_WANT,
  },
];

export {
  january_2021,
  january_2022,
  october_2021,
  december_2021,
  TYPE_INCOME,
  TYPE_EXPENSE,
  CATEGORY_NEED,
  CATEGORY_WANT,
  CATEGORY_SAVE,
  EXPENSE_CATEGORIES,
};
