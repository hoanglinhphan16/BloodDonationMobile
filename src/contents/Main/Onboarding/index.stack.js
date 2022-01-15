import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import onBoardingStack from './routes'
import OnBoardingScreen from './screens/index'

const Stack = createStackNavigator()

export default function OnBoardingStack() {
  return (
    <>
      <Stack.Screen name={onBoardingStack.index} component={OnBoardingScreen}/>
    </>
  )
}
