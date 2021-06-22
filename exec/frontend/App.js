// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {RecoilRoot} from 'recoil';
// root navigation
import RootNavgation from './navigation/RootNavigation';

export default function App() {
  return (
    <RecoilRoot>
      <RootNavgation />
    </RecoilRoot>
  );
}
