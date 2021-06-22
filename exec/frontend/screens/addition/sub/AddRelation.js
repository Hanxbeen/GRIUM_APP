import React, {useState} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import styled from 'styled-components';
import DropDownPicker from 'react-native-dropdown-picker';
// custom component
import Button from '../../../components/styled/Button';
import GText from '../../../components/styled/GText';
import {Row} from '../../../components/styled/basic/View';
import RelSearch from '../../../components/styled/extended/RelSearch';
import BlankView from '../../../components/styled/BlankView';
import AlertModal from '../../../components/styled/extended/AlertModal';
// rest api
import * as proposeApi from '../../../api/authHttp/propose';
// recoil
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../../atoms';

const TopArea = styled.View`
  width: ${Dimensions.get('window').width - 40}px;
  height: 140px;
  margin: 0 20px;
`;
const HightlightText = styled.Text`
  flex: 1;
  color: black;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  line-height: 32px;
  height: 32px;
  background-color: #dddddd;
  padding: 0 10px;
  border-radius: 16px;
  align-items: center;
`;

export default function AddRelation({navigation}) {
  // modal state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    {label: '아버지', value: '아버지'},
    {label: '어머니', value: '어머니'},
    {label: '아들', value: '아들'},
    {label: '딸', value: '딸'},
    {label: '형제', value: '형제'},
    {label: '기타', value: '기타'},
  ]);
  // local state
  const [targetData, setTargetData] = useState(null);
  // recoil state
  const uid = useRecoilValue(userIdState);

  // AlertModal State
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  // 관계 등록 요청
  const reqRelation = async () => {
    if (value === null || value2 === null || targetData === null) {
      setAlertModalMessage('관계를 설정하세요.');
      setAlertModalState(true);
      return;
    }
    try {
      const payload = {
        senderId: uid,
        receiverId: targetData.uid,
        senderToReceiver: value,
        receiverToSender: value2,
      };
      const resPropose = await proposeApi.postPropose(payload);
      if (resPropose.status === 200) {
        if (resPropose.data === 'Relation connect success') {
          setAlertModalMessage('서로 가족이 되었습니다.');
          setAlertModalState(true);
          navigation.pop(2);
          navigation.navigate('Memory');
        } else if (resPropose.data === 'add Propose success') {
          setAlertModalMessage(
            `가족 요청을 보냈습니다.

  상대방이 수락한 경우 가족 목록에서 확인할 수 있습니다.`,
          );
          setAlertModalState(true);
        }
      }
    } catch (error) {
      console.log('가족 추가 중 문제 발생', error);
    }
  };

  const onPressUser = value => {
    setTargetData(value);
  };

  return (
    <View style={styles.container}>
      <TopArea style={styles.top}>
        <Row style={{marginBottom: 10}}>
          <HightlightText style={!targetData ? {color: '#aaa'} : null}>
            {targetData ? targetData.name : '대상 미설정'}
          </HightlightText>
          <GText height={'32px'} color={'gray'} fontSize={'14px'}>
            은(는) 나의
          </GText>
          <BlankView ml={'10px'} bc={'red'} width={'36%'}></BlankView>
        </Row>
        <Row style={{marginBottom: 10}}>
          <GText height={'32px'} color={'gray'} fontSize={'14px'}>
            나는
          </GText>
          <HightlightText
            style={
              !targetData ? {color: '#aaa', marginLeft: 10} : {marginLeft: 10}
            }>
            {targetData ? targetData.name : '대상 미설정'}
          </HightlightText>
          <GText height={'32px'} color={'gray'} fontSize={'14px'}>
            의
          </GText>
          <BlankView ml={'10px'} bc={'red'} width={'36%'}></BlankView>
        </Row>
        <Button
          onPress={() => {
            reqRelation();
          }}>
          가족관계 추가 및 요청 보내기
        </Button>
      </TopArea>
      <DropDownPicker
        style={{
          zIndex: 33,
          position: 'absolute',
          right: 20,
          height: 33,
          top: -140,
          width: (Dimensions.get('window').width - 40) * 0.36,
          borderColor: 'black',
          backgroundColor: 'transparent',
        }}
        searchable={false}
        placeholder="관계"
        placeholderStyle={{
          color: '#aaa',
          fontWeight: 'normal',
        }}
        dropDownContainerStyle={{
          borderColor: 'black',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          position: 'absolute',
          top: -109,
          right: 20,
          width: (Dimensions.get('window').width - 40) * 0.36,
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          maxHeight: 185,
          elevation: 33,
          zIndex: 100,
        }}
        open={open}
        value={value}
        items={items}
        setValue={setValue}
        setItems={setItems}
        setOpen={setOpen}
      />
      <DropDownPicker
        style={{
          zIndex: 32,
          position: 'absolute',
          right: 20,
          height: 32,
          top: -98,
          width: (Dimensions.get('window').width - 40) * 0.36,
          borderColor: 'black',
          backgroundColor: 'transparent',
        }}
        searchable={false}
        placeholder="관계"
        placeholderStyle={{
          color: '#aaa',
          fontWeight: 'normal',
        }}
        dropDownContainerStyle={{
          borderColor: 'black',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          position: 'absolute',
          top: -66,
          right: 20,
          width: (Dimensions.get('window').width - 40) * 0.36,
          shadowOpacity: 0.27,
          shadowRadius: 4.65,
          maxHeight: 185,
          elevation: 32,
          zIndex: 100,
        }}
        open={open2}
        value={value2}
        items={items}
        setValue={setValue2}
        setItems={setItems}
        setOpen={setOpen2}
      />
      <RelSearch navigation={navigation} submit={onPressUser}></RelSearch>
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
