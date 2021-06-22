import React, {useState} from 'react';
import {Platform, Dimensions} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
// custom component
import DropDownPicker from 'react-native-dropdown-picker';
import KakaoButton from '../../components/styled/KakaoButtonRadius';
// rest api
import * as payApi from '../../api/kakaoHttp/pay';
import * as deadApi from '../../api/deadHttp/deadRelation';
// recoil
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../atoms';

export default function Mind({navigation, route}) {
  const [money, setMoney] = useState(null);
  // Dropdown Picker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([{label: '미설정', value: '미설정'}]);
  const uid = useRecoilValue(userIdState);
  const [deadId, setDeadId] = useState(null);

  const init = async () => {
    // 관계 가져오기
    try {
      const id = await AsyncStorage.getItem('deadId');
      setDeadId(id);
      const response = await deadApi.getRelation(id);
      if (response.status === 200) {
        let parseData = [];
        response.data.response.forEach(element => {
          const transfer = {
            label: `${element.name}(${element.relationName})`,
            value: element.name,
          };
          parseData.push(transfer);
        });
        setItems(parseData);
      }
    } catch (error) {
      console.log(error);
      alert(`받는사람을 불러오는 도중 문제가 발생했습니다 error:${error}`);
    }
  };

  const paymentReady = async navigation => {
    if (value === null || money === null) {
      alert('받는 사람과 금액 모두 입력해주세요');
      return;
    }

    const payInfo = {
      partner_order_id: value,
      partner_user_id: uid,
      item_name: '부조금',
      quantity: 1,
      total_amount: money,
      tax_free_amount: 0,
      approval_url: 'https://grium.me/pay/success',
      cancel_url: 'https://grium.me/pay/cancel',
      fail_url: 'https://grium.me/pay/fail',
    };

    const response = await payApi.postPaymentReady(payInfo);
    if (response.status === 200) {
      payInfo.tid = response.data.tid;
      payInfo.deadId = deadId;
      navigation.navigate('Payment', {
        uri:
          Platform.OS === 'ios'
            ? response.data.next_redirect_mobile_url
            : response.data.next_redirect_mobile_url,
        payInfo: payInfo,
        deadId: deadId,
      });
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <SWrap>
      <ImageArea style={{borderBottomWidth: 1, borderColor: '#cccccc'}}>
        <ImageWrap>
          <Image source={require('../../assets/images/black-ribbon.png')} />
        </ImageWrap>
      </ImageArea>
      <DropDownPicker
        style={{
          zIndex: 33,
          position: 'absolute',
          right: 20,
          height: 33,
          top: 20,
          width: (Dimensions.get('window').width - 40) * 0.5,
          borderColor: '#cccccc',
          backgroundColor: 'white',
        }}
        searchable={false}
        placeholder="수령인"
        placeholderStyle={{
          color: '#cccccc',
          fontWeight: 'normal',
        }}
        dropDownContainerStyle={{
          borderColor: '#cccccc',
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          position: 'absolute',
          top: 52,
          right: 20,
          width: (Dimensions.get('window').width - 40) * 0.5,
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
      <InputArea style={{zIndex: 4}}>
        <ListItem style={{zIndex: 5}}>
          <Label>받는사람</Label>
        </ListItem>
        <ListItem style={{zIndex: 2}}>
          <Label>금액</Label>
          <Money
            placeholder={'부조금을 입력하세요'}
            value={
              money === null
                ? null
                : money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            keyboardType="number-pad"
            returnKeyType="done"
            onChangeText={value => {
              setMoney(value.replace(/,/g, ''));
            }}
          />
          <DecoLabel>원</DecoLabel>
        </ListItem>
      </InputArea>
      <ButtonArea>
        <KakaoButton
          onPress={() => {
            paymentReady(navigation);
          }}>
          PAY
        </KakaoButton>
      </ButtonArea>
    </SWrap>
  );
}

const _WH = Dimensions.get('window').height;
const _WW = Dimensions.get('window').width - 40;
const SWrap = styled.View`
  flex: 1;
  height: ${_WH}px;
  background-color: white;
  padding-bottom: ${Platform.OS === 'ios' ? '60px' : '40px'};
`;
const ImageArea = styled.View`
  height: ${_WH * 0.4}px;
  width: ${_WW}px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
  padding-bottom: 60px;
  margin: 0 20px;
`;
const InputArea = styled.View`
  height: ${_WH * 0.2}px;
  width: ${_WW}px;
  margin: 0 20px;
`;
const ButtonArea = styled.View`
  width: ${_WW}px;
  padding: 0 15%;
  margin: 0 20px;
  margin-top: 60px;
`;

const ImageWrap = styled.View`
  aspect-ratio: 1;
  padding: 40px;
  border: 3px solid black;
  border-radius: 200px;
`;
const Image = styled.Image`
  width: 100%;
  height: 100%;
`;
const ListItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  width: 100%;
  height: 50%;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;
const Label = styled.Text`
  color: gray;
  font-size: 16px;
  font-weight: bold;
`;
const Money = styled.TextInput`
  color: gray;
  font-size: 16px;
  border-radius: 50px;
  font-weight: normal;
  padding-right: 20px;
  text-align: right;
`;
const DecoLabel = styled.Text`
  position: absolute;
  right: 0;
  color: gray;
  font-size: 16px;
  border-radius: 50px;
  font-weight: normal;
  padding-right: 10px;
`;
