import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AuthImage from '@images/Auth';
import AppView from '@utils/appView';
import styles from './styles';
import {customTxt} from '@constants/css';
import Font from '@fonts';
import * as colors from '@colors';
import {Input} from '@components';
import {useForm} from 'react-hook-form';
import {EMAIL_REGEX} from '@utils/validator';
import {saveToken} from '../redux/actions';
import {useDispatch} from 'react-redux';
import IconSource from '@icons';
import NavigationService from '@utils/navigation';
import loginStack from '../routes';

export default function LoginScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = value => handleData(value);

  const handleData = value => {
    Promise.all([
      dispatch(saveToken('sadsada')),
      // dispatch(deleteAllData())
    ]);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20 + AppView.safeAreaInsets.top}>
          <Image style={styles.header_imgae} source={AuthImage.headerAuth} />
          <View style={styles.contentView}>
            <Input
              name="email"
              control={control}
              rules={{
                required: true,
                pattern: {
                  value: EMAIL_REGEX,
                  message: 'Not a valid email',
                },
              }}
              placeholder="Email"
              style={styles.inputView}
            />
            {errors?.email && (
              <Text
                style={[
                  styles.errorTxt,
                  customTxt(Font.Regular, 12, colors.error).txt,
                ]}>
                Not a valid email!
              </Text>
            )}
            <Input
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              placeholder="Password"
              style={[styles.inputView, styles.mgT30]}
            />
            {errors?.password && (
              <Text
                style={[
                  styles.errorTxt,
                  customTxt(Font.Regular, 12, colors.error).txt,
                ]}>
                Not a valid password
              </Text>
            )}
          </View>
          <View style={styles.forgotPass}>
            <TouchableOpacity>
              <Text style={customTxt(Font.Regular, 14, colors.text).txt}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.bgBtnView}>
            <TouchableOpacity
              style={styles.btnView}
              // onPress={handleSubmit(onSubmit)}
              onPress={onSubmit}>
              <Text style={customTxt(Font.Bold, 15, colors.white).txt}>
                Login
              </Text>
            </TouchableOpacity>
            <View style={styles.viewSignIn}>
              <Text style={customTxt(Font.Regular, 15, colors.text).txt}>
                Do not have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => NavigationService.navigate(loginStack.signup)}>
                <Text style={customTxt(Font.Bold, 15, colors.colorFF3152).txt}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
