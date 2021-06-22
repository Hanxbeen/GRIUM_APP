import React from 'react';
import {Dimensions, Switch} from 'react-native';
// custom component
import SquareView from '../SquareView';
import GText from '../GText';
import Button from '../Button';
import {Row} from '../basic/View';
// http api

export default function EtcSetting(props) {
  return (
    <SquareView
      label={'기타설정'}
      // minHeight={'100px'}
      width={`${Dimensions.get('window').width - 40}px`}
      mLR={'20px'}>
      <Row>
        <GText>기억공간 공개</GText>
        <Switch
          trackColor={{false: '#aaaaaa', true: '#666666'}}
          thumbColor={props.value ? '#000000' : '#f4f3f4'}
          ios_backgroundColor="#aaaaaa"
          onValueChange={props.submit}
          value={props.value}
        />
      </Row>
      <Row style={{alignItems: 'center', marginTop: 10}}>
        <GText>친구목록 관리</GText>
        <Button
          active={true}
          width={'48.5%'}
          onPress={() =>
            props.navigation.navigate('AddFriend')
          }>{`   친구관리    ≫`}</Button>
      </Row>
    </SquareView>
  );
}
