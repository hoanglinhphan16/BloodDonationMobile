import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import homeStack from './routes';
import HomeScreen from './index';
import DetailScreen from './detailScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <>
      <Stack.Screen name={homeStack.index} component={HomeScreen} />
      <Stack.Screen name={homeStack.detail} component={DetailScreen} />
    </>
  );
}
