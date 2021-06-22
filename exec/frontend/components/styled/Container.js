import React from 'react';
import styled from 'styled-components/native';

const Wrap = styled.View`
  flex: 1;
  padding: 20;
  padding-top: 0;
  background-color: white;
  align-items: flex-start;
  justify-content: space-between;
`;

function Container(props) {
  return <Wrap>{props.children}</Wrap>;
}

export default Container;
