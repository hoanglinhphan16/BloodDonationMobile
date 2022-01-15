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
import historyStack from './routes';
import AppView from '@utils/appView';
import IconHistory from 'src/assets/icons/History';
import HeaderPhone from 'src/components/header';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Hien mau lan 1',
    dateDonate: '03/05/2021',
    location: 'Da Nang',
    amount: '350ml',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Hien mau lan 2',
    dateDonate: '03/06/2021',
    location: 'Da Nang1',
    amount: '250ml',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Hien mau lan 3',
    dateDonate: '03/04/2021',
    location: 'Da Nang2',
    amount: '150ml',
  },
];

export default function NotificationScreen() {
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: AppView.screenWidth,
          height: 150,
          paddingHorizontal: 20,
        }}>
        {/* <ImageBackground style={{width: 300, height: 300, alignSelf: 'center'}}>
          {item.image}
        </ImageBackground> */}
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(historyStack.detail, item);
          }}
          style={{
            backgroundColor: '#506EDA',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
          }}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.content}>
            <IconHistory.IconClock />
            <Text style={styles.content_text}>{item.dateDonate}</Text>
          </View>
          <View style={styles.content}>
            <IconHistory.IconLocation />
            <Text style={styles.content_text}>{item.location}</Text>
          </View>
          <View style={styles.content}>
            <IconHistory.IconBloodBag />
            <Text style={styles.content_text}>{item.amount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderPhone
        isShowLeftIcon={false}
        title="Notification"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#000',
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
    backgroundColor: '#FFF',
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
