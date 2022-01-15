import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import loginStack from './routes';
import LoginScreen from './Login';
import SignupScreen from './Register';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <Stack.Screen name={loginStack.login} component={LoginScreen} />
      <Stack.Screen name={loginStack.signup} component={SignupScreen} />
    </>
  );
}
