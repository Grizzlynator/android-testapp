import messaging from '@react-native-firebase/messaging';
import notifierDao from '../database/local-storage/notifierDao';
import {
  fetchNotificationHistoryRequest,
  registrationRequest,
} from '../api/notifierServiceAPI';
import _ from 'lodash';

import notifConverter from '../converters/NotificationsConverter';

export const requestUserPermission = async () =>
  await messaging().requestPermission();

export const fetchUserNotifications = async userId => {
  const rawNotificationsData = await fetchNotificationHistoryRequest(userId);
  return notifConverter.convert(rawNotificationsData);
};

export const checkIsTokenExpired = async token => {
  const actualToken = await messaging().getToken();
  const isExpired = !_.isEqual(token, actualToken);
  if (isExpired) {
    await notifierDao.updateProps({
      isTokenExpired: true,
    });
  }
  return isExpired;
};

export const registerDeviceInNotifierService = async profile => {
  const token = await messaging().getToken();

  const {email, displayName} = profile;

  const regDTO = {
    name: displayName,
    email: email,
    token: token,
  };

  const response = await registrationRequest(regDTO);
  const {status, data} = response;

  if ([200, 201].includes(status)) {
    await notifierDao.updateProps({
      userID: data.id,
      registeredToken: token,
      isTokenExpired: false,
    });

    return {
      userID: data.id,
      token: token,
    };
  }

  throw Error('Registration failed');
};

export const removeProfileData = async () => {
  await notifierDao.updateProps({
    userID: null,
    registeredToken: '',
    isTokenExpired: false,
  });
};
