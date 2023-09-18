import {LOGIN_FORM_UPDATE} from './types';

export const updateLoginFormInput = (key, value) => {
  return {
    type: LOGIN_FORM_UPDATE,
    payload: {key, value},
  };
};
