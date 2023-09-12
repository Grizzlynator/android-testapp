import React from 'react';
import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';
import AppStack from './AppStack';
import RootPageOptions from './configs/RootPageOptions';

const navigationRef = createNavigationContainerRef();

const RootStack = createNativeStackNavigator();

export default function AppContainer(params) {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Load"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        {/* <RootStack.Screen name="Auth" component={AuthStack} /> */}
        <RootStack.Screen
          name="App"
          component={AppStack}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
