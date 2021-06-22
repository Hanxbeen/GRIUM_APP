import React from 'react';
import styled from 'styled-components';

const ImageWrap = styled.View`
  width: ${props => (props.size ? props.size : '100%')};
  height: ${props => (props.size ? props.size : '100%')};
  aspect-ratio: 1;
  padding: 1px;
  border: 1.5px solid black;
  background-color: white;
  border-radius: 200px;
`;
const Image = styled.Image`
  border-radius: 80px;
  resize-mode: cover;
  width: 100%;
  height: 100%;
  border-radius: 200px;
`;

export default function ProfileImage(props) {
  console.log(props);
  return (
    <ImageWrap size={props.size}>
      <Image
        source={
          props.imageUrl !== null
            ? {uri: props.imageUrl}
            : require('../../assets/icons/user.png')
        }
      />
    </ImageWrap>
  );
}
