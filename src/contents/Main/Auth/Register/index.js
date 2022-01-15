import React, {useRef, useState} from 'react';
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

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    register,
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const dispatch = useDispatch();

  const onSubmit = value => handleData(value);

  const handleData = value => {
    Promise.all([dispatch(saveToken('sadsada'))]);
  };
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20 + AppView.safeAreaInsets.top}>
          <TouchableOpacity
            style={{marginTop: 20, marginLeft: 10}}
            onPress={() => NavigationService.goBack()}>
            <IconSource.ArrowLeftIcon stroke="#000" />
          </TouchableOpacity>
          <Image style={styles.header_imgae} source={AuthImage.headerAuth} />
          <View style={styles.contentView}>
            <Input
              name="name"
              control={control}
              rules={{
                required: true,
              }}
              placeholder="Nguyen Van A"
              style={[styles.inputView, styles.mgT30]}
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
              style={[styles.inputView, styles.mgT30]}
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
            <Input
              name="comfirmPassword"
              control={control}
              rules={{
                required: true,
                validate: value =>
                  value === password.current || 'The passwords do not match',
              }}
              placeholder="Comfirm Password"
              style={[styles.inputView, styles.mgT30]}
            />
            {errors?.comfirmPassword && (
              <Text
                style={[
                  styles.errorTxt,
                  customTxt(Font.Regular, 12, colors.error).txt,
                ]}>
                {errors?.comfirmPassword?.message ||
                  'Not a valid comfirm password'}
              </Text>
            )}
          </View>
          <View style={styles.bgBtnView}>
            <TouchableOpacity
              style={styles.btnView}
              onPress={handleSubmit(onSubmit)}>
              {/* onPress={onSubmit}> */}
              <Text style={customTxt(Font.Bold, 15, colors.white).txt}>
                Sign up
              </Text>
            </TouchableOpacity>
            <View style={styles.viewSignIn}>
              <Text style={customTxt(Font.Regular, 15, colors.text).txt}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity>
                <Text style={customTxt(Font.Bold, 15, colors.colorFF3152).txt}>
                  Sign in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </View>
  );
}
