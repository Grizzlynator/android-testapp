import moment from 'moment';

export const getRange = (range, shift) => {
  let isoRange = range === 'weeks' ? 'isoWeek' : range;

  let unixStart = moment().utc(true).add(shift, range).startOf(isoRange).unix();

  let unixEnd = moment().utc(true).add(shift, range).endOf(isoRange).unix();

  return {
    fromDate: unixStart,
    toDate: unixEnd,
  };
};

export const unixToString = (unix, format) => {
  return moment.unix(unix).utc().format(format);
};
