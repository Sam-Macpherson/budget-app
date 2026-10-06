import _ from 'lodash';
import moment from 'moment';

const reducer = data => {
  // Bucket the data up by day of the month and sort it in descending order.
  const sortedDates = _.sortBy(
    _.map(_.keys(data), key => [moment(key, 'ddd MMM D YYYY').toDate(), key]),
    value => -value[0].getDate(),
  );
  let output = [];
  _.forEach(sortedDates, date => {
    output = [...output, {date: date[0], items: data[date[1]]}];
  });
  return output;
};

export default reducer;
