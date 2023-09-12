import {
  APP_CONFIG_LANGUAGE_CHANGE,
  APP_CONFIG_UPDATE,
  AUTH_PROCESS_SUCCESS,
  LOGOUT_PROCESS_SUCCESS,
} from '../../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case APP_CONFIG_UPDATE:
      return {
        ...state,
        ...action.payload,
      };

    case APP_CONFIG_LANGUAGE_CHANGE:
      return {
        ...state,
        language: action.payload,
      };

    case AUTH_PROCESS_SUCCESS:
      return {
        ...state,
        signedIn: true,
      };

    case LOGOUT_PROCESS_SUCCESS:
      return {
        ...state,
        signedIn: false,
      };

    default:
      return state;
  }
};
