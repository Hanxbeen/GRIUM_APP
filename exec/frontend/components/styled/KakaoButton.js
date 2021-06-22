import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  background: #fee500;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
`;
const Label = styled.Text`
  flex: 1;
  text-align: center;
  padding-right: 28px;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;
const Icon = styled.Image`
  width: 20px;
  height: 20px;
  margin-left: 16px;
`;

function Button(props) {
  return (
    <Container onPress={props.onPress}>
      <Icon source={require('../../assets/icons/speech-bubble.png')} />
      <Label>{props.children}</Label>
    </Container>
  );
}

export default Button;
