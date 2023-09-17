import {
  getCurDayFinish,
  getCurDayStart,
} from '../../../helpers/UnixTimeHelpers';
import filterConfigDao from '../../../database/local-storage/filterConfigDao';
import _ from 'lodash';

export const DEFAULT_FILTER_STATE = {
  error: 'Filter not defined.',
  loading: false,

  group: {name: '', id: ''},
  room: {name: '', id: ''},
  lecturer: {name: '', id: ''},
  fromDate: getCurDayStart(),
  toDate: getCurDayFinish(),
  mode: 'day',
};

const scheduleFilter = async () => {
  const filterParameters = await filterConfigDao.get();
  if (_.isEmpty(filterParameters)) {
    return DEFAULT_FILTER_STATE;
  }
  return {
    ...DEFAULT_FILTER_STATE,
    ...filterParameters,
    error: '',
  };
};

export default scheduleFilter;
