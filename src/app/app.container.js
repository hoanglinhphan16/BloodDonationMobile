import React, {useEffect} from 'react';
import AppNavigator from './app.navigator';
import {firebase} from '@react-native-firebase/messaging';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import {saveToken} from '../contents/Main/Auth/redux/actions';
import {useDispatch} from 'react-redux';
import NavigationService from '../core/utils/navigation';
import homeStack from '../contents/Main/Home/routes';

export default function AppContainer() {
  const dispatch = useDispatch();

  useEffect(() => {
    getOldData();
  }, []);

  const getOldData = async () => {
    const token = await AsyncStorage.getItem('SAVE_TOKEN');
    if (!_.isEmpty(token)) {
      global.token = token;
      dispatch(saveToken(token));
    }
  };
  const messageListener = async () => {
    const unsubscribe = firebase.messaging().onMessage(async remoteMessage => {
      const post = JSON.parse(remoteMessage.data.post);

      if (remoteMessage.notification) {
        showMessage({
          message: remoteMessage.notification.title || '',
          description: remoteMessage.notification.body,
          backgroundColor: '#F1908C',
          // icon: 'info',
          duration: 10000,
          hideStatusBar: true,
          titleStyle: {fontWeight: 'bold', fontSize: 15},
          style: {borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
          onPress: () => {
            NavigationService.navigate(homeStack.detail, post);
          },
        });
      }
    });
    firebase.messaging().setBackgroundMessageHandler(async remoteMessage => {});
    firebase.messaging().onNotificationOpenedApp(async remoteMessage => {
      console.log(remoteMessage);
    });
    return unsubscribe;
  };
  const requestNotificationPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();

    let fcmToken;
    if (enabled === 1) {
      fcmToken = await firebase.messaging().getToken();
    } else {
      const authorizationStatus = await firebase
        .messaging()
        .requestPermission();
      if (authorizationStatus) {
        fcmToken = await firebase.messaging().getToken();
      }
    }
    global.deviceToken = fcmToken;
  };
  useEffect(() => {
    messageListener(), requestNotificationPermission();
  }, []);
  return (
    <>
      <FlashMessage position="top" />
      <AppNavigator />
    </>
  );
}
