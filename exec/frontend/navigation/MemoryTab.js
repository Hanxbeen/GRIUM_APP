import React from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Funeral from '../screens/memory/Funeral';
import MyAlbum from '../screens/memory/MyAlbum';
import OpenAlbum from '../screens/memory/OpenAlbum';
import Board from '../screens/memory/Board';
import {theme} from '../constants';
// const {Dimensions} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const MemoryTabs = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          bottom:
            Dimensions.get('window').height -
            Dimensions.get('window').height * 0.43,
          backgroundColor: '#fff',
          borderRadius: 0,
          // left: 8,
          // right: 8,
          height: 55,
          elevation: 1,
          // ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Funeral"
        component={Funeral}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 18,
                width: 90,
                borderBottomColor: '#000',
                borderBottomWidth: focused ? 3 : 0,
              }}>
              {!focused ? (
                <Image
                  // source={require('../assets/essential/funeraldata.png/')}
                  source={require('../assets/user.png/')}
                  resizeMode="contain"
                  style={{
                    width: focused ? 24 : 22,
                    height: focused ? 24 : 22,
                    tintColor: focused ? '#000' : '#0008',
                  }}
                />
              ) : (
                <Text style={{fontSize: 10}}>장례 정보</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="MyAlbum"
        component={MyAlbum}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 18,
                width: 90,
                borderBottomColor: '#000',
                borderBottomWidth: focused ? 3 : 0,
              }}>
              {!focused ? (
                <Image
                  source={require('../assets/essential/gonegallery.png/')}
                  resizeMode="contain"
                  style={{
                    width: focused ? 24 : 22,
                    height: focused ? 24 : 22,
                    tintColor: focused ? '#000' : '#0008',
                  }}
                />
              ) : (
                <Text style={{fontSize: 10}}>고인 앨범</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="OpenAlbum"
        component={OpenAlbum}
        options={{
          visible: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 18,
                width: 90,
                borderBottomColor: '#000',
                borderBottomWidth: focused ? 3 : 0,
              }}>
              {!focused ? (
                <Image
                  source={require('../assets/essential/openalbum.png/')}
                  resizeMode="contain"
                  style={{
                    width: focused ? 24 : 22,
                    height: focused ? 24 : 22,
                    tintColor: focused ? '#000' : '#0008',
                  }}
                />
              ) : (
                <Text style={{fontSize: 10}}>공유 앨범</Text>
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Board"
        component={Board}
        options={{
          visible: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 18,
                width: 90,
                borderBottomColor: '#000',
                borderBottomWidth: focused ? 3 : 0,
              }}>
              {!focused ? (
                <Image
                  source={require('../assets/essential/write.png/')}
                  resizeMode="contain"
                  style={{
                    width: focused ? 24 : 22,
                    height: focused ? 24 : 22,
                    tintColor: focused ? '#000' : '#0008',
                  }}
                />
              ) : (
                <Text style={{fontSize: 10 }}>방명록</Text>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#fff',
    // border: '1px solid'
  },
});
export default MemoryTabs;
