import {
  AUTH_PROCESS_SUCCESS,
  LOGOUT_PROCESS_SUCCESS,
} from '../../actions/types';

import {GUEST_PROFILE} from '../initial-state/profile';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_PROCESS_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case LOGOUT_PROCESS_SUCCESS:
      return {
        ...GUEST_PROFILE,
      };

    default:
      return state;
  }
};
