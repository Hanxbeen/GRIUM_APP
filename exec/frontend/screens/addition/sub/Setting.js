import React, {useState} from 'react';
import {View, StyleSheet, Platform, Switch} from 'react-native';
import styled from 'styled-components';
import ButtonRadius from '../../../components/styled/ButtonRadius';
import GText from '../../../components/styled/GText';
import BlankView from '../../../components/styled/BlankView';
import {StackActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// recoil state
import {useResetRecoilState} from 'recoil';
import {tokenState, jwtState} from '../../../atoms';

// kakaoLogin api
import _ from 'lodash';

export default function Setting({navigation}) {
  const [isEnabled, setIsEnabled] = useState(true); //bgmState
  const toggleSwitch = async isEnabled => {
    try {
      setIsEnabled(previousState => !previousState);
      if (isEnabled) {
        await AsyncStorage.setItem('bgmState', '1');
      } else {
        await AsyncStorage.setItem('bgmState', '0');
      }
    } catch (error) {
      alert(error);
    }
  };
  const [isEnabled2, setIsEnabled2] = useState(true); //alertState
  const toggleSwitch2 = async isEnabled2 => {
    try {
      setIsEnabled2(previousState => !previousState);
      if (isEnabled2) {
        await AsyncStorage.setItem('alertState', '1');
      } else {
        await AsyncStorage.setItem('alertState', '0');
      }
    } catch (error) {
      alert(error);
    }
  };
  const [modalVisible, setModalVisible] = useState(false);

  const resetToken = useResetRecoilState(tokenState);
  const resetJwt = useResetRecoilState(jwtState);
  const griumLogout = async navigation => {
    try {
      // async 비우기
      await AsyncStorage.clear();
      await AsyncStorage.setItem('bgmState', '1');
      await AsyncStorage.setItem('alertState', '1');
      // recoil 비우기
      resetToken();
      resetJwt();
      navigation.dispatch(StackActions.popToTop());
    } catch (error) {
      alert(error);
    }
  };

  const init = async () => {
    const bgmState = await AsyncStorage.getItem('bgmState');
    const alertState = await AsyncStorage.getItem('alertState');
    if (bgmState === '1') setIsEnabled(true);
    else setIsEnabled(false);
    if (alertState === '1') setIsEnabled2(true);
    else setIsEnabled2(false);
  };
  React.useEffect(() => {
    init();
  }, []);

  return (
    <View style={styles.container}>
      <Row>
        <GText color={'gray'}>{`GRIUM 서비스에서 로그아웃 >`}</GText>
        <ButtonRadius
          onPress={() => {
            griumLogout(navigation);
            alert('로그아웃 되었습니다.');
          }}
          color={'white'}
          backgroundColor={'black'}
          width={'74px'}
          height={'22px'}
          fontSize={'12px'}>
          로그아웃
        </ButtonRadius>
      </Row>
      <BlankView height={Platform.OS === 'ios' ? '60px' : '40px'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  // modal
  modalView: {
    margin: 20,
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    backgroundColor: '#33333333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

const Row = styled.View`
  width: 100%;
  height: 60px;
  padding: 0;
  margin-bottom: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const FloatWrap = styled.View`
  position: absolute;
  top: -11px;
  left: 0;
`;
