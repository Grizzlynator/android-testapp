import {NET_ACCESS_STATE_CHANGED} from './types';

export const updateNetState = state => {
  return {
    type: NET_ACCESS_STATE_CHANGED,
    payload: state,
  };
};
