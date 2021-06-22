import React from 'react';
import {StyleSheet, ScrollView, Dimensions} from 'react-native';
import styled from 'styled-components';
// custom component
import SquareView from '../../../components/styled/SquareView';
import BlankView from '../../../components/styled/BlankView';

export default function Mypage() {
  return (
    <ScrollView style={styles.scrollContainer}>
      <Subtitle>나를 표현해보세요</Subtitle>
      <SquareView label={'기본정보'}>
        <ImageWrap>
          <Image source={require('../../../assets/images/userImage.jpeg')} />
        </ImageWrap>
      </SquareView>
      <SquareView label={'가족관계'}></SquareView>
      <SquareView label={'기타설정'}></SquareView>

      <BlankView height={Platform.OS === 'ios' ? '60px' : '40px'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 0,
    backgroundColor: 'white',
    minHeight: '100%',
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid',
  },
});

// styled
const Subtitle = styled.Text`
  width: 100%;
  height: 16px;
  font-size: 12px;
  font-weight: 100;
  color: gray;
  text-align: center;
  justify-content: center;
`;
const ImageWrap = styled.View`
  width: ${Dimensions.get('window').width * 0.32}px;
  height: ${Dimensions.get('window').width * 0.32}px;
  aspect-ratio: 1;
  padding: 3px;
  border: 1px solid black;
  border-radius: 200px;
`;
const Image = styled.Image`
  border-radius: 80px;
  width: 100%;
  height: 100%;
`;
