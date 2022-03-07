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

export default function ForgotPasswordScreen() {
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
    console.log('value :>>zxxxxxxxxxxxx ', value);
    const data = {
      email: value.email,
    };
    console.log(data);
    const res = await post('/forgot_password', data);
    if (res.code == 400) {
      console.log(res);
      setError(res.message);
      setLoading(false);
    } else {
      setError('We have sent you a link to reset your password');
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {loading && <Loading />}
      <TouchableOpacity
        style={{marginTop: 20, marginLeft: 10}}
        onPress={() => NavigationService.goBack()}>
        <IconSource.ArrowLeftIcon stroke="#000" />
      </TouchableOpacity>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <KeyboardAvoidingView
            behavior="position"
            keyboardVerticalOffset={20 + AppView.safeAreaInsets.top}>
            <View>
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
                  Reset password
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
