import React, {useState} from 'react';
import {Image, TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../../screens/main/Main';
import Frame from '../../screens/memory/Frame';
import {theme} from '../../constants';
import Clipboard from '@react-native-clipboard/clipboard';

import Mind from '../../screens/main/Mind';
import Payment from '../../screens/main/Payment';
import Completed from '../../screens/main/Completed';
import Search from '../../screens/main/Search';

import Alert from '../../screens/addition/sub/Alert';
import AddFriend from '../../screens/addition/sub/AddFriend';
import AddAuth from '../../screens/addition/sub/AddAuth';

import Indicator from '../../components/styled/Indicator';
import AlertModal from '../../components/styled/extended/AlertModal';
// rest api
import * as proposeApi from '../../api/authHttp/propose';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function index() {
  // 공유를 위한 url 복사 부분과, 링크가 복사되었다는 피드백을 위한 모달
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);
  const copyToClipboard = async () => {
    const deadId = await AsyncStorage.getItem('deadId');
    Clipboard.setString(`http://grium.me/memory/${deadId}`);
  };

  const [count, setCount] = useState(null);

  const getAlertCount = async () => {
    try {
      const uid = JSON.parse(await AsyncStorage.getItem('userInfo')).uid;
      const resItems = await proposeApi.getPropose(uid);
      if (resItems.status === 200) {
        if (resItems.data.length > 0) {
          setCount(resItems.data.length);
          console.log(resItems.data.length);
        } else {
          setCount(null);
        }
      }
    } catch (error) {
      console.log('신규 알림 개수 조회 중 error', error);
    }
  };

  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        // headerShown: false,
        headerTitleStyle: {alignSelf: 'center'},
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        listeners={{
          focus: e => {
            const count = getAlertCount();
          },
        }}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Alert')}>
              <Image
                source={require('../../assets/essential/bell.png')}
                style={{
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                  marginRight: theme.sizes.base * 1,
                  marginLeft: theme.sizes.base * 1,
                  tintColor: '#000',
                }}
              />
              {count ? (
                <Indicator
                  top={'-5px'}
                  right={'8px'}
                  bc={'red'}
                  count={count}
                />
              ) : null}
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Image
                source={require('../../assets/essential/search.png')}
                style={styles.condolence}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Frame"
        component={Frame}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                copyToClipboard();
                setAlertModalMessage('공유 링크가 클립보드에 복사되었습니다.');
                setAlertModalState(true);
              }}>
              <Image
                source={require('../../assets/icons/share.png')}
                style={{
                  resizeMode: 'contain',
                  width: 18,
                  height: 18,
                  marginRight: theme.sizes.base * 1,
                  marginLeft: theme.sizes.base * 1,
                  tintColor: '#000',
                }}
              />
              <AlertModal
                state={alertModalState}
                setState={setAlertModalState}
                message={alertModalMessage}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Mind"
        component={Mind}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="Payment"
        component={Payment}
        options={{title: 'PAY'}}
      />
      <Stack.Screen
        name="Completed"
        component={Completed}
        options={{title: '전달성공', headerShown: false}}
      />
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="Alert"
        component={Alert}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="AddFriend"
        component={AddFriend}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 18,
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="AddAuth"
        component={AddAuth}
        options={{title: '추가 권한 요청'}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  condolence: {
    resizeMode: 'contain',
    width: 19,
    height: 19,
    marginRight: theme.sizes.base * 1,
    marginLeft: theme.sizes.base * 1,
  },
});
