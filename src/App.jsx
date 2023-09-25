import React, {useState, useEffect, useRef, useCallback, useMemo} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {SafeAreaView, StyleSheet, Platform} from 'react-native';

import './configs/Fixtimerbug';
import rootReducer from './redux/reducers';
import reduxInitialState from './redux/reducers/initial-state/';
import AppContainer from './navigation/RootStack';
import FloatingNavigationButtons from './components/FloatingNavigationButtons';
import {MessageWindow} from './components/common';
import InternalAlerts from './components/InternalAlerts';
import KeyboardListener from './listener/KeyboardListener';
import InternetAccessListener from './listener/InternetAccessListener';
import {cleanStorageIfNewVersion} from './services/AppService';
import {changeLanguage} from './workers/LocaleService';
import NavigationService from './workers/NavigationService';
import NotificationsController from './notifications/Controller';
import NotifService from './services/NotificationServcie';

export default function App(props) {
  const hasMounted = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState({});
  const notif = useMemo(() => new NotifService(null, onNotif), [onNotif]);

  // const notif = new NotifService(null, this.onNotif.bind(this));

  const appStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [ReduxThunk],
  });

  const componentDidUpdate = useCallback(() => {
    if (isReady) {
      notif.popInitialNotification(() => {
        const notification = Platform.OS === 'ios' ? notif.data : notif;
        NavigationService.navigate('NotificationDetails', {
          notification,
          isNative: true,
        });
      });
    }
  }, [isReady, notif]);

  useEffect(() => {
    // console.log('useEffect. hasMounted: ', hasMounted.current);
    if (!hasMounted.current) {
      // console.log('useEffect !hasMounted');
      appInit(setIsReady, setInitialState).catch(err =>
        console.log('App init failed', err),
      );
      hasMounted.current = true;
    } else {
      componentDidUpdate();
    }
  }, [componentDidUpdate]);

  const onNotif = useCallback(() => {
    if (isReady) {
      const notification = Platform.OS === 'ios' ? notif.data : notif;
      NavigationService.navigate('NotificationDetails', {
        notification,
        isNative: true,
      });
    }
  }, [isReady, notif]);

  const appInit = async () => {
    await cleanStorageIfNewVersion();
    const appIinitialState = await reduxInitialState();
    const {language} = appIinitialState.appConfig;
    changeLanguage(language);
    setIsReady(true);
    setInitialState(appIinitialState);
  };

  const renderLoadingWindow = () => {
    return <MessageWindow message={'Initialization'} />;
  };

  const renderApp = () => (
    <Provider store={appStore}>
      <SafeAreaView style={styles.mainSreenStyle}>
        <AppContainer />
        <FloatingNavigationButtons />
        <KeyboardListener />
        <InternetAccessListener />
        <InternalAlerts />
        {/*<NotificationsController />*/}
      </SafeAreaView>
    </Provider>
  );

  return isReady ? renderApp() : renderLoadingWindow();
}

const styles = StyleSheet.create({
  mainSreenStyle: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
