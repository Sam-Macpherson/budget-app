import _ from 'lodash';

const reducer = data => {
  // Bucket the data up by day of the month and sort it in descending order.
  const dates = _.sortBy(
    _.uniqBy(_.map(data, 'date'), d => new Date(d).getDate()),
    d => -new Date(d).getDate(),
  );
  const itemsByDate = _.map(dates, d => ({
    date: d,
    items: _.filter(data, item => new Date(item.date).getDate() === new Date(d).getDate()),
  }));
  return itemsByDate;
};

export default reducer;
