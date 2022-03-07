import React, {useRef, useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
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
import {post, get} from '../../../../core/utils/apis';
import Loading from '../../../../components/Loading/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignupScreen() {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch('password', '');
  const dispatch = useDispatch();

  const [listCity, setListCity] = useState();
  const [listDistrict, setListDistrict] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [loading, setLoading] = useState(false);

  const getAllPlace = async () => {
    try {
      setLoading(true);
      const res = await get('/address/city/get_all');
      console.log(res);

      setListCity(res.citys);
      if (res.citys?.length > 0) {
        setSelectedCity(res?.citys[0]);
        setListDistrict(res?.citys[0]?.district);
        if (res?.citys[0]?.district?.length > 0) {
          setSelectedDistrict(res?.citys[0]?.district[0]);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPlace();
  }, []);

  const onSubmit = async value => {
    setLoading(true);
    // handleData(value);

    const payload = {...value, district: selectedDistrict};
    console.log(payload);
    const data = {
      username: payload.username,
      password: payload.password,
      fullName: payload?.fullName,
      district: payload.district,
      email: payload.email,
      deviceToken: global.deviceToken,
    };
    console.log(payload);
    console.log('====== data la day', data);
    const res = await post('/sign_up', data)
      .then(res => {
        setLoading(false);
        handleData(res);
        global.token = res.access_token;
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleData = value => {
    Promise.all([
      dispatch(saveToken(value.access_token)),
      AsyncStorage.setItem('SAVE_TOKEN', value.access_token),
    ]);
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        {loading && <Loading />}
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <KeyboardAvoidingView
            // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            // behavior="position"
            keyboardVerticalOffset={20 + AppView.safeAreaInsets.top}>
            <TouchableOpacity
              style={{marginTop: 20, marginLeft: 10}}
              onPress={() => NavigationService.goBack()}>
              <IconSource.ArrowLeftIcon stroke="#000" />
            </TouchableOpacity>
            <Image style={styles.header_imgae} source={AuthImage.headerAuth} />
            <View style={styles.contentView}>
              <Input
                name="fullName"
                control={control}
                rules={{
                  required: true,
                }}
                placeholder="Nguyen Van A"
                style={[styles.inputView, styles.mgT30]}
              />
              {errors?.fullName && (
                <Text
                  style={[
                    styles.errorTxt,
                    customTxt(Font.Regular, 12, colors.error).txt,
                  ]}>
                  You have to fill your full name
                </Text>
              )}
              <Input
                name="username"
                control={control}
                rules={{
                  required: true,
                }}
                placeholder="username"
                style={[styles.inputView, styles.mgT30]}
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
              <Picker
                style={[styles.inputView, styles.mgT30]}
                selectedValue={selectedCity}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedCity(itemValue);
                  const findItem = listCity?.find(e => e?.id == itemValue);
                  if (findItem) {
                    setListDistrict(findItem?.district);
                  }
                }}>
                {listCity?.map(e => (
                  <Picker.Item key={e.id} label={e?.name} value={e?.id} />
                ))}
              </Picker>
              <Picker
                style={[styles.inputView, styles.mgT30]}
                selectedValue={selectedDistrict}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedDistrict(itemValue);
                }}>
                {listDistrict?.map(e => (
                  <Picker.Item key={e.id} label={e?.name} value={e?.id} />
                ))}
              </Picker>
              {/* {errors?.email && (
              <Text
                style={[
                  styles.errorTxt,
                  customTxt(Font.Regular, 12, colors.error).txt,
                ]}>
                Not a valid email!
              </Text>
            )} */}
              {/* <Input
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
            )} */}
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
              <Input
                name="comfirmPassword"
                control={control}
                secureTextEntry={true}
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
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    </ScrollView>
  );
}
