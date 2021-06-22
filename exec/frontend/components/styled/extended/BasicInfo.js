import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import moment from 'moment';
import produce from 'immer';
// custom component
import {Row, Col} from '../basic/View';
import SquareView from '../SquareView';
import FloatView from '../FloatView';
import GText from '../GText';
import GInput from '../GInput';
import GInputBirth from '../GInputBirth';
import Button from '../Button';
import ImagePickerModal from './ImagePickerModal';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {deadInfoState, imagePickerState, imageUrlState} from '../../../atoms';
// REST API

const getBirth = (birthyear, birthday) => {
  let birth = birthyear + birthday;
  return birth.replace(/-/g, '').replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
};
const makeBirth = (birthyear, birthday) => {
  let birth;
  if (birthyear !== null && birthday !== null) {
    birth = birthyear + birthday;
  } else {
    birth = '';
  }
  return birth;
};

export default function BasicInfo(props) {
  // recoil state
  const [deadInfo, setDeadInfo] = useRecoilState(deadInfoState);
  const [modalVisible, setModalVisible] = useRecoilState(imagePickerState);
  const imageUrl = useRecoilValue(imageUrlState);
  // recoil set 함수
  const storeBirth = value => {
    // 생년월일 변환기   년|월일  <-> 년-월-일
    let planValue = value.replace(/-/g, '');
    const birthyear = planValue.substring(0, 4);
    const birthday = planValue.substring(4, 9);
    setDeadInfo(
      produce(deadInfo, draft => {
        draft.birthyear = birthyear;
        draft.birthday = birthday;
      }),
    );
  };
  const storeComment = value => {
    //유언
    setDeadInfo(
      produce(deadInfo, draft => {
        draft.commentForCondolence = value;
      }),
    );
  };

  // input 모드 전환 상태값
  const [inputState, setInputState] = useState(false);
  const [imagePickerVisibled, setImagePickerVisibled] = useState(false);

  return (
    <SquareView
      label={'기본정보'}
      width={`${Dimensions.get('window').width - 40}px`}
      mLR={'20px'}>
      {deadInfo ? (
        inputState ? (
          // 수정 모드
          <>
            <Row>
              <ImageWrap onPress={() => setModalVisible(true)}>
                <Image
                  source={
                    imageUrl !== null
                      ? {uri: imageUrl}
                      : require('../../../assets/essential/user.png')
                  }
                />
                <FloatView top={'0px'} right={'0px'}>
                  <PlusIcon
                    source={require('../../../assets/icons/plus-w-p.png')}
                  />
                </FloatView>
              </ImageWrap>
              <Col pLR={'20px'} style={{paddingRight: 0}}>
                <GText height={'20px'}>{deadInfo.name}</GText>
                <GInputBirth
                  marginTop={'5px'}
                  type={'number-pad'}
                  placeholder={'YYYYMMDD'}
                  value={makeBirth(deadInfo.birthyear, deadInfo.birthday)}
                  onChangeText={storeBirth}
                />
                <GInput
                  marginTop={'5px'}
                  fontSize={'12px'}
                  placeholder={'나를 표현하는 문장'}
                  maxLength={33}
                  value={deadInfo.commentForCondolence}
                  onChangeText={storeComment}></GInput>
              </Col>
            </Row>
            <Button
              active={true}
              mt={'10px'}
              onPress={() => {
                props.submit();
                setInputState(false);
              }}>
              변경정보 저장
            </Button>
            <ImagePickerModal visible={imagePickerVisibled} />
          </>
        ) : (
          // 뷰어모드
          <>
            <Row>
              <ImageWrap disabled={true}>
                <Image
                  source={
                    imageUrl !== null
                      ? {uri: imageUrl}
                      : require('../../../assets/essential/user.png')
                  }
                />
              </ImageWrap>
              <Col pLR={'20px'} style={{paddingRight: 0}}>
                <GText height={'20px'}>{deadInfo.name}</GText>
                {/* <GText height={'16px'} fontSize={'12px'} color={'gray'}>{`${
                  deadInfo.birthday || deadInfo.birthyear
                    ? getBirth(deadInfo.birthyear, deadInfo.birthday)
                    : '미설정'
                } ~ ${moment().format('YYYY-MM-DD')}`}</GText> */}
                <GText height={'16px'} fontSize={'12px'} color={'gray'}>{`${
                  deadInfo.birthday || deadInfo.birthyear
                    ? getBirth(deadInfo.birthyear, deadInfo.birthday)
                    : '미설정'
                }`}</GText>
                <GText marginTop={'16px'} fontSize={'12px'} color={'gray'}>
                  {deadInfo.commentForCondolence
                    ? deadInfo.commentForCondolence
                    : `나를 가장 잘 표현하는 문장,\n어떻게 기억되고 싶나요?`}
                </GText>
              </Col>
            </Row>
            <Button
              active={false}
              mt={'10px'}
              onPress={() => {
                setInputState(true);
              }}>
              기본정보 수정
            </Button>
          </>
        )
      ) : null}
    </SquareView>
  );
}

const ImageWrap = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.3}px;
  height: ${Dimensions.get('window').width * 0.3}px;
  aspect-ratio: 1;
  padding: 3px;
  border: 2px solid black;
  border-radius: 200px;
`;
const Image = styled.Image`
  border-radius: 80px;
  width: 100%;
  height: 100%;
`;
const PlusIcon = styled.Image`
  width: 32px;
  height: 32px;
  background-color: black;
  border-radius: 16px;
`;
