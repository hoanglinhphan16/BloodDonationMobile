import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import notificationStack from './routes';
import NotificationScreen from './index';

const Stack = createStackNavigator();

export default function NotificationStack() {
  return (
    <>
      <Stack.Screen
        name={notificationStack.index}
        component={NotificationScreen}
      />
    </>
  );
}
