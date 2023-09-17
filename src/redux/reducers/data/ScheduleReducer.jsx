import {
  SCHEDULE_EVENTS_FETCH,
  SCHEDULE_EVENTS_FETCH_FAIL,
  SCHEDULE_EVENTS_FETCH_SUCCESS,
} from '../../actions/types';

const INITIAL_STATE = {
  loading: false,
  events: [],
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULE_EVENTS_FETCH:
      return {
        ...state,
        loading: true,
      };
    case SCHEDULE_EVENTS_FETCH_SUCCESS:
      return {
        ...state,
        events: action.payload,
        loading: false,
        error: '',
      };
    case SCHEDULE_EVENTS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
