import React from 'react';
import styled from 'styled-components';
// custom component
import {HightlightTextMR} from './basic/Text';
import FloatView from './FloatView';
import BlankView from './BlankView';
import ButtonDel from './ButtonDel';
import ProfileImage from './ProfileImage';

const Wrap = styled.TouchableOpacity`
  flex-direction: row;
  width: ${props => (props.width ? props.width : '100%')};
  height: ${props => (props.height ? props.height : '45px')};
  margin-top: ${props => (props.mt ? props.mt : '0px')}
  margin-bottom : ${props => (props.mb ? props.mb : '0px')}
  background: ${props => (props.bc ? props.bc : 'white')};
  justify-content: center;
  align-items: center;
`;
const Item = styled.View`
  flex: 1;
  padding: 0px 15px;
  height: ${props => (props.height ? props.height : '56px')};
  line-height: ${props => (props.height ? props.height : '56px')};
  border: 1px solid #dddddd;
  justify-content: center;
  border-radius: 10px;
`;
const Address = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
`;
const Name = styled.Text`
  font-size: 14px;
  color: black;
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
      style={props.style}>
      <Item>
        <Address>{props.data.name}</Address>
        <Name>{props.data.road}</Name>
      </Item>

      {/* {props.delState ? (
        <FloatView right={'0px'}>
          <ButtonDel
            onPress={() => {
              onSubmit(props.data);
            }}
            width={'140px'}
            height={'52px'}
            br={'28px'}
            bc={props.subBc}
            fontSize={'15px'}
            style={{elevation: 7}}>
            {` 기억공간    ≫`}
          </ButtonDel>
        </FloatView>
      ) : null} */}
    </Wrap>
  );
}
