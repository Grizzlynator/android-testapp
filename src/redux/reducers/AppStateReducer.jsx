import {NET_ACCESS_STATE_CHANGED} from '../actions/types';

const INITIAL_STATE = {
  net: {
    isConnected: false,
  },
};

export default (state = INITIAL_STATE, action) => {
  const {payload} = action;

  switch (action.type) {
    case NET_ACCESS_STATE_CHANGED:
      return {
        ...state,
        net: {
          ...payload,
        },
      };

    default:
      return state;
  }
};
