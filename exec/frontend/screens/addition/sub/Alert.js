import React, {useState} from 'react';
import {StyleSheet, ScrollView, Platform, Dimensions} from 'react-native';
import styled from 'styled-components';
import ButtonRadius from '../../../components/styled/ButtonRadius';
import GText from '../../../components/styled/GText';
import BlankView from '../../../components/styled/BlankView';
import {Subtitle} from '../../../components/styled/basic/Text';
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../../atoms';
import AlertModal from '../../../components/styled/extended/AlertModal';

import * as proposeApi from '../../../api/authHttp/propose';

const FullScreen = styled.View`
  flex: 1;
  background-color: white;
  padding-bottom: 60px;
  align-items: center;
  justify-content: center;
`;
export default function Alert() {
  // recoil state
  const uid = useRecoilValue(userIdState);
  const [items, setItems] = useState([]);
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  const init = async () => {
    try {
      const resItems = await proposeApi.getPropose(uid);
      setItems(resItems.data);
    } catch (error) {
      setAlertModalMessage(
        `목록을 불러오는 도중 문제가 발생했습니다. error:${error}`,
      );
      setAlertModalState(true);
    }
  };

  const allowPropose = async propose => {
    try {
      await proposeApi.postPropose({
        senderId: uid,
        receiverId: propose.senderUid, // 제안 보낸 사람이 받는 사람으로
        senderToReceiver: propose.receiverToSender,
        receiverToSender: propose.senderToReceiver,
      });
      setAlertModalMessage('관계가 등록되었습니다.');
      setAlertModalState(true);
      init();
    } catch (error) {
      setAlertModalMessage(
        '관계가 등록 중 문제가 발생했습니다. error:${error}',
      );
      setAlertModalState(true);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  if (items.length === 0) {
    return (
      // 알람 없는 경우 (추가 해줭)
      <FullScreen>
        <GText>알림이 없습니다. </GText>
      </FullScreen>
    );
  }
  return (
    <ScrollView style={styles.container}>
      <Subtitle>관계 요청을 확인하세요</Subtitle>
      {items.map(item => {
        return (
          <Wrap key={item.relationId}>
            <Item style={styles.shadow}>
              <Row width={'50%'}>
                <ImageWrap>
                  {item.senderImageUrl === null ? (
                    <Image
                      source={require('../../../assets/images/userImage.jpeg')}
                    />
                  ) : (
                    <Image source={{uri: item.senderImageUrl}} />
                  )}
                </ImageWrap>
              </Row>
              <Row width={'50%'}>
                <GText
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  marginBottom={'12px'}
                  width={'100%'}>
                  {item.senderName}
                </GText>
                {/* <GText fontSize={'15px'} color={'gray'} width={'100%'}>
                {`생일 : ${item.birthday}`}
              </GText> */}
                <GText fontSize={'15px'} color={'gray'} width={'100%'}>
                  {`신청 관계 : ${item.senderToReceiver}`}
                </GText>
              </Row>
            </Item>
            <FloatWrap>
              <ButtonRadius
                onPress={() => {
                  allowPropose(item);
                }}
                color={'white'}
                backgroundColor={'black'}
                width={'74px'}
                height={'22px'}
                fontSize={'12px'}>
                수락하기
              </ButtonRadius>
            </FloatWrap>
          </Wrap>
        );
      })}
      <BlankView height={Platform.OS === 'ios' ? '60px' : '40px'}></BlankView>
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  shadow: {
    width: Dimensions.get('window').width - 40,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});

const Item = styled.View`
  flex-direction: row;
  width: 100%;
  height: 160px;
  background-color: white;
  border-radius: 8px;
  margin-bottom: 30px;
`;
const Row = styled.View`
  width: ${props => props.width || '100%'};
  justify-content: center;
  align-items: center;
`;
const FloatWrap = styled.View`
  position: absolute;
  bottom: 2px;
  left: 50%;
  margin-left: -37px;
  elevation: 10;
`;
const ImageWrap = styled.View`
  height: 80%;
  aspect-ratio: 1;
  padding: 3px;
  border: 1px solid black;
  border-radius: 200px;
`;
const Image = styled.Image`
  border-radius: 80px;
  width: 100%;
  height: 100%;
`;
const Wrap = styled.View`
  height: 195px;
  background-color: white;
`;
