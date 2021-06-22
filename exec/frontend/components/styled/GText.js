import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
width:${props => props.width || 'auto'}
height: ${props => props.height || '32px'}
marginTop: ${props => props.marginTop || '0px'}
marginBottom: ${props => props.marginBottom || '0px'}
justify-content: center;
`;

const Label = styled.Text`
  align-items: center;
  font-size: ${props => props.fontSize || '16px'};
  font-weight: ${props => props.fontWeight || 'normal'};
  color: ${props => props.color || 'black'};
`;

function GText(props) {
  return (
    <Container
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      style={props.style}
      width={props.width}
      height={props.height}>
      <Label
        fontSize={props.fontSize}
        fontWeight={props.fontWeight}
        color={props.color}>
        {props.children}
      </Label>
    </Container>
  );
}

export default GText;
