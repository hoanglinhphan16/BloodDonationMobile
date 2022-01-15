import React from 'react'
import {
  StyleSheet, View
} from 'react-native'
import { SkypeIndicator } from 'react-native-indicators'
import * as colors from '@constants/colors'

export default function Loading({indicatorColor, indicatorStyle}) {
  return (
    <View style={styles.container}>
      <View style={styles.bgView}/>
      <View style={styles.indicatorView}>
        <SkypeIndicator
          style={[styles.indicatorStyle, indicatorStyle]}
          color={indicatorColor || colors.BlueApp}
          size={50}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  },
  bgView: {
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    position: 'absolute',
    backgroundColor: 'black',
    opacity: 0.2
  },
  indicatorView: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  indicatorStyle: {
    width: 30,
    height: 30
  }
})
