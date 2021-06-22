import React from 'react';
import styled from 'styled-components/native';

const Blank = styled.View`
  width:${props => props.width || '100%'}
  height: ${props => props.height || '32px'}
  background-color: ${props => props.backgroundColor || 'white'};
  margin-left: ${props => props.marginLeft || '0'}
  margin-right: ${props => props.marginRight || '0'}
`;

function BlankView(props) {
  return (
    <Blank
      width={props.width}
      height={props.height}
      marginLeft={props.ml}
      marginRight={props.mr}
      backgroundColor={props.bc}
      backgroundColor={props.backgroundColor}></Blank>
  );
}

export default BlankView;
