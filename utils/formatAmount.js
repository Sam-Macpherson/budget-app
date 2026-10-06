import roundToTwoDecimals from './roundToTwoDecimals';

const formatAmount = amount =>
  typeof amount === 'number' && !isNaN(amount) ? String(roundToTwoDecimals(amount)) : '—';

export default formatAmount;
