import messaging from '@react-native-firebase/messaging';
import notifierDao from '../../../database/local-storage/notifierDao';
import _ from 'lodash';

const INITIAL_STATE = {
  userID: null,
  registeredToken: '',
  isTokenExpired: false,
  notificationToShow: undefined,
};

const notifier = async () => {
  let notifier = await notifierDao.get();
  const remoteMessage = await messaging().getInitialNotification();
  if (_.isEmpty(notifier)) {
    await notifierDao.overwrite(INITIAL_STATE);
    notifier = {...INITIAL_STATE};
  }

  return {
    ...notifier,
    notificationToShow: remoteMessage ? remoteMessage.notification : undefined,
  };
};

export default notifier;
