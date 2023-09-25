import {
  CLEAN_NOTIFICATION_HISTORY,
  NOTIFICATION_HISTORY_FETCH,
  NOTIFICATION_HISTORY_FETCH_FAIL,
  NOTIFICATION_HISTORY_FETCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  notifications: [],
  err: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NOTIFICATION_HISTORY_FETCH:
      return {
        ...state,
        isFetching: true,
        notifications: [],
        err: '',
      };

    case NOTIFICATION_HISTORY_FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        notifications: action.payload,
        err: '',
      };

    case NOTIFICATION_HISTORY_FETCH_FAIL:
      return {
        ...state,
        isFetching: false,
        notifications: [],
        err: 'Notification history fetch failed',
      };

    case CLEAN_NOTIFICATION_HISTORY:
      return {
        ...state,
        isFetching: false,
        notifications: [],
      };

    default:
      return state;
  }
};
