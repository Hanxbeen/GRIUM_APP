import React from 'react';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import styled from 'styled-components';
import Button from '../../components/styled/Button';

const Container = styled.View`
  width: 100%;
  height: 100%;
  padding: 30px;
  background-color: white;
`;
const SubContianer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const BottomContainer = styled.View`
  height: 45px;
  width: 100%;
`;
const ImageWrap = styled.View`
  width: ${Dimensions.get('window').width * 0.5}px;
  height: ${Dimensions.get('window').width * 0.5}px;
  padding: 30px;
  border-radius: 200px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const Label = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: bold;
`;
const Blank = styled.View`
  width: ${props => props.width || 0}
  height: ${props => props.height || 0}
`;

export default function Completed({navigation}) {
  return (
    <Container>
      <SubContianer>
        <ImageWrap>
          <Image source={require('../../assets/images/black-ribbon.png')} />
        </ImageWrap>
        <Blank height={'30px'} />
        <Label>당신의 마음, 전해주셔서 감사합니다.</Label>
      </SubContianer>
      <BottomContainer style={styles.BottomButtom}>
        <Button
          onPress={() => {
            navigation.pop(3);
          }}>
          기억공간으로 돌아가기
        </Button>
      </BottomContainer>
    </Container>
  );
}

const styles = StyleSheet.create({
  BottomButtom: {
    width: '100%',
    height: 45,
    marginBottom: Platform.OS === 'ios' ? 60 : 30,
  },
});
