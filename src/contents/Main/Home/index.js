import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  ImageBackground,
  Button,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigationService from '../../../core/utils/navigation';
import homeStack from './routes';
import AuthImage from '@images/Auth';
import AppView from '@utils/appView';
import HeaderPhone from 'src/components/header';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
    image: AuthImage.headerAuth,
    des: 'hhihihihhihih',
    location: 'Da Nang',
    date: '03/12/2021',
    time: '15h30',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
    image: AuthImage.headerAuth,
    des: 'hhihihihhihih',
    location: 'Binh Dinh',
    date: '03/10/2021',
    time: '9h',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
    image: AuthImage.headerAuth,
    des: 'hhihihihhihih',
    location: 'Ha Noi',
    date: '03/11/2021',
    time: '12h',
  },
];

export default function HomeScreen() {
  const renderItem = ({item}) => {
    return (
      <View>
        {/* <ImageBackground style={{width: 300, height: 300, alignSelf: 'center'}}>
          {item.image}
        </ImageBackground> */}
        <View style={{borderRadius: 20, marginTop: 10, marginHorizontal: 20}}>
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
                <Text>{item.location}</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  NavigationService.navigate(homeStack.detail, item);
                }}
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
      <HeaderPhone
        isShowLeftIcon={false}
        styleView={{
          backgroundColor: '#FF576E',
        }}
        title="Home"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#FFF',
        }}
        // rightIcon={<IconSource.ArrowLeftIcon />}
      />
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
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
  container: {
    flex: 1,
  },
  title: {
    margin: 5,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flexDirection: 'row',
    margin: 5,
  },
  content_text: {
    marginLeft: 5,
    color: '#FFF',
  },
});
