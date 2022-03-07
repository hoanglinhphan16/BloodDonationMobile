import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import NavigationService from '../../../core/utils/navigation';
import homeStack from './routes';
import IconHistory from 'src/assets/icons/History';
import AppView from '@utils/appView';
import HeaderPhone from 'src/components/header';
import {get} from '../../../core/utils/apis';
import moment from 'moment';
import Loading from '@components/Loading/index';

export default function HomeScreen() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllPosts = async () => {
    setLoading(true);
    await get('/blood/post')
      .then(res => {
        setData(res.results);
        console.log(res.results);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(true);
      });
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  const renderItem = ({item}) => {
    return (
      <View>
        {/* <ImageBackground style={{width: 300, height: 300, alignSelf: 'center'}}>
          {item.image}
        </ImageBackground> */}
        <View
          style={{
            borderRadius: 20,
            marginTop: 20,
            marginHorizontal: 20,
            backgroundColor: '#FFF',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0,
            shadowRadius: 4.65,

            elevation: 8,
          }}>
          <Image
            source={{uri: item.imageUrl}}
            style={{
              resizeMode: 'stretch',
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
              // alignItems: 'center',
              borderBottomEndRadius: 20,
              borderBottomStartRadius: 20,
              padding: 10,
              backgroundColor: '#F1F5FC',
            }}>
            <View
              style={{
                flexDirection: 'row',
                // width: 100,
                // alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#F1908C',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    width: 110,
                    textAlign: 'center',
                    borderRadius: 10,
                    paddingVertical: 10,
                    fontSize: 30,
                    fontWeight: 'bold',
                    color: '#FFF',
                  }}>
                  {moment(item.dateDonate).format('DD')}
                </Text>

                <View
                  style={{
                    borderBottomColor: '#FFF',
                    borderBottomWidth: 0.5,
                    backgroundColor: '#f28e6f',
                    width: '100%',
                  }}></View>
                <Text
                  style={{
                    paddingVertical: 15,
                    textAlign: 'center',
                    color: '#FFF',
                    fontWeight: 'bold',
                  }}>
                  Tháng {moment(item.dateDonate).format('MM')}
                </Text>
              </View>
              <View
                style={{flex: 1, flexDirection: 'column', paddingRight: 15}}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginLeft: 5,
                  }}>
                  <IconHistory.IconInfo />
                  <Text
                    style={{
                      fontSize: 15,
                      marginLeft: 5,
                      fontWeight: 'bold',
                    }}>
                    {item?.title}
                  </Text>
                </View>
                <View style={{flex: 1, flexDirection: 'row', marginLeft: 5}}>
                  <IconHistory.IconLocation />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    {item.place[0].address}
                  </Text>
                </View>
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
                  backgroundColor: '#F1908C',
                  width: '100%',
                  alignItems: 'center',
                  padding: 10,
                  borderRadius: 10,
                }}>
                <Text style={{fontWeight: 'bold', color: '#FFF', fontSize: 16}}>
                  Infomation
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loading />}
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
        data={data}
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
