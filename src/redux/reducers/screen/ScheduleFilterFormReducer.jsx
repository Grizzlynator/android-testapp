import {
  SCHEDULE_FILTER_FORM_INPUT_UPDATE,
  SCHEDULE_FILTER_FORM_VALIDATE,
  SCHEDULE_FILTER_FORM_FILL,
  SCH_FILTER_FORM_PARAMS_SAVING,
  SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS,
  SCHEDULE_FILTER_FORM_RESET,
  SCHEDULE_ITEMS_FETCH_SUCCESS,
  SCH_FILTER_FORM_PARAMS_NOT_DEFINED,
  SCH_FILTER_FORM_PARAMS_ERROR,
  SCH_FILTER_FORM_DROP_DOWN_UPDATE,
} from '../../actions/types';

const INITIAL_STATE = {
  inputValues: {
    group: '',
    room: '',
    lecturer: '',
  },
  dropDownValues: {
    groups: [],
    rooms: [],
    lecturers: [],
  },
  inputsWithError: [],
  filterSaved: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULE_FILTER_FORM_INPUT_UPDATE:
      return {
        ...state,
        inputValues: {
          ...state.inputValues,
          ...action.payload,
        },
        filterSaved: false,
        inputsWithError: [],
      };

    case SCH_FILTER_FORM_DROP_DOWN_UPDATE:
      return {
        ...state,
        dropDownValues: action.payload,
      };

    case SCH_FILTER_FORM_PARAMS_SAVE_SUCCESS:
      return {
        ...state,
        filterSaved: true,
      };

    case SCH_FILTER_FORM_PARAMS_ERROR:
      return {
        ...state,
        inputsWithError: action.payload,
      };

    default:
      return state;
  }
};
