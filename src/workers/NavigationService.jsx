// import { NavigationActions, StackActions } from 'react-navigation';
import {
  CommonActions,
  StackActions,
  // createNavigationContainerRef,
} from '@react-navigation/native';

// const navigationRef = createNavigationContainerRef();

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  // console.log('navigatorRef: ', navigatorRef);
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('----NavigationService navigate----');
  console.log('_navigator.isReady(): ', _navigator.isReady());
  if (_navigator.isReady()) {
    _navigator.dispatch(StackActions.popToTop());
    // _navigator.dispatch(
    //   CommonActions.navigate({
    //     name: routeName,
    //     params,
    //   }),
    // );
    _navigator.navigate('App', {screen: routeName});
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  // navigationRef,
};
