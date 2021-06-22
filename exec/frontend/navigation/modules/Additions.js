import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {theme} from '../../constants';

// 추가 기능
import Addition from '../../screens/addition/Addition';
import Scrap from '../../screens/addition/sub/Scrap';
import Memory from '../../screens/addition/sub/Memory';
import Alert from '../../screens/addition/sub/Alert';
import MyGrium from '../../screens/addition/sub/MyGrium';
import Setting from '../../screens/addition/sub/Setting';
// 추가 기능의 sub
import AddRelation from '../../screens/addition/sub/AddRelation';
import AddFriend from '../../screens/addition/sub/AddFriend';
import AddAuth from '../../screens/addition/sub/AddAuth';
import Adjust from '../../screens/addition/sub/Adjust';
// 기억공간 미리보기
import Frame from '../../screens/memory/Frame';

const Stack = createStackNavigator();

export default function Additions() {
  return (
    <Stack.Navigator
      initialRouteName="Addition"
      screenOptions={{
        // headerShown: false,
        headerTitleStyle: {alignSelf: 'center'},
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name="Addition"
        component={Addition}
        options={{title: '추가 기능'}}
      />
      <Stack.Screen
        name="Scrap"
        component={Scrap}
        options={{title: '스크랩'}}
      />
      <Stack.Screen
        name="Memory"
        component={Memory}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="Alert"
        component={Alert}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="MyGrium"
        component={MyGrium}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={Setting}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="AddRelation"
        component={AddRelation}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
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
            fontSize: 22,
            // fontWeight: '10',
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
      <Stack.Screen
        name="Adjust"
        component={Adjust}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => <></>,
        })}
      />
      <Stack.Screen
        name="Frame"
        component={Frame}
        options={({navigation, route}) => ({
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerTitleStyle: {alignSelf: 'center', fontSize: 22},
          headerRight: () => (
            <TouchableOpacity onPress={() => {}}></TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  condolence: {
    resizeMode: 'contain',
    width: 22,
    height: 22,
    marginRight: theme.sizes.base * 1,
    marginLeft: theme.sizes.base * 1,
  },
});
