import React from 'react';
import styled from 'styled-components/native';
// custom component
import {HightlightTextMR} from './basic/Text';
import FloatView from './FloatView';
import BlankView from './BlankView';
import ButtonDel from './ButtonDel';
import ProfileImage from './ProfileImage';

const Wrap = styled.TouchableOpacity`
  flex-direction: row;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '54px')};
  margin-top: ${props => (props.mt ? props.mt : '0px')}
  margin-bottom : ${props => (props.mb ? props.mb : '0px')}
  background: ${props => (props.bc ? props.bc : 'white')};
  justify-content: center;
  align-items: center;
`;
const Label = styled.Text`
  padding-left: 50px;
  flex: 1;
  height: ${props => (props.height ? props.height : '42px')};
  line-height: ${props => (props.height ? props.height : '42px')};
  font-size: 16px;
  font-weight: bold;
  color: black;
  border: 1px solid #dddddd;
  border-radius: 100px;
`;

export default function UserListItem(props) {
  const onSubmit = target => {
    props.submit(target);
  };

  return (
    <Wrap
      onPress={props.onPress}
      width={props.width}
      height={props.height}
      bc={props.bc}
      mb={props.mb}
      mt={props.mt}
      style={props.style}
      disabled={props.disabled}>
      <BlankView width={'10px'} />
      <FloatView style={{width: '40%', elevation: 20}} left={'0px'}>
        <ProfileImage size={'42px'} imageUrl={props.data.imageUrl} />
      </FloatView>
      <Label>{props.children}</Label>
      {props.delState ? (
        <FloatView right={'0px'}>
          <ButtonDel
            onPress={() => {
              onSubmit(props.data);
            }}
            width={'140px'}
            height={'42px'}
            br={'28px'}
            bc={props.subBc}
            fontSize={'15px'}
            style={{elevation: 3}}>
            {` 기억공간    ≫`}
          </ButtonDel>
        </FloatView>
      ) : null}
    </Wrap>
  );
}
