import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Button,
  TouchableOpacity,
  Keyboard,
  ScrollView,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import NavigationService from '../../../core/utils/navigation';
// import homeStack from './routes';
import AuthImage from '@images/Auth';
import ImageProfile from '@images/Profile';
import AppView from '@utils/appView';
import IconSource from '@icons';
import ImagePicker from 'react-native-image-crop-picker';
import {Input} from '@components';
import {TextInput} from 'react-native-gesture-handler';
import profileStack from './routes';
import {get, put} from '../../../core/utils/apis';
import moment from 'moment';
import {Picker} from '@react-native-picker/picker';
import DatePicker from 'react-native-date-picker';
import HeaderPhone from 'src/components/header';
import Loading from '../../../components/Loading/index';
import {useDispatch} from 'react-redux';
import {saveToken, deleteAllData} from '../Auth/redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen({navigation}) {
  const [userInfo, setUserInfo] = useState();
  const [listHistory, setListHistory] = useState();
  const [listTypeBlood, setListTypeBlood] = useState();
  const [selectedTypeBlood, setSelectedTypeBlood] = useState();
  const [listDistrict, setListDistrict] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [birthDay, setBirthday] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();
  const [loading, setLoading] = useState();
  const [recentDonation, setRecentDonation] = useState();

  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const refRBSheetImage = useRef();
  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      height: 300,
      cropping: true,
    }).then(image => {
      setAvatar(image);
      console.log(avatar);
    });
  };
  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setAvatar(image);
      console.log(avatar);
    });
  };
  const getUserInfo = async () => {
    setLoading(true);
    await get('/account/user/detail_user')
      .then(res => {
        console.log(res);
        setUserInfo(res.user);
        if (res.user.typeBlood != null) {
          setSelectedTypeBlood(res.user?.typeBlood[0]?.id);
        }
        setFullName(res.user?.fullName);
        setEmail(res.user?.email);
        setPhone(res.user?.phone);
        setBirthday(res.user?.birthDay);
        setAvatar(res.user?.avatar);
        setSelectedDistrict(res.user?.district[0]?.id);
        setRecentDonation(res?.recentDonate);
        getPlace(res.user);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const getPlace = async data => {
    try {
      const resPlace = await get('/address/city/get_all');
      if (resPlace.citys?.length > 0) {
        const findItem = resPlace.citys.find(
          e => e.id == data?.district[0]?.city[0]?.id,
        );
        setListDistrict(findItem.district);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserHistory = async () => {
    await get('/blood/register/history')
      .then(res => {
        setListHistory(res.history);
      })
      .catch(err => console.log(err));
  };

  const getTypeBlood = async () => {
    const res = await get('/account/type_blood');
    if (res.results?.length > 0) {
      setListTypeBlood(res.results);
      setSelectedTypeBlood(res?.results[0].id);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    if (avatar.path) {
      const photo = {
        uri: avatar.path,
        type: avatar.mime,
        name: avatar.path.split('/').pop(),
      };
      formData.append('avatar', photo);
    }
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phone', phone);
    if (birthDay != null) {
      formData.append('birthDay', birthDay);
    }
    formData.append('typeBlood', selectedTypeBlood);
    formData.append('district', selectedDistrict);
    // console.log('aaaaaaaaaa', data);
    // const data1 = {
    //   fullName: fullName,
    //   email: email,
    //   phone: phone,
    //   birthDay: birthDay,
    //   typeBlood: selectedTypeBlood,
    // };
    // data.append(data1);
    console.log('hello formData here', formData);
    await fetch('https://blooddonation.xyz/api/v1/account/user/edit', {
      method: 'put',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${global.token}`,
      },
      body: formData,
    })
      .then(res => res.json())
      .then(data => {
        console.log('dataaaaaaaaaaaa', data);
        setUserInfo(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('err', err);
        setLoading(false);
      });
    // await put('/account/user/edit', data)
    //   .then(res => console.log('resssssssssssss', res))
    //   .catch(err => console.log(err));
  };

  const handleData = () => {
    dispatch(deleteAllData());
    AsyncStorage.removeItem('SAVE_TOKEN');
  };
  useEffect(() => {
    // getUserInfo();
    getUserHistory();
    getTypeBlood();
  }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('123');
      getUserInfo();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <SafeAreaView style={styles.container}>
      <HeaderPhone
        isShowLeftIcon={false}
        styleView={{
          backgroundColor: '#FF576E',
        }}
        title="Profile"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#FFF',
        }}
        rightIcon={
          <TouchableOpacity
            style={{position: 'absolute', right: 5, top: 10}}
            onPress={() => {
              NavigationService.navigate(profileStack.changePassword);
            }}>
            <IconSource.SettingIcon style={{marginTop: 10, marginRight: 10}} />
          </TouchableOpacity>
        }
      />
      {loading && <Loading />}
      <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
        <View>
          {/* <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              marginTop: 10,
              color: '#000000',
            }}>
            Profile
          </Text> */}
        </View>

        <ImageBackground
          imageStyle={{borderRadius: 20, marginTop: 20}}
          //   source={require('../../../assets/images/Profile/Rectangle.png')}
          source={{uri: userInfo?.avatar}}
          style={{
            height: 250,
            justifyContent: 'flex-end',
            borderRadius: 20,
          }}>
          <View>
            <View
              style={{
                zIndex: 10,
                paddingHorizontal: 30,
                top: 70,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  fontFamily: 'Poppins',
                  marginBottom: 10,
                }}>
                {userInfo?.fullName}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: '#858484',
                  alignSelf: 'flex-start',
                  width: 70,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 20,
                }}
                onPress={() => refRBSheet.current.open()}>
                <Text
                  style={{color: 'white', fontFamily: 'Poppins', fontSize: 14}}>
                  Edit
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'flex-end',
                top: 50,
                right: 20,
              }}>
              <IconSource.BloodIcon />
              <Text
                style={{
                  position: 'absolute',
                  color: 'white',
                  fontFamily: 'Poppins',
                  fontSize: 18,
                }}>
                {(userInfo?.typeBlood || [])?.length > 0
                  ? userInfo.typeBlood[0]?.name
                  : ''}
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            marginTop: 40,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              fontSize: 18,
              marginBottom: 20,
              color: '#F44B4B',
            }}>
            Information
          </Text>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Email:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>{userInfo?.email}</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Birthday:
            </Text>

            <Text style={{flex: 2, textAlign: 'right'}}>
              {userInfo?.birthDay
                ? moment(userInfo?.birthDay).format('DD-MM-YYYY')
                : 'No data'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              District:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>
              {userInfo?.district[0]?.name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Recent donation:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>
              {recentDonation
                ? moment(recentDonation).format('DD-MM-YYYY')
                : 'No data'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Number Donated:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>
              {userInfo?.numberDonate} times
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => handleData()}
          style={{
            marginTop: 100,
            backgroundColor: '#F1908C',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
            width: 120,
            borderRadius: 20,
            alignSelf: 'center',
            marginBottom: 30,
          }}>
          <Text
            style={{
              color: '#FFF',
              fontFamily: 'Poppins',
              fontWeight: 'bold',
            }}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={AppView.screenHeight - 50}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 100,
            height: 3,
          },
          container: {
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            backgroundColor: '#5B77DB',
          },
        }}>
        {loading && <Loading />}
        <ScrollView>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => Keyboard.dismiss()}>
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={() => refRBSheetImage.current.open()}>
              <View
                style={{
                  position: 'absolute',
                  zIndex: 10,
                  top: 10,
                  right: 20,
                }}>
                <IconSource.CameraIcon />
              </View>
              <Image
                source={{uri: avatar?.path || avatar}}
                style={{
                  width: 300,
                  height: 200,
                  alignSelf: 'center',
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>

            <View style={{paddingHorizontal: 10}}>
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                }}>
                Full Name:
              </Text>
              <TextInput
                value={fullName}
                onChangeText={txt => setFullName(txt)}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                Email:
              </Text>
              <TextInput
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                Phone:
              </Text>
              <TextInput
                value={phone}
                onChangeText={txt => setPhone(txt)}
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                  padding: 10,
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                Birthday:
              </Text>
              <TouchableOpacity onPress={() => setOpen(true)}>
                {/* value={moment(birthDay).format('DD-MM-YYYY')} */}
                {/* onChangeText={txt => setBirthday(txt)} */}
                <View
                  style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 20,
                    padding: 10,
                    height: 50,
                  }}>
                  <Text style={{color: 'black', paddingTop: 5}}>
                    {moment(birthDay).format('DD-MM-YYYY')}
                  </Text>
                </View>
              </TouchableOpacity>

              <DatePicker
                modal
                mode="date"
                open={open}
                date={date}
                onConfirm={date => {
                  setOpen(false);
                  setBirthday(moment(date).format('YYYY-MM-DD'));
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                Type of Blood:
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                }}>
                <Picker
                  selectedValue={selectedTypeBlood}
                  onValueChange={(itemValue, itemIndex) => {
                    const findItem = listTypeBlood?.find(
                      e => e?.id == itemValue,
                    );
                    if (findItem) {
                      setSelectedTypeBlood(itemValue);
                      console.log(selectedTypeBlood);
                    }
                  }}>
                  {listTypeBlood?.map(e => (
                    <Picker.Item key={e.id} label={e?.name} value={e?.id} />
                  ))}
                </Picker>
              </View>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                  marginTop: 10,
                  color: '#FFF',
                }}>
                District:
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  marginBottom: 5,
                  borderRadius: 20,
                }}>
                <Picker
                  selectedValue={selectedDistrict}
                  onValueChange={(itemValue, itemIndex) => {
                    const findItem = listDistrict?.find(
                      e => e?.id == itemValue,
                    );
                    if (findItem) {
                      setSelectedDistrict(findItem?.id);
                    }
                  }}>
                  {listDistrict?.map(e => (
                    <Picker.Item key={e.id} label={e?.name} value={e?.id} />
                  ))}
                </Picker>
              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={{
                  marginTop: 30,
                  backgroundColor: '#F1908C',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  width: 120,
                  borderRadius: 20,
                  alignSelf: 'center',
                  marginBottom: 30,
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
          </TouchableOpacity>
        </ScrollView>
      </RBSheet>
      <RBSheet
        ref={refRBSheetImage}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 100,
            height: 3,
          },
        }}>
        <TouchableOpacity onPress={handleOpenGallery}>
          <Text
            style={{
              alignSelf: 'center',
              paddingVertical: 5,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Select from gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleOpenCamera}>
          <Text
            style={{
              alignSelf: 'center',
              paddingVertical: 5,
              fontWeight: 'bold',
              fontSize: 16,
            }}>
            Select from camera
          </Text>
        </TouchableOpacity>
      </RBSheet>
    </SafeAreaView>
    // <View style={{flex: 1, backgroundColor: 'white', paddingHorizontal: 20}}>

    //   {/* <TouchableOpacity
    //     onPress={() => NavigationService.navigate(homeStack.notification)}>
    //     <Text>Go to notification</Text>
    //   </TouchableOpacity> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
});
