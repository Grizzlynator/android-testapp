import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/native';

const navigationRef = createNavigationContainerRef();

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  console.log('navigatorRef: ', navigatorRef);
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (navigationRef.isReady()) {
    _navigator.dispatch(StackActions.popToTop());
    _navigator.dispatch(
      CommonActions.navigate({
        routeName,
        params,
      }),
    );
  }
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  navigationRef,
};
