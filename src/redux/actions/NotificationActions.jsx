import {
  CLEAN_NOTIFICATION_HISTORY,
  NOTIFICATION_HISTORY_FETCH,
  NOTIFICATION_HISTORY_FETCH_FAIL,
  NOTIFICATION_HISTORY_FETCH_SUCCESS,
  NOTIFICATION_TOKEN_HAS_EXPIRED,
  NOTIFIER_SERVICE_PROFILE_CLEANUP,
  NOTIFIER_SERVICE_REGISTRATION,
  NOTIFIER_SERVICE_REGISTRATION_FAIL,
  NOTIFIER_SERVICE_REGISTRATION_SUCCESS,
} from './types';

import {
  registerDeviceInNotifierService,
  fetchUserNotifications,
  removeProfileData,
  checkIsTokenExpired,
} from '../../services/notifierService';

export const registerInNotifierSystem = () => (dispatch, state) => {
  const {profile} = state();
  dispatch({type: NOTIFIER_SERVICE_REGISTRATION});
  registerDeviceInNotifierService(profile)
    .then(data => onRegistrationSuccess(dispatch, data))
    .catch(err => onRegistrationFail(dispatch, err));
};

const onRegistrationSuccess = (dispatch, {token, userID}) => {
  dispatch({
    type: NOTIFIER_SERVICE_REGISTRATION_SUCCESS,
    payload: {
      registeredToken: token,
      userID: userID,
    },
  });
};

const onRegistrationFail = (dispatch, err) => {
  console.log(err);
  dispatch({
    type: NOTIFIER_SERVICE_REGISTRATION_FAIL,
  });
};

export const fetchNotificationHistory = userId => {
  return async (dispatch, getState) => {
    dispatch({type: NOTIFICATION_HISTORY_FETCH});
    fetchUserNotifications(userId)
      .then(notifications =>
        onNotificationHistoryFetchSuccess(dispatch, notifications),
      )
      .catch(err => onNotificationHistoryFetchFail(dispatch, err));
  };
};

const onNotificationHistoryFetchSuccess = (dispatch, notifications) => {
  dispatch({
    type: NOTIFICATION_HISTORY_FETCH_SUCCESS,
    payload: notifications,
  });
};

const onNotificationHistoryFetchFail = (dispatch, err) => {
  dispatch({
    type: NOTIFICATION_HISTORY_FETCH_FAIL,
    payload: 'Notifications fetch failed',
  });
};

export const cleanNotificationHistory = () => {
  return {
    type: CLEAN_NOTIFICATION_HISTORY,
  };
};

export const cleanUpNotifierProfileData = () => (dispatch, state) => {
  removeProfileData().then(() => {
    dispatch({
      type: NOTIFIER_SERVICE_PROFILE_CLEANUP,
    });
  });
};

export const checkTokenValidity = () => async (dispatch, state) => {
  const {registeredToken} = state().notifier;
  const isExpired = await checkIsTokenExpired(registeredToken);
  if (isExpired) {
    dispatch({
      type: NOTIFICATION_TOKEN_HAS_EXPIRED,
    });
  }
};
