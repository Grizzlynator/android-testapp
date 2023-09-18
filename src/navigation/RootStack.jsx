import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreen from '../screens/LoadingScreen';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import NavigationService from '../services/NavigationService';
// import RootPageOptions from './configs/RootPageOptions';

const RootStack = createNativeStackNavigator();

export default function AppContainer(params) {
  return (
    <NavigationContainer ref={NavigationService.navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Load"
          component={LoadingScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Auth"
          component={AuthStack}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="App"
          component={AppStack}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
