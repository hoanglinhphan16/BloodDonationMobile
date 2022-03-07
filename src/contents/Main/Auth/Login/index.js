import React, {useState, useEffect} from 'react';
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
import {post} from '../../../../core/utils/apis';
import Loading from '../../../../components/Loading/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const onSubmit = async value => {
    setLoading(true);
    setError(false);
    console.log('value :>> ', value);
    const data = {
      username: value.username,
      password: value.password,
      deviceToken: global.deviceToken,
    };
    const res = await post('/login', data);

    if (res.code == 400) {
      setError(res.message);
      setLoading(false);
    } else {
      handleData(res);
      global.token = res.access_token;
      setLoading(false);
    }
  };
  const handleData = value => {
    if (value.access_token) {
      Promise.all([dispatch(saveToken(value.access_token))]);
      AsyncStorage.setItem('SAVE_TOKEN', value.access_token);
    }
  };
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={20 + AppView.safeAreaInsets.top}>
          <Image style={styles.header_imgae} source={AuthImage.headerAuth} />
          <View style={styles.contentView}>
            <Input
              name="username"
              control={control}
              rules={{
                required: true,
                pattern: {
                  message: 'You have to fill your username',
                },
              }}
              placeholder="Username"
              style={styles.inputView}
            />
            {errors?.username && (
              <Text
                style={[
                  styles.errorTxt,
                  customTxt(Font.Regular, 12, colors.error).txt,
                ]}>
                You have to fill your username
              </Text>
            )}
            <Input
              name="password"
              secureTextEntry={true}
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
            <TouchableOpacity
              onPress={() =>
                NavigationService.navigate(loginStack.forgotPassword)
              }>
              <Text style={customTxt(Font.Regular, 14, colors.text).txt}>
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
          {!!error && (
            <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
          )}
          <View style={styles.bgBtnView}>
            <TouchableOpacity
              style={styles.btnView}
              onPress={handleSubmit(onSubmit)}
              // onPress={handleSubmit}
            >
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
