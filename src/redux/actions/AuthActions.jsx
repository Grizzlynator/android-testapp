import {
  AUTH_PROCESS,
  AUTH_PROCESS_FAIL,
  AUTH_PROCESS_SUCCESS,
  LOGOUT_PROCESS,
  LOGOUT_PROCESS_FAIL,
  LOGOUT_PROCESS_SUCCESS,
} from './types';

import * as authService from '../../services/authServices';

/**
 * Sign in as authenticated user.
 * @param loginName - user login.
 * @param password - user password.
 */

export const signIn = (loginName, password) => {
  return dispatch => {
    dispatch({type: AUTH_PROCESS});
    authService
      .signIn(loginName, password)
      .then(profile => onSignInSuccess(dispatch, profile))
      .catch(err => onSignInFail(dispatch, err));
  };
};

/**
 * Sign in as guest user.
 */

export const signInAsGuest = () => {
  return async dispatch => {
    dispatch({type: AUTH_PROCESS});
    authService
      .signInAsGuest()
      .then(profile => onSignInSuccess(dispatch, profile))
      .catch(err => onSignInFail(dispatch, err));
  };
};

const onSignInSuccess = async (dispatch, profile) => {
  dispatch({
    type: AUTH_PROCESS_SUCCESS,
    payload: profile,
  });
};

const onSignInFail = (dispatch, err) => {
  dispatch({
    type: AUTH_PROCESS_FAIL,
    payload: err.message,
  });
};

/**
 * Sign out from application.
 */

export const signOut = () => {
  return async (dispatch, state) => {
    dispatch({type: LOGOUT_PROCESS});
    authService
      .signOut()
      .then(() => onLogoutSuccess(dispatch))
      .catch(err => onLogoutFail(dispatch, err));
  };
};

const onLogoutSuccess = dispatch => {
  dispatch({
    type: LOGOUT_PROCESS_SUCCESS,
  });
};

const onLogoutFail = (dispatch, err) => {
  console.log(err);
  dispatch({
    type: LOGOUT_PROCESS_FAIL,
  });
};
