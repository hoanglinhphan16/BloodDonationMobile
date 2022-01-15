import React, {useRef} from 'react';
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

export default function ProfileScreen() {
  const refRBSheet = useRef();
  const refRBSheetImage = useRef();
  const handleOpenGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  const handleOpenCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };
  const renderItem = ({item}) => {
    return (
      <View>
        {/* <ImageBackground style={{width: 300, height: 300, alignSelf: 'center'}}>
          {item.image}
        </ImageBackground> */}
        <View style={{borderRadius: 20, marginHorizontal: 20}}>
          <Image
            source={item.image}
            style={{
              resizeMode: 'contain',
              width: AppView.screenWidth - 40,
              height: undefined,
              aspectRatio: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <View
            style={{
              // width: 100,
              backgroundColor: 'red',
              // alignItems: 'center',
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
                // width: 100,
                backgroundColor: 'red',
                // alignItems: 'center',
              }}>
              <View
                style={{
                  width: 100,
                  paddingVertical: 5,
                  backgroundColor: 'yellow',
                  borderRadius: 10,
                }}>
                <Text>{item.des}</Text>
                <Text>{item.title}</Text>
                <View
                  style={{
                    borderBottomColor: 'red',
                    borderBottomWidth: 0.5,
                    marginVertical: 10,
                    width: '100%',
                  }}></View>
                <Text>fsdf</Text>
              </View>
              <View>
                <Text>Hello</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  marginTop: 10,
                  backgroundColor: 'white',
                  width: '100%',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text>Button</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{paddingHorizontal: 10, backgroundColor: 'white'}}>
        <View>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: 'Poppins',
              marginTop: 10,
              color: '#000000',
            }}>
            Profile
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 5, top: 10}}
            onPress={() => {
              NavigationService.navigate(profileStack.changePassword);
            }}>
            <IconSource.SettingIcon style={{alignSelf: 'flex-end'}} />
          </TouchableOpacity>
        </View>

        <ImageBackground
          //   source={require('../../../assets/images/Profile/Rectangle.png')}
          source={ImageProfile.headerProfile}
          resizeMode="contain"
          style={{
            height: 300,
            justifyContent: 'flex-end',
          }}>
          <View>
            <View
              style={{
                zIndex: 20,
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  fontFamily: 'Poppins',
                  marginBottom: 20,
                }}>
                Adeniji Samuel
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
                top: 5,
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
                A+
              </Text>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            borderRadius: 10,
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
            <Text style={{flex: 2, textAlign: 'right'}}>
              hoanglinhphan16@gmail.com
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Birthday:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>06/01/1999</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Recent donation:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>20/11/2021</Text>
          </View>
          <View style={{flexDirection: 'row', marginHorizontal: 10, margin: 5}}>
            <Text style={{flex: 1, fontWeight: 'bold', color: '#413F89'}}>
              Count:
            </Text>
            <Text style={{flex: 2, textAlign: 'right'}}>5 times</Text>
          </View>
        </View>
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
            backgroundColor: '#AFDEDE',
          },
        }}>
        <TouchableOpacity activeOpacity={1} onPress={() => Keyboard.dismiss()}>
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
              source={ImageProfile.headerProfile}
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
                color: '#F44B4B',
                fontSize: 14,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              Full Name:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 20,
                padding: 10,
              }}></TextInput>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                marginTop: 10,
                color: '#F44B4B',
              }}>
              Email:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 20,
                padding: 10,
              }}></TextInput>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Poppins',
                fontWeight: 'bold',
                marginTop: 10,
                color: '#F44B4B',
              }}>
              Birthday:
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                marginBottom: 5,
                borderRadius: 20,
                padding: 10,
              }}></TextInput>
            <TouchableOpacity
              style={{
                marginTop: 30,
                backgroundColor: '#FFF',
                justifyContent: 'center',
                alignItems: 'center',
                paddingVertical: 10,
                width: 120,
                borderRadius: 20,
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  color: '#F44B4B',
                  fontFamily: 'Poppins',
                  fontWeight: 'bold',
                }}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
