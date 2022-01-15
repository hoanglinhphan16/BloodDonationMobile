import React, {useState, useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainBottomTab from './Main/index.bottomtab';
import AuthStack from './Main/Auth/index.stack';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import _ from 'lodash';
import AppView from '@utils/appView';
import HomeStack from './Main/Home/index.stack';
import {useSelector} from 'react-redux';
import OnBoardingStack from './Main/Onboarding/index.stack';
import ProfileStack from './Main/Profile/index.stack';
import ScanStack from './Main/QRScan/index.stack';
import HistoryStack from './Main/History/index.stack';
import NotificationStack from './Main/Notification/index.stack';

const Stack = createStackNavigator();

export default function MainStack() {
  const token = useSelector(state => state?.user?.token);
  const isOnBoarding = useSelector(state => state?.config.isOnBoarding);

  function NavigationCase() {
    if (_.isEmpty(token)) {
      if (isOnBoarding) {
        return OnBoardingStack();
      } else {
        return AuthStack();
      }
    }
    return <Stack.Screen name="mainBottomTab" component={MainBottomTab} />;
  }
  const insets = useSafeAreaInsets();
  AppView.initSafeArea(insets);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}>
      {NavigationCase()}
      {HomeStack()}
      {NotificationStack()}
      {ProfileStack()}
      {HistoryStack()}
      {ScanStack()}
    </Stack.Navigator>
  );
}
