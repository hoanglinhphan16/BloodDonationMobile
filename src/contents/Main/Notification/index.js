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
import homeStack from '../Home/routes';
import AppView from '@utils/appView';
import IconHistory from 'src/assets/icons/History';
import HeaderPhone from 'src/components/header';
import {get} from '../../../core/utils/apis';
import moment from 'moment';
import Loading from '@components/Loading/index';

export default function NotificationScreen() {
  const [notification, setNotification] = useState();
  const [loading, setLoading] = useState(false);
  const getNotifications = async () => {
    setLoading(true);
    try {
      await get('/blood/notification?user=1').then(res => {
        setNotification(res.results);
        setLoading(false);
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getNotifications();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          width: AppView.screenWidth,
          paddingHorizontal: 20,
          marginTop: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            NavigationService.navigate(homeStack.detail, item.post);
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
          <View style={styles.content}>
            <IconHistory.IconClock color="#F1908C" />
            <Text style={styles.title}>
              {moment(item.created_at).format('hh:mm DD-MM-YYYY')}
            </Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
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
        title="Notification"
        titleStyle={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontFamily: 'Poppins',
          color: '#FFF',
        }}
        // rightIcon={<IconSource.ArrowLeftIcon />}
      />
      {loading && <Loading />}
      <FlatList
        data={notification}
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
    alignItems: 'center',
    margin: 5,
  },
  content_text: {
    marginLeft: 5,
    color: '#FFF',
  },
});
