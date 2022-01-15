import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import scanStack from './routes';
import ScanScreen from './index';

const Stack = createStackNavigator();

export default function ScanStack() {
  return (
    <>
      <Stack.Screen name={scanStack.index} component={ScanScreen} />
      {/* <Stack.Screen
        name={homeStack.notification}
        component={NotificationScreen}
      /> */}
      {/* <Stack.Screen
        name={profileStack.changePassword}
        component={ChangePasswordScreen}
      /> */}
    </>
  );
}
