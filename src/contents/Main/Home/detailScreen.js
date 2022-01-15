import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Alert,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import HeaderPhone from 'src/components/header';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import IconSource from '@icons';
import NavigationService from '@utils/navigation';
import homeStack from './routes';

const DetailScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const address = props.route.params.location;

  const getAPIGoogleMap = async () => {
    const results = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDmBOce43OcGGXH7w_P3_Zs2NO2C1FQShw`,
      {
        method: 'GET',
      },
    );
    const res = await results.json();
    console.log('!!!!', res);
  };

  useEffect(() => {
    getAPIGoogleMap();
  }, []);

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.body}>
        <HeaderPhone
          styleView={{
            backgroundColor: '#FF576E',
          }}
          title="Home"
          leftIconColor="#FFF"
          titleStyle={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontFamily: 'Poppins',
            color: '#FFF',
          }}
          // rightIcon={<IconSource.ArrowLeftIcon />}
        />
        <View style={styles.item_map}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: 16.047079,
              longitude: 108.20623,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
        </View>
        <View style={styles.item_detail}>
          <Text style={styles.item_detail_title}>Date and time</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.item_detail__dateTime}>
              <IconSource.IconCalendar />
              <Text style={styles.item_detail__text}>
                {props.route.params.date}
              </Text>
            </View>
            <View style={styles.item_detail__dateTime}>
              <IconSource.IconClock color="#FFF" />
              <Text style={styles.item_detail__text}>
                {props.route.params.time}
              </Text>
            </View>
          </View>
          <View
            style={{borderBottomWidth: 1, borderBottomColor: '#DAD3D3'}}></View>
          <View>
            <Text style={styles.item_detail__address}>
              {props.route.params.location}
            </Text>
          </View>
          <View>
            <Text style={styles.detail_address}>50 Corinne Cresent</Text>
          </View>
        </View>
        <Pressable
          style={styles.buttonConfirm}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonConfirm_text}>Confirm</Text>
        </Pressable>
        <Modal
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <TouchableWithoutFeedback
            onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <IconSource.HandShake style />
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.textStyle}>
                      Thank you for donating to save a life!!!
                    </Text>
                  </Pressable>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 350,
    height: 200,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  item_map: {
    backgroundColor: '#5B77DB',
    height: 400,
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    overflow: 'hidden',
    marginHorizontal: 20,
  },
  body: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 50,
  },
  item_detail: {
    backgroundColor: '#9AA7D8',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  item_detail_title: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  item_detail__text: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginLeft: 5,
  },
  item_detail__dateTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4864C5',
    padding: 15,
    borderRadius: 20,
    margin: 15,
  },
  item_detail__address: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  detail_address: {
    fontFamily: 'Poppins',
    color: '#FFF',
    marginBottom: 10,
  },
  buttonConfirm: {
    backgroundColor: '#F1908C',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    marginBottom: 20,
  },
  buttonConfirm_text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default DetailScreen;
