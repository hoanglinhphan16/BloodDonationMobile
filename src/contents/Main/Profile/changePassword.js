import React from 'react';
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

const ChangePasswordScreen = props => {
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
                Old Password:
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
                  color: '#FFF',
                }}>
                New Password:
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
                  color: '#FFF',
                }}>
                Confirm Password:
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
