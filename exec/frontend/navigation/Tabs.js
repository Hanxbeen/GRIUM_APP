import React from 'react';
import {StyleSheet, View, Image, Platform} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import index from './modules/index';
import Additions from './modules/Additions';
import Regists from './modules/Regists';
import {CommonActions, StackActions} from '@react-navigation/native';
// import Map from '../screens/regist/Map';

const TAB_TO_RESET = ['index', 'Regists', 'Additions'];
const resetHomeStackOnTabPress = ({navigation, route}) => ({
  tabPress: e => {
    const state = navigation.dangerouslyGetState();

    if (state) {
      // Grab all the tabs that are NOT the one we just pressed
      const nonTargetTabs = state.routes.filter(r => r.key !== e.target);

      nonTargetTabs.forEach(tab => {
        // Find the tab we want to reset and grab the key of the nested stack
        const tabName = tab?.name;
        const stackKey = tab?.state?.key;

        console.log('tabName', tabName);
        console.log('stackKey', stackKey);
        console.log('and', stackKey && tabName);

        if (TAB_TO_RESET.indexOf(stackKey && tabName) !== -1) {
          // Pass the stack key that we want to reset and use popToTop to reset it
          navigation.dispatch({
            ...StackActions.popToTop(),
            target: stackKey,
          });
        }
      });
    }
  },
});

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="index"
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
        style: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          // elevation: 5,
          backgroundColor: '#000',
          borderRadius: 0,
          height: Platform.OS === 'ios' ? 70 : 45,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="index"
        component={index}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/essential/home.png/')}
                resizeMode="contain"
                style={{
                  width: focused ? 22 : 20,
                  height: focused ? 22 : 20,
                  tintColor: '#fff',
                }}
              />
              {/* <Text style={{marginTop: 10}}>피드</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Regists"
        component={Regists}
        listeners={resetHomeStackOnTabPress}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/essential/regist.png/')}
                resizeMode="contain"
                style={{
                  width: focused ? 32 : 30,
                  height: focused ? 32 : 30,
                  tintColor: '#fff',
                }}
              />
              {/* <Text style={{marginTop: 10}}>신청</Text> */}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Additions"
        component={Additions}
        listeners={resetHomeStackOnTabPress}
        options={{
          visible: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../assets/essential/menu.png/')}
                resizeMode="contain"
                style={{
                  width: focused ? 20 : 18,
                  height: focused ? 20 : 18,
                  tintColor: '#fff',
                }}
              />
              {/* <Text style={{marginTop: 10}}>기능</Text> */}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default Tabs;
