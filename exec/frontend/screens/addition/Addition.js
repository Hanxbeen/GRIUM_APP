import React, {Component} from 'react';
import {ScrollView, StyleSheet, Dimensions} from 'react-native';
import styled from 'styled-components';

import SquareButton from '../../components/styled/SquareButton';

const Row = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  margin: ${Dimensions.get('window').width * 0.02}px 0;
`;

export default function Addition({navigation}) {
  return (
    <ScrollView style={styles.container}>
      <Row>
        <SquareButton
          width={44}
          onPress={() => {
            navigation.navigate('Memory');
          }}
          source={require('../../assets/icons/memory.png')}>
          기억 공간
        </SquareButton>
        <SquareButton
          width={44}
          onPress={() => {
            navigation.navigate('Alert');
          }}
          source={require('../../assets/icons/alert.png')}>
          알림
        </SquareButton>
      </Row>
      <Row>
        <SquareButton
          width={44}
          onPress={() => {
            navigation.navigate('MyGrium');
          }}
          source={require('../../assets/icons/my-grium.png')}>
          나의 그리움
        </SquareButton>
        <SquareButton
          width={44}
          onPress={() => {
            navigation.navigate('Setting');
          }}
          source={require('../../assets/icons/setting.png')}>
          설정
        </SquareButton>
      </Row>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
    paddingTop: Dimensions.get('window').width * 0.015,
  },
});
