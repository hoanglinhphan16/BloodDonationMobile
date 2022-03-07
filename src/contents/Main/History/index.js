import React, {useEffect, useState} from 'react';
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
import {get} from '../../../core/utils/apis';
import moment from 'moment';

export default function HistoryScreen() {
  // const res = get('/blood/register/history');
  // console.log(res);

  const [listHistory, setListHistory] = useState();
  const getUserHistory = async () => {
    await get('/blood/register/history')
      .then(res => {
        console.log(res);
        setListHistory(res.Data);
        console.log(listHistory);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    getUserHistory();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: AppView.screenWidth,
          height: 150,
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        {/* <ImageBackground style={{width: 300, height: 300, alignSelf: 'center'}}>
          {item.image}
        </ImageBackground> */}
        <TouchableOpacity
          style={{
            paddingHorizontal: 5,
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
          <Text style={styles.title}>
            {(item?.post || [])?.length > 0 ? item?.post[0].title : ''}
          </Text>
          <View style={styles.content}>
            <IconHistory.IconClock color="#F1908C" />
            <Text style={styles.content_text}>
              {(item?.post || [])?.length > 0
                ? moment(item?.post[0].dateDonate).format('DD-MM-YYYY')
                : ''}
            </Text>
          </View>
          <View style={styles.content}>
            <IconHistory.IconLocation />
            <Text style={styles.content_text}>
              {(item?.post || [])?.length > 0
                ? item?.post[0]?.place[0].address
                : ''}
            </Text>
          </View>
          <View style={styles.content}>
            <IconHistory.IconBloodBag />
            <Text style={styles.content_text}>{item.amount}ml</Text>
          </View>
        </TouchableOpacity>
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
        title="History"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#FFF',
        }}
        // rightIcon={<IconSource.ArrowLeftIcon />}
      />
      <FlatList
        data={listHistory}
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
