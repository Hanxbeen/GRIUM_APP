import React from 'react';
import styled from 'styled-components/native';

const Container = styled.TouchableOpacity`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '32px'};
  background: ${props => props.backgroundColor || 'black'};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 22.5px;
`;
const Label = styled.Text`
  width: 100%;
  text-align: center;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: bold;
  color: ${props => props.color || 'white'};
`;

function Button(props) {
  return (
    <Container
      onPress={props.onPress}
      backgroundColor={props.backgroundColor}
      width={props.width}
      height={props.height}>
      <Label color={props.color} fontSize={props.fontSize}>
        {props.children}
      </Label>
    </Container>
  );
}

export default Button;
