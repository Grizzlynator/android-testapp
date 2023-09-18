import {
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('setTopLevelNavigator navigatorRef: ', navigatorRef);
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  console.log('routeName: ', routeName);
  console.log('navigationRef.isReady(): ', navigationRef.isReady());

  if (navigationRef.isReady()) {
    navigationRef.dispatch(StackActions.popToTop());
    navigationRef.navigate(routeName, params);
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigationRef,
};
