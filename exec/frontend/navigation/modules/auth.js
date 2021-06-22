import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AuthLoadingScreen from '../../screens/start/AuthLoadingScreen';
import Login from '../../screens/start/Login';
import OAuth from '../../screens/start/OAuth';

const Stack = createStackNavigator();

export default function index() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        // headerTitleStyle: {alignSelf: 'center'},
        // headerStyle: {
        //   shadowColor: 'transparent',
        //   elevation: 0,
        // },
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{title: '로그인'}}
      />
      <Stack.Screen name="OAuth" component={OAuth} options={{title: '인증'}} />
    </Stack.Navigator>
  );
}
