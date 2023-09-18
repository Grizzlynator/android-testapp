import {
  LOGOUT_PROCESS_SUCCESS,
  NOTIFICATION_TOKEN_HAS_EXPIRED,
  NOTIFIER_SERVICE_REGISTRATION,
  NOTIFIER_SERVICE_REGISTRATION_FAIL,
  NOTIFIER_SERVICE_REGISTRATION_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGOUT_PROCESS_SUCCESS:
      return {
        ...state,
        loading: false,
        registeredToken: '',
        userID: null,
      };

    case NOTIFIER_SERVICE_REGISTRATION:
      return {
        ...state,
        loading: true,
      };

    case NOTIFIER_SERVICE_REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        registeredToken: action.payload.token,
        userID: action.payload.userID,
        isTokenExpired: false,
      };

    case NOTIFIER_SERVICE_REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        registeredToken: '',
        userID: null,
      };

    case NOTIFICATION_TOKEN_HAS_EXPIRED:
      return {
        ...state,
        isTokenExpired: true,
      };

    default:
      return state;
  }
};
