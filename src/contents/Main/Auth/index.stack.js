import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import loginStack from './routes';
import LoginScreen from './Login';
import SignupScreen from './Register';
import ForgotPasswordScreen from './Login/forgotPassword';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <>
      <Stack.Screen name={loginStack.login} component={LoginScreen} />
      <Stack.Screen
        name={loginStack.forgotPassword}
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name={loginStack.signup} component={SignupScreen} />
    </>
  );
}
