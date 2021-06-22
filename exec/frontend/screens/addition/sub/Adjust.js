import React, {useState} from 'react';
import {Dimensions, View, StyleSheet} from 'react-native';
// third party library
import styled from 'styled-components';
import moment from 'moment';
import {PieChart} from 'react-native-chart-kit';
// custom component
import {Subtitle} from '../../../components/styled/basic/Text';
// rest api
import * as dealApi from '../../../api/kakaoHttp/pay';
import GText from '../../../components/styled/GText';

export default function Adjust({navigation, route}) {
  // const colorList = [
  //   '#DB6E55',
  //   '#59688F',
  //   '#9883F0',
  //   '#5EC3F0',
  //   '#C2F064',
  //   '#F0E66C',
  //   '#A39372',
  // ];
  // // hook
  // const [dealList, setDealList] = useState([]);
  // const [satistics, setSatistics] = useState([]);
  // const [indicator, setIndicator] = useState({});
  // const [data, setData] = useState([
  //   {
  //     name: 'Seoul',
  //     currency: 1,
  //     color: 'white',
  //     legendFontColor: 'black',
  //     legendFontSize: 12,
  //   },
  // ]); //chart 변수
  // // recoil

  // const init = async () => {
  //   try {
  //     const resDealList = await dealApi.getTransaction(route.params.deadId);
  //     const resSatistics = await dealApi.getTransactionStatistics(
  //       route.params.deadId,
  //     );
  //     if (resDealList.status === 200 && resSatistics.status === 200) {
  //       console.log(resDealList.data);
  //       console.log(resSatistics.data);
  //       setDealList(resDealList.data);
  //       setSatistics(resSatistics.data);
  //       let tempLabel = {};
  //       resSatistics.data.forEach((element, index) => {
  //         const key = element.name;
  //         const color = colorList[index];
  //         tempLabel[key] = color;
  //       });
  //       setIndicator(tempLabel);
  //       makeData();
  //     }
  //   } catch (error) {
  //     console.log(`부조금 관리 페이지 초기화 중 error:${error}`);
  //   }
  // };
  // React.useEffect(() => {
  //   init();
  // }, []);

  // 전달일 텍스트 변환
  const getMoment = date => {
    let subDate = date.substring(0, 19);
    const mDate = moment(subDate, 'YYYY-MM-DDTHH:mm:ss');
    return mDate.format('MM월 DD일 HH:mm');
  };
  const currencyConverter = number => {
    return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`;
  };
  const getTotal = () => {
    let total = 0;
    route.params.satistics.forEach(element => {
      total += element.total;
    });
    return total;
  };
  const getColor = name => {
    return route.params.indicator[name];
  };

  // const makeData = () => {
  //   let tempDataList = [];
  //   satistics.map(item => {
  //     const tempData = {
  //       name: item.name,
  //       currency: item.total,
  //       color: indicator[item.name],
  //       legendFontColor: indicator[item.name],
  //       legendFontSize: 12,
  //     };
  //     tempDataList.push(tempData);
  //   });
  //   setData(tempDataList);
  //   console.log('------------', data);
  // };
  // //
  // const datas = [
  //   {
  //     name: 'Seoul',
  //     currency: 1,
  //     color: 'white',
  //     legendFontColor: 'white',
  //     legendFontSize: 12,
  //   },
  // ];
  const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  if (route.params.dealList.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <GText>전달받은 마음(부조금)이 없습니다.</GText>
      </View>
    );
  } else {
    //
    return (
      <Container>
        <Subtitle>전달된 마음(부조금)을 확인할 수 있습니다.</Subtitle>
        <ChartWrap>
          <PieChart
            data={route.params.data}
            width={WW}
            height={WW / 2}
            chartConfig={chartConfig}
            accessor={'currency'}
            backgroundColor={'transparent'}
            paddingLeft={'15'}
            center={[0, 0]}
            absolute
          />
        </ChartWrap>
        {/* ) : null} */}
        {route.params.satistics.length !== 0 ? (
          <Row3>
            <GText>{`총액   `}</GText>
            <GText style={{marginRight: 20}}>
              {currencyConverter(getTotal())}
            </GText>
          </Row3>
        ) : null}
        {route.params.dealList.length !== 0 ? (
          route.params.dealList.map((item, index) => {
            return (
              <ListItem key={index}>
                <Row1>
                  <Indicator bc={getColor(item.partnerOrderId)}></Indicator>
                  <GText>{`  ${item.partnerOrderId}`}</GText>
                </Row1>
                <Row2>
                  <GText>{`${getMoment(item.approvedAt)}`}</GText>
                  <GText>{currencyConverter(item.amountTotal)}</GText>
                </Row2>
              </ListItem>
            );
          })
        ) : (
          <Full>
            <ListItem>
              <GText>전달된 마음(부조금)이 없습니다.</GText>
            </ListItem>
          </Full>
        )}
      </Container>
    );
  }
}

const WW = Dimensions.get('window').width;
const WH = Dimensions.get('window').height;
const Container = styled.ScrollView`
  flex: 1;
  background-color: white;
`;
// 차트
const ChartWrap = styled.View`
  width: 100%;
  height: 250px;
  justify-content: center;
`;
// 부조내역 리스트
const ListItem = styled.View`
  flex-direction: row;
  width: 100%;
  height: 52px;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;
const Row1 = styled.View`
  flex-direction: row;
  align-items: center;
  flex: 3;
`;
const Row2 = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex: 7;
`;
const Row3 = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 52px;
  background-color: #eeeeee;
  justify-content: flex-end;
  flex: 3;
  border-top-width: 1px;
  border-top-color: #cccccc;
  border-bottom-width: 1px;
  border-bottom-color: #cccccc;
`;
const Indicator = styled.View`
  width: 18px;
  height: 18px;
  background-color: ${props => (props.bc ? props.bc : 'black')};
  border-radius: 9px;
`;

// empty
const Full = styled.View`
  flex: 1;
  background-color: white;
  border: 1px solid red;
`;
