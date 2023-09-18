import {
  AUTH_PROCESS,
  AUTH_PROCESS_SUCCESS,
  AUTH_PROCESS_FAIL,
  LOGIN_FORM_UPDATE,
} from '../actions/types';

const INITIAL_STATE = {
  loginName: '',
  password: '',
  loading: false,
  error: '',
};

export default (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case LOGIN_FORM_UPDATE:
      return {
        ...state,
        [payload.key]: payload.value,
      };

    case AUTH_PROCESS:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case AUTH_PROCESS_SUCCESS:
      return {
        ...state,
        loginName: '',
        password: '',
        loading: false,
      };

    case AUTH_PROCESS_FAIL:
      return {
        ...state,
        password: '',
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
