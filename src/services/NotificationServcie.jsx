import PushNotification from 'react-native-push-notification';
import NotificationHandler from '../handler/NotificationHandler';

export default class NotifService {
  constructor(onRegister, onNotification) {
    NotificationHandler.attachRegister(onRegister);
    NotificationHandler.attachNotification(onNotification);
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
  }

  popInitialNotification = handler => {
    PushNotification.popInitialNotification(notif => {
      if (notif) {
        handler(notif);
      }
    });
  };

  checkPermission = cbk => PushNotification.checkPermissions(cbk);

  requestPermissions = () => PushNotification.requestPermissions();

  abandonPermissions = () => PushNotification.abandonPermissions();
}
