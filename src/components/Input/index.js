import React from 'react'
import { TextInput, StyleSheet } from 'react-native'
import { useController } from 'react-hook-form'
import * as colors from '@colors'

export default function InputView({
  control,
  name,
  placeholder,
  rules,
  keyboardType = 'default',
  style,
  defaultValue,
  multiline,
  secureTextEntry
  }) {
  const {field} = useController({
    control,
    defaultValue: defaultValue || '',
    name,
    rules
  })
  return (
    <TextInput
      onBlur={field.onBlur}
      onChangeText={field.onChange}
      value={field.value}
      placeholder={placeholder}
      keyboardType={keyboardType}
      style={[styles.textInput, style]}
      multiline={multiline}
      placeholderTextColor={colors.border}
      secureTextEntry={secureTextEntry}
    />
  )
}


const styles = StyleSheet.create({
  textInput: {
    color: colors.color343434
  }
})


