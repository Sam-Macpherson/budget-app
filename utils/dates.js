import moment from 'moment';

// formatDateMonth and formatDateDayMedium are storage keys; changing their formats orphans saved data.
const formatDateMonth = date => moment(date).format('MMM YYYY');
const formatDateDayShort = date => moment(date).format('MMM Do YYYY');
const formatDateDayMedium = date => moment(date).format('ddd MMM D YYYY');
const formatDateDayDisplay = date => moment(date).format('ddd, MMM D');

export {formatDateMonth, formatDateDayShort, formatDateDayMedium, formatDateDayDisplay};
