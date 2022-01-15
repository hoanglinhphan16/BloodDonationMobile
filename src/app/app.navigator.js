import React, {useEffect} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigationRef, isMountedRef } from '@core/utils/navigation'
import { createStackNavigator } from '@react-navigation/stack'
import MainStack from '../contents/index.navigator'

const Stack = createStackNavigator()

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'modal'
      }}
    >
      <Stack.Screen name="mainStack" component={MainStack} />
    </Stack.Navigator>
  )
}

export default function AppNavigator() {

  useEffect(() => {
    isMountedRef.current = true
    return () => (isMountedRef.current = false)
  }, [])

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="rootStack"
          component={RootStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
