import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import ImageSource from '@images/OnBoarding'
import styles from './styles'
import {customTxt} from '@constants/css'
import Font from '@fonts'
import * as colors from '@colors'
import { useDispatch } from 'react-redux'
import {showOnBoarding} from '../../../Configs/redux/actions'

export default function OnBoarding3() {
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Image style={styles.imgView} source={ImageSource.OnBoarding3}/>
      <View style={styles.contentView}>
      <Text
          style={[
            customTxt(Font.Bold, 25, colors.black).txt,
            styles.titleTxt
          ]}>
          Customized Diet
        </Text>
        <Text style={[
          customTxt(Font.Light, 18, colors.black).txt,
          {textAlign: 'center'}
        ]}>
          Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown
          printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not
          only five centuries
        </Text>
      </View>
      <TouchableOpacity
        style={styles.bgStart}
        onPress={() => {
          Promise.all([
            dispatch(showOnBoarding())
          ])
        }}
      >
        <Text style={
          customTxt(Font.Bold, 18, colors.colorFF3152).txt
        }>
          Get Started
          </Text>
      </TouchableOpacity>
    </View>
  )
}


