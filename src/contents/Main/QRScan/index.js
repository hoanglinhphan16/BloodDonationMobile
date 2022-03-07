import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import NavigationService from '../../../core/utils/navigation';
// import homeStack from './routes';
import AppView from '@utils/appView';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {get} from '../../../core/utils/apis';
import {showMessage} from 'react-native-flash-message';

export default function ScanScreen() {
  const onSuccess = async e => {
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err),
    // );

    try {
      console.log(e);
      const res = await get(`/blood/post/${e.data}/scan_qr_code`);
      console.log(res);
      if (res.message) {
        showMessage({
          message: 'Thanks for your donation. Wish you have a good day!',
          backgroundColor: '#F1908C',
          // icon: 'info',
          duration: 10000,
          hideStatusBar: true,
          titleStyle: {fontWeight: 'bold', fontSize: 15},
          style: {borderBottomRightRadius: 10, borderBottomLeftRadius: 10},
          onPress: () => {
            NavigationService.navigate(homeStack.detail, post);
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // return <Text>123</Text>;

  return (
    <QRCodeScanner
      onRead={onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      //   <Text style={styles.centerText}>
      //     Please scan the qr code provided by the voluntary blood donation
      //     organization
      //   </Text>
      // }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable}>
      //     <Text style={styles.buttonText}>OK. Got it!</Text>
      //   </TouchableOpacity>
      // }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
