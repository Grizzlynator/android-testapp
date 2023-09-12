import React from 'react';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {SafeAreaView, StyleSheet} from 'react-native';

import rootReducer from './redux/reducers';
import AppContainer from './navigation/RootStack';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isReady: false, initialState: {}};
  }

  // render() {
  //   this.renderApp();
  // }

  render() {
    const {initialState} = this.state;
    const appStore = configureStore({
      reducer: rootReducer,
      preloadedState: initialState,
      middleware: [ReduxThunk],
    });

    console.log('appStore: ', appStore.getState());

    return (
      <Provider store={appStore}>
        <SafeAreaView style={mainSreenStyle}>
          <AppContainer />
        </SafeAreaView>
      </Provider>
    );
  }
}

const mainSreenStyle = StyleSheet.create({
  flex: 1,
});
