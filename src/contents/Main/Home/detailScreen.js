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
  Image,
} from 'react-native';
import HeaderPhone from 'src/components/header';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import IconSource from '@icons';
import NavigationService from '@utils/navigation';
import homeStack from './routes';
import moment from 'moment';
import {post} from '../../../core/utils/apis';
import AppView from '@utils/appView';

const DetailScreen = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAmount, setSetlectedAmount] = useState('');
  const [error, setError] = useState(false);

  console.log('ROUTEPARAMSSSSS', props?.route?.params);

  const handleSubmit = async () => {
    setError(false);
    const data = {
      amount: selectedAmount,
      post: props.route.params.id,
    };
    console.log(data);
    const res = await post('/blood/register', data);
    if (res.code == 400) {
      setError(res.message);
    } else {
      console.log(res);
      setModalVisible(true);
    }
  };

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
        <View style={{marginTop: 30}}>
          <Image
            source={{uri: props?.route?.params?.imageUrl}}
            style={{
              resizeMode: 'stretch',
              width: AppView.screenWidth - 40,
              height: undefined,
              aspectRatio: 1,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginLeft: 20,
            }}
          />
        </View>
        <View>
          <Text style={styles.item_title}>{props?.route?.params?.title}</Text>
          <Text style={styles.item_description}>
            {props?.route?.params?.description}
          </Text>
        </View>
        <View style={styles.item_map}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: +props?.route?.params?.place[0]?.lat || 16.073862,
              longitude: +props?.route?.params?.place[0]?.long || 108.149889,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <Marker
              coordinate={{
                latitude: +props?.route?.params?.place[0]?.lat || 16.073862,
                longitude: +props?.route?.params?.place[0]?.long || 108.149889,
              }}
            />
          </MapView>
        </View>
        <View style={styles.item_detail_amount}>
          <Text style={styles.item_detail_title_amount}>
            Amount of donated blood
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <TouchableOpacity
              onPress={() => setSetlectedAmount('250')}
              style={
                selectedAmount === '250'
                  ? styles.item_detail__amount
                  : styles.item_detail__amount_selected
              }>
              <IconSource.IconBloodBag />
              <Text
                style={
                  selectedAmount === '250'
                    ? styles.item_detail__text
                    : styles.item_detail__text_selected
                }>
                250ml
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setSetlectedAmount('350')}
              style={
                selectedAmount === '350'
                  ? styles.item_detail__amount
                  : styles.item_detail__amount_selected
              }>
              <IconSource.IconBloodBag />
              <Text
                style={
                  selectedAmount === '350'
                    ? styles.item_detail__text
                    : styles.item_detail__text_selected
                }>
                350ml
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {!!error && (
          <Text style={{color: 'red', textAlign: 'center'}}>{error}</Text>
        )}
        <View style={styles.item_detail}>
          <Text style={styles.item_detail_title}>Date and time</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View style={styles.item_detail__dateTime}>
              <IconSource.IconCalendar />
              <Text style={styles.item_detail__text}>
                {moment(props.route.params.dateDonate).format('DD-MM-YYYY')}
              </Text>
            </View>
            <View style={styles.item_detail__dateTime}>
              <IconSource.IconClock color="#FFF" />
              <Text style={styles.item_detail__text}>
                {moment(props.route.params.dateDonate).format('hh:mm')}
              </Text>
            </View>
          </View>
          <View
            style={{borderBottomWidth: 1, borderBottomColor: '#DAD3D3'}}></View>
          <View>
            <Text style={styles.detail_address}>
              {props.route.params.place[0].description}
            </Text>
          </View>
          <View>
            <Text style={styles.item_detail__address}>
              {props.route.params.place[0].address}
            </Text>
          </View>
        </View>
        <Pressable
          style={styles.buttonConfirm}
          // onPress={() => setModalVisible(true)}
          onPress={() => {
            handleSubmit();
          }}>
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
  item_title: {
    paddingHorizontal: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f0736e',
  },
  item_description: {
    paddingHorizontal: 20,
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
    marginTop: 5,
    marginBottom: 5,
    fontSize: 16,
  },
  detail_address: {
    fontFamily: 'Poppins',
    color: '#FFF',
    marginTop: 5,
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
  item_detail_amount: {
    backgroundColor: '#F1908C',
    marginHorizontal: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  item_detail_title_amount: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFF',
    textAlign: 'center',
    marginTop: 10,
  },
  item_detail__amount: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 20,
    margin: 15,
  },

  item_detail__amount_selected: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0736e',
    padding: 15,
    borderRadius: 20,
    margin: 15,
  },
  item_detail__text_selected: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginLeft: 5,
  },
});

export default DetailScreen;
