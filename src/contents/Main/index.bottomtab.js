import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import IconSource from '@icons';
import * as Colors from '@colors';
import HomeScreen from './Home';
import PersonScreen from './Profile';
import homeStack from './Home/routes';
import ScanScreen from './QRScan';
import {View} from 'react-native';
import HistoryScreen from './History';
import NotificationScreen from './Notification';

const BottomTabs = createBottomTabNavigator();

export default function MainBottomTab() {
  const insets = useSafeAreaInsets();

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.BlueApp,
        tabBarInactiveTintColor: Colors.grayText,
        tabBarStyle: {
          height: 60 + insets.bottom,
        },
        tabBarShowLabel: false,
        tabBarLabelStyle: {
          marginBottom: insets.bottom === 0 ? 10 : 0,
        },
      }}>
      <BottomTabs.Screen
        name={homeStack.index}
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <IconSource.Home color={focused ? '#4667D7' : '#B0B9CA'} />
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 10,
                  backgroundColor: !focused ? 'white' : '#F1908C',
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name={'Notification'}
        component={NotificationScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <IconSource.Notification
                color={focused ? '#4667D7' : '#B0B9CA'}
              />
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 10,
                  backgroundColor: !focused ? 'white' : '#F1908C',
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name={'QRCode'}
        component={ScanScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <IconSource.QRCode color={focused ? '#4667D7' : '#B0B9CA'} />
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 10,
                  backgroundColor: !focused ? 'white' : '#F1908C',
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name={'Activity'}
        component={HistoryScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <IconSource.Activity color={focused ? '#4667D7' : '#B0B9CA'} />
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 10,
                  backgroundColor: !focused ? 'white' : '#F1908C',
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
          ),
        }}
      />
      <BottomTabs.Screen
        name={'Person'}
        component={PersonScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <View>
              <IconSource.Person color={focused ? '#4667D7' : '#B0B9CA'} />
              <View
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: 10,
                  backgroundColor: !focused ? 'white' : '#F1908C',
                  alignSelf: 'center',
                  marginTop: 5,
                }}
              />
            </View>
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
