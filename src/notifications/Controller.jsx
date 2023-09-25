import React from 'react';
import {connect} from 'react-redux';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {
  checkTokenValidity,
  registerInNotifierSystem,
} from '../redux/actions/NotificationActions';

class PushNotificationController extends React.Component {
  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    this.notificationListener = await messaging().onMessage(
      this.onForegroundNotificationReceived,
    );
  }

  componentWillUnmount() {
    this.notificationListener();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {
      isGuest,
      isTokenExpired,
      checkTokenValidity,
      registerInNotifierSystem,
      isRegisteredInNotifierSystem,
    } = this.props;

    const isFirstLogin = prevProps.isGuest && !isGuest;
    const isNotRegistered = !isRegisteredInNotifierSystem && !isGuest;

    if (isTokenExpired || isFirstLogin || isNotRegistered) {
      registerInNotifierSystem();
    } else if (!isGuest) {
      checkTokenValidity();
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const ifInetAccessResumed =
      nextProps.isNetConnected && !this.props.isNetConnected;
    const ifFirstLogin = !nextProps.isGuest && this.props.isGuest;
    const ifTokenExpired = nextProps.isTokenExpired;

    return ifInetAccessResumed || ifFirstLogin || ifTokenExpired;
  }

  async onForegroundNotificationReceived(notification) {
    const {title, body} = notification.notification;
    const {data} = notification;
    PushNotification.localNotification({
      title: title,
      message: body,
      playSound: true,
      soundName: 'default',
      userInfo: data,
      smallIcon: '@drawable/ic_stat_school',
      color: '#144774',
    });
  }

  render = () => null;
}

const actions = {
  registerInNotifierSystem,
  checkTokenValidity,
};

const mapStateToProps = state => {
  const {profile, appState, notifier} = state;
  return {
    isTokenExpired: notifier.isTokenExpired,
    isNetConnected: appState.net.isConnected,
    isGuest: profile.status === 'guest',
    isRegisteredInNotifierSystem: notifier.userID !== null,
    registeredDeviceToken: notifier.registeredToken,
    notificationToShow: notifier.notificationToShow,
  };
};

export default connect(mapStateToProps, actions)(PushNotificationController);
