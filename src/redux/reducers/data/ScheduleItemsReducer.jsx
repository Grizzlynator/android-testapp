import {
  SCHEDULE_ITEMS_FETCH_SUCCESS,
  SCHEDULE_ITEMS_FETCH_FAIL,
  SCHEDULE_ITEMS_FETCH,
} from '../../actions/types';

const INITIAL_STATE = {
  items: {},
  loading: false,
  error: 'Service data not found.',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SCHEDULE_ITEMS_FETCH:
      return {
        ...state,
        loading: true,
      };

    case SCHEDULE_ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        error: '',
      };

    case SCHEDULE_ITEMS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
