import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import historyStack from './routes';
import HistoryScreen from './index';

const Stack = createStackNavigator();

export default function HistoryScreenStack() {
  return (
    <>
      <Stack.Screen name={historyStack.index} component={HistoryScreen} />
    </>
  );
}
