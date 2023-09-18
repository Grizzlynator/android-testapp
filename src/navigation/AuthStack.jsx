import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from '../screens/SignInScreen';

const AuthFlowStack = createStackNavigator();

function AuthStack() {
  return (
    <AuthFlowStack.Navigator>
      <AuthFlowStack.Screen name="SignIn" component={SignInScreen} />
    </AuthFlowStack.Navigator>
  );
}

export default AuthStack;
