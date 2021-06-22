import React from 'react';
import styled from 'styled-components/native';

const Wrap = styled.View`
  position: absolute;
  ${props => (props.top ? `top: ${props.top}` : null)}
  ${props => (props.bottom ? `bottom: ${props.bottom}` : null)}
  ${props => (props.left ? `left: ${props.left}` : null)}
  ${props => (props.right ? `right: ${props.right}` : null)}
`;

function FloatView(props) {
  return (
    <Wrap
      top={props.top}
      bottom={props.bottom}
      right={props.right}
      left={props.left}
      style={props.style}>
      {props.children}
    </Wrap>
  );
}

export default FloatView;
