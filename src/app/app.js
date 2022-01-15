import React, {useEffect} from 'react'
import store from '@core/config/store'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppContainer from './app.container'
import {Provider} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as defines from '../core/constants/defines'
export default function App() {
   useEffect(() => {
    getToken()
  }, [])

  const getToken = async () => {
    const token = await AsyncStorage.getItem(defines.STORAGE_KEY.TOKEN) || ''
    global.token = token
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContainer />
      </SafeAreaProvider>
    </Provider>
  )
}
