import React from 'react';
import styled from 'styled-components';

const ActiveWrap = styled.TouchableOpacity`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '45px')};
  margin-top: ${props => (props.mt ? props.mt : '0px')}
  margin-bottom : ${props => (props.mb ? props.mb : '0px')}
  margin-right : ${props => (props.mr ? props.mr : '0px')}
  margin-left : ${props => (props.ml ? props.ml : '0px')}
  background: ${props => (props.bc ? props.bc : 'black')};
  justify-content: center;
  align-items: center;
  border-radius: 10px;
${props => (props.elevation ? `elevation : ${props.elevation}` : null)}
`;
const PassiveWrap = styled.TouchableOpacity`
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '45px')};
  margin-top: ${props => (props.mt ? props.mt : '0px')}
  margin-bottom : ${props => (props.mb ? props.mb : '0px')}
  margin-right : ${props => (props.mr ? props.mr : '0px')}
  margin-left : ${props => (props.ml ? props.ml : '0px')}
  background: ${props => (props.bc ? props.bc : 'white')};
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 10px;
${props => (props.elevation ? `elevation : ${props.elevation}` : null)}
`;
const PassiveLabel = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : `16px`)};
  font-weight: bold;
  color: black;
`;
const ActiveLabel = styled.Text`
  font-size: ${props => (props.fontSize ? props.fontSize : `16px`)};
  font-weight: bold;
  color: white;
`;

function Button(props) {
  return props.active ? (
    <ActiveWrap
      onPress={props.onPress}
      width={props.width}
      height={props.height}
      bc={props.bc}
      mb={props.mb}
      mt={props.mt}
      mr={props.mr}
      ml={props.ml}
      style={props.style}>
      <ActiveLabel fontSize={props.fs}>{props.children}</ActiveLabel>
    </ActiveWrap>
  ) : (
    <PassiveWrap
      onPress={props.onPress}
      width={props.width}
      height={props.height}
      bc={props.bc}
      mb={props.mb}
      mt={props.mt}
      mr={props.mr}
      ml={props.ml}
      style={props.style}>
      <PassiveLabel fontSize={props.fs}>{props.children}</PassiveLabel>
    </PassiveWrap>
  );
}

export default Button;
