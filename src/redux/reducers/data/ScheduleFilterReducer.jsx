import {
  SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS,
  SCH_FILTER_PARAMS_UPDATE,
} from '../../actions/types';

/*
    loading: false,
    error: "Filter not defined.",
    mode: 'day',

    group: {name: "", id: ""},    +
    room: {name: "", id: ""},     +
    lecturer: {name: "", id: ""}, +
    fromDate: getCurDayStart(),   +
    toDate: getCurDayFinish(),    +
 */

export default (state = {}, action) => {
  switch (action.type) {
    case SCH_FILTER_PARAMS_UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: '',
      };

    default:
      return state;
  }
};
