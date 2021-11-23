// Constants for the app.

const TYPE_INCOME = "TYPE_INCOME";
const TYPE_EXPENSE = "TYPE_EXPENSE";

const CATEGORY_NEED = "CATEGORY_NEED";
const CATEGORY_WANT = "CATEGORY_WANT";
const CATEGORY_SAVE = "CATEGORY_SAVE";
const EXPENSE_CATEGORIES = [CATEGORY_NEED, CATEGORY_WANT, CATEGORY_SAVE];

// Some sample items for now.
const items = [
  {
    type: TYPE_INCOME,
    expenseName: "Dividends",
    amount: 1233.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Toiletries",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Groceries",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Groceries",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Domino's Pizza",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Salary",
    amount: 1213.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Electricity bill",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "1 oz cappuccino",
    amount: 5.07,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "coffee beans",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 1",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 2",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 3",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Item 4",
    amount: 3523.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 5",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Item 1",
    amount: 1123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 2",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 3",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Item 4",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 5",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Item 1",
    amount: 123.45,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 2",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 3",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
  {
    type: TYPE_INCOME,
    expenseName: "Item 4",
    amount: 1238.69,
    category: CATEGORY_WANT,
  },
  {
    type: TYPE_EXPENSE,
    expenseName: "Item 5",
    amount: 123.45,
    category: CATEGORY_NEED,
  },
];


export {
  items,
  TYPE_INCOME,
  TYPE_EXPENSE,
  CATEGORY_NEED,
  CATEGORY_WANT,
  CATEGORY_SAVE,
  EXPENSE_CATEGORIES,
};