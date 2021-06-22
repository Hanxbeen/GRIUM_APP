import React from 'react';
import styled from 'styled-components';
import GText from './GText';

const Wrap = styled.View`
  position: absolute;
  ${props => (props.top ? `top: ${props.top}` : null)}
  ${props => (props.bottom ? `bottom: ${props.bottom}` : null)}
  ${props => (props.left ? `left: ${props.left}` : null)}
  ${props => (props.right ? `right: ${props.right}` : null)}
  background-color: #F75450;
  width: 22px;
  height: 18px;
  border-radius: 13px;
  color: white;
  justify-content: center;
  align-items: center;
  border: 2px solid white;
`;
const Label = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: white;
`;
function Indicator(props) {
  return (
    <Wrap
      top={props.top}
      bottom={props.bottom}
      right={props.right}
      left={props.left}
      style={props.style}>
      <Label>+{props.count}</Label>
    </Wrap>
  );
}

export default Indicator;
