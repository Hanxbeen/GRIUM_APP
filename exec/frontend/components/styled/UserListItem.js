import React from 'react';
import {Text} from 'react-native';
import styled from 'styled-components/native';
import moment from 'moment';
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
  padding-left: ${props => (props.imageUrl !== undefined ? '50px' : '20px')};
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
  console.log(props.data);
  const getBirth = () => {
    return moment(props.data.birthday, 'MMDD').format('MM월 DD일');
  };

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
      {props.data.imageUrl !== undefined ? (
        <>
          <BlankView width={'10px'} />
          <FloatView style={{width: '40%', elevation: 20}} left={'0px'}>
            <ProfileImage size={'42px'} imageUrl={props.data.imageUrl} />
          </FloatView>
        </>
      ) : null}
      <Label imageUrl={props.data.imageUrl}>{props.children}</Label>
      <FloatView>
        <Text
          style={
            !props.data.birthday
              ? {color: '#aaa', fontWeight: 'bold'}
              : {fontWeight: 'bold'}
          }>
          {props.data.birthday ? `   -   ${getBirth()}` : `   -   생일 미설정`}
        </Text>
      </FloatView>
      {props.delState ? (
        <FloatView right={'0px'}>
          <ButtonDel
            onPress={() => {
              onSubmit(props.data);
            }}
            width={'42px'}
            height={'42px'}
            br={'28px'}
            bc={props.subBc}
            fontSize={'15px'}
            style={
              props.addState
                ? {transform: [{rotate: '45deg'}], elevation: 3}
                : {elevation: 3}
            }></ButtonDel>
        </FloatView>
      ) : null}
    </Wrap>
  );
}
