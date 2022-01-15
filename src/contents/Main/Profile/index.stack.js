import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import profileStack from './routes';
import ProfileScreen from './index';
import ChangePasswordScreen from './changePassword';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <>
      <Stack.Screen name={profileStack.profile} component={ProfileScreen} />
      {/* <Stack.Screen
        name={homeStack.notification}
        component={NotificationScreen}
      /> */}
      <Stack.Screen
        name={profileStack.changePassword}
        component={ChangePasswordScreen}
      />
    </>
  );
}
