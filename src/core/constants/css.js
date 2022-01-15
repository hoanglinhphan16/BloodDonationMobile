import * as colors from '@colors'
import { StyleSheet } from 'react-native'
import Fonts from '@fonts'

export const customTxt = (family, size, txtColor) => StyleSheet.create({
  txt: {
    fontFamily: family || Fonts.Regular,
    fontSize: size || 13,
    color: txtColor || colors.black
  }
})
