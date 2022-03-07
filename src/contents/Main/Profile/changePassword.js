import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import IconSource from '@icons';
import HeaderPhone from 'src/components/header';
import {useForm} from 'react-hook-form';
import {Input} from '@components';
import {customTxt} from '@constants/css';
import Font from '@fonts';
import * as colors from '@colors';
import {post} from '../../../core/utils/apis';

const ChangePasswordScreen = props => {
  const {
    control,
    formState: {errors},
    handleSubmit,
    watch,
  } = useForm();
  const newPassword = useRef({});
  newPassword.current = watch('newPassword', '');

  const [message, setMessage] = useState();
  const onSubmit = async value => {
    setMessage('');
    const data = {
      password: value.password,
      new_password: value.newPassword,
    };

    const res = await post('/account/change_password?', data);
    console.log(res);
    if ((res.code = 400)) {
      setMessage(res.message);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderPhone
        leftIconColor="#F1908C"
        title="Change Password"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#FFF',
        }}
        // rightIcon={<IconSource.ArrowLeftIcon />}
      />
      <TouchableWithoutFeedback
        style={{flex: 1}}
        activeOpacity={1}
        onPress={() => Keyboard.dismiss()}>
        <SafeAreaView style={styles.container}>
          <View style={styles.body}>
            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Current Password:
              </Text>
              <Input
                name="password"
                secureTextEntry={true}
                control={control}
                rules={{
                  required: true,
                }}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
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
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                New Password:
              </Text>
              <Input
                name="newPassword"
                secureTextEntry={true}
                control={control}
                rules={{
                  required: true,
                }}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
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
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                Confirm Password:
              </Text>
              <Input
                name="comfirmPassword"
                control={control}
                secureTextEntry={true}
                rules={{
                  required: true,
                  validate: value =>
                    value === newPassword.current ||
                    'The passwords do not match',
                }}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
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
              {!!message && (
                <Text style={{color: 'red', textAlign: 'center'}}>
                  {message}
                </Text>
              )}

              {/* {!!success && (
                <Text style={{color: 'green', textAlign: 'center'}}>
                  {success}
                </Text>
              )} */}

              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                style={{
                  marginTop: 30,
                  backgroundColor: '#F1908C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  width: 120,
                  borderRadius: 20,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    color: '#FFF',
                    fontFamily: 'Poppins',
                    fontWeight: 'bold',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B77DB',
  },
  body: {
    flex: 1,
  },
});

export default ChangePasswordScreen;
