import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {View} from 'react-native';
import Relation from '../../screens/regist/Relation_1';
import Info from '../../screens/regist/Info_2';
import Regist from '../../screens/regist/Regist';
import MapSearch from '../../components/styled/extended/MapSearch';

import AddRelation from '../../screens/addition/sub/AddRelation';
import AddAuth from '../../screens/addition/sub/AddAuth';
const Stack = createStackNavigator();

export default function Regists() {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerTitleStyle: {alignSelf: 'center'},
        headerStyle: {
          shadowColor: 'transparent',
          elevation: 0,
        },
      }}>
      <Stack.Screen
        name="Relation"
        component={Relation}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerRight: () => <View></View>,
          headerLeft: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="Info"
        component={Info}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="MapSearch"
        component={MapSearch}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerRight: () => <View></View>,
        }}
      />
      <Stack.Screen
        name="Regist"
        component={Regist}
        options={{
          headerTitle: 'GRIUM',
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: 22,
            // fontWeight: '10',
          },
          headerRight: () => <View></View>,
        }}
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
        name="AddAuth"
        component={AddAuth}
        options={{title: '추가 권한 요청'}}
      />
    </Stack.Navigator>
  );
}
