import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
// Protected routing
// import Navigation from './modules/index';
import TabNavigation from './Tabs';
import AuthNavigation from './modules/auth';
// state manage
import {useRecoilValue} from 'recoil';
import {loginState} from '../atoms';

export default function RootNavigation() {
  const isLogined = useRecoilValue(loginState);

  return (
    <NavigationContainer>
      {isLogined ? <TabNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
}
