import React, {useState, useEffect} from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import rootReducer from './redux/reducers';
import reduxInitialState from './redux/reducers/initial-state/';
import AppContainer from './navigation/RootStack';
import FloatingNavigationButtons from "./components/FloatingNavigationButtons";
import {MessageWindow} from './components/common';

// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {isReady: false, initialState: {}};
//   }
//
//   appInit = async () => {
//     // await cleanStorageIfNewVersion();
//     const initialState = await reduxInitialState();
//     // const {language} = initialState.appConfig;
//     // changeLanguage(language);
//     this.setState({
//       isReady: true,
//       initialState: initialState,
//     });
//   };
//
//   // render() {
//   //   this.renderApp();
//   // }
//
//   render() {
//     const {initialState} = this.state;
//     const appStore = configureStore({
//       reducer: rootReducer,
//       preloadedState: initialState,
//       middleware: [ReduxThunk],
//     });
//
//     console.log('appStore: ', appStore.getState());
//
//     return (
//       <Provider store={appStore}>
//         <SafeAreaView style={mainSreenStyle}>
//           <AppContainer />
//         </SafeAreaView>
//       </Provider>
//     );
//   }
// }

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
