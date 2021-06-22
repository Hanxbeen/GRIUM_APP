import React, {useState} from 'react';
import {StyleSheet, ScrollView, Platform, Dimensions} from 'react-native';
import ButtonRadius from '../../../components/styled/ButtonRadius';
import Button from '../../../components/styled/Button';
import GText from '../../../components/styled/GText';
import BlankView from '../../../components/styled/BlankView';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Subtitle} from '../../../components/styled/basic/Text';
import {useRecoilValue, useRecoilState} from 'recoil';
import {userIdState, deadIdState, liveState} from '../../../atoms'; // import
import AlertModal from '../../../components/styled/extended/AlertModal';

import * as deadApi from '../../../api/deadHttp/dead';
import * as dealApi from '../../../api/kakaoHttp/pay';

export default function MyGrium({navigation}) {
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  //recoil state
  const uid = useRecoilValue(userIdState);
  const [griums, setGriums] = useState([]);
  const [deadId, setDeadId] = useRecoilState(deadIdState);
  const [live, setLive] = useRecoilState(liveState);

  const init = async () => {
    try {
      const resGriums = await deadApi.getDeadManage(uid);
      setGriums(resGriums.data);
    } catch (error) {
      alert(error);
      setAlertModalMessage('목록을 불러오는 도중 문제가 발생했습니다.');
      setAlertModalState(true);
    }
  };
  React.useEffect(() => {
    init();
  }, []);
  if (griums.length === 0) {
    return (
      <FullScreen>
        <GText>가족이 없습니다. </GText>
      </FullScreen>
    );
  } else {
    return (
      <ScrollView style={styles.container}>
        <Subtitle>상주로 있는 기억공간입니다.</Subtitle>
        {griums.map(grium => {
          return (
            <Wrap key={grium.deadId}>
              <Item style={styles.shadow}>
                <Row width={'50%'}>
                  <ImageWrap>
                    {grium.imageUrl === null ? (
                      <Image
                        source={require('../../../assets/images/userImage.jpeg')}
                      />
                    ) : (
                      <Image source={{uri: grium.imageUrl}} />
                    )}
                  </ImageWrap>
                </Row>
                <Row width={'50%'}>
                  <GText
                    fontWeight={'bold'}
                    fontSize={'20px'}
                    marginBottom={'12px'}
                    width={'100%'}>
                    {`故 ${grium.name}`}
                  </GText>
                  <GText fontSize={'15px'} color={'gray'} width={'100%'}>
                    {`관계 : ${grium.relationName}`}
                  </GText>
                </Row>
              </Item>
              <FloatAdjust>
                <Button
                  onPress={() => {
                    beforeReq(navigation, grium.deadId);
                  }}
                  active={true}
                  width={'65px'}
                  height={'28px'}
                  fs={'12px'}
                  style={{elevation: 16}}>{`부조현황`}</Button>
              </FloatAdjust>
              <FloatWrap>
                <ButtonRadius
                  onPress={() => {
                    setDeadId(grium.deadId);
                    setLive(false);
                    navigation.navigate('Frame', {id: grium.deadId});
                  }}
                  color={'white'}
                  backgroundColor={'black'}
                  width={'140px'}
                  height={'22px'}
                  fontSize={'12px'}>
                  기억공간으로 이동하기
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

const FloatAdjust = styled.View`
  position: absolute;
  elevation: 8;
  top: 20px;
  padding: 5px;
  right: 20px;
`;
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
  bottom: 3px;
  left: 50%;
  margin-left: -70px;
  elevation: 16;
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
const FullScreen = styled.View`
  flex: 1;
  background-color: white;
  padding-bottom: 60px;
  align-items: center;
  justify-content: center;
`;
const Wrap = styled.View`
  height: 195px;
  background-color: white;
`;

// 차트의 rerender 불가로 네비게이션 이동 전 데이터 만들어 prams로 전달
let dealList;
let satistics;
let indicator;
let data;
const beforeReq = async (navigation, deadId) => {
  try {
    // response 데이터
    const resDealList = await dealApi.getTransaction(deadId);
    const resSatistics = await dealApi.getTransactionStatistics(deadId);
    if (resDealList.status === 200 && resSatistics.status === 200) {
      console.log(resDealList.data);
      console.log(resSatistics.data);
      dealList = resDealList.data;
      satistics = resSatistics.data;
      // indicator 색상 데이터
      let tempLabel = {};
      resSatistics.data.forEach((element, index) => {
        const key = element.name;
        const color = colorList[index];
        tempLabel[key] = color;
      });
      indicator = tempLabel;
      // data
      let tempDataList = [];
      satistics.map(item => {
        const tempData = {
          name: item.name,
          currency: item.total,
          color: indicator[item.name],
          legendFontColor: indicator[item.name],
          legendFontSize: 12,
        };
        tempDataList.push(tempData);
      });
      data = tempDataList;
      // 네비게이션 이동
      navigation.navigate('Adjust', {
        deadId: deadId,
        dealList: dealList,
        satistics: satistics,
        indicator: indicator,
        data: data,
      });
    }
  } catch (error) {
    console.log(`부조금 관리 페이지 이동 준비중 error:${error}`);
  }
};
// indicator 색상셋
const colorList = [
  '#DB6E55',
  '#59688F',
  '#9883F0',
  '#5EC3F0',
  '#C2F064',
  '#F0E66C',
  '#A39372',
];
