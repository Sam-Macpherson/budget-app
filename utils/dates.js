import moment from 'moment';

const formatDateMonth = date => moment(date).format('MMM YYYY');
const formatDateDayShort = date => moment(date).format('MMM Do YYYY');
const formatDateDayMedium = date => moment(date).format('ddd MMM D YYYY');

export {formatDateMonth, formatDateDayShort, formatDateDayMedium};
