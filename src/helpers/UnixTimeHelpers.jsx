import moment from 'moment';

export function getCurDayStart() {
  return moment().utc(true).startOf('day').unix();
}

export function getCurDayFinish() {
  return moment().utc(true).endOf('day').unix();
}

export function getCurWeekStart() {
  return moment().utc(true).startOf('isoWeek').unix();
}

export function getCurWeekFinish() {
  return moment().utc(true).endOf('isoWeek').unix();
}

export function getCurMonthStart() {
  return moment().utc(true).startOf('month').unix();
}

export function getCurMonthFinish() {
  return moment().utc(true).endOf('month').unix();
}

export const getUnixTimeRange = rangeModeName => {
  const range = {fromDate: null, toDate: null};
  switch (rangeModeName) {
    case 'day':
      range.fromDate = getCurDayStart();
      range.toDate = getCurDayFinish();
      break;
    case 'week':
      range.fromDate = getCurWeekStart();
      range.toDate = getCurWeekFinish();
      break;
    case 'month':
      range.fromDate = getCurMonthStart();
      range.toDate = getCurMonthFinish();
      break;
    default:
      break;
  }
  return range;
};
