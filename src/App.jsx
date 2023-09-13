import React, {useState, useEffect, useRef} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {SafeAreaView, StyleSheet} from 'react-native';

import rootReducer from './redux/reducers';
import reduxInitialState from './redux/reducers/initial-state/';
import AppContainer from './navigation/RootStack';
import FloatingNavigationButtons from './components/FloatingNavigationButtons';
import {MessageWindow} from './components/common';

export default function App(props) {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState({});

  // const notif = new NotifService(null, this.onNotif.bind(this));

  useEffect(() => {
    appInit(setIsReady, setInitialState).catch(err =>
      console.log('App init failed', err),
    );
  }, []);

  const appStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
    middleware: [ReduxThunk],
  });

  useEffect(() => {
    console.log('I have been mounted');
  }, []);

  const renderApp = () => (
    <Provider store={appStore}>
      <SafeAreaView style={styles.mainSreenStyle}>
        <AppContainer />
        <FloatingNavigationButtons />
      </SafeAreaView>
    </Provider>
  );

  const appInit = async () => {
    // await cleanStorageIfNewVersion();
    const appIinitialState = await reduxInitialState();
    const {language} = appIinitialState.appConfig;
    // changeLanguage(language);
    setIsReady(true);
    setInitialState(appIinitialState);
  };

  const renderLoadingWindow = () => {
    return <MessageWindow message={'Initialization'} />;
  };

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
