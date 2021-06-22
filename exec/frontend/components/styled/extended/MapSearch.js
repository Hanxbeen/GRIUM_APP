import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components';
// custom component
import SquareLayer from '../SquareLayer';
import PlaceSearchItem from '../PlaceSearchItem';
import GInput from '../GInput';
import {Row} from '../basic/View';
import Button from '../Button';
import ButtonDel from '../ButtonDel';
import BlankView from '../BlankView';
import FloatView from '../FloatView';
// rest api
import {searchPlaces as searchApi} from '../../../api/searchHttp/search';
import MapModal from '../../MapModal';
import {map} from 'lodash';
import {useRecoilValue, useRecoilState} from 'recoil';
import {addMurMurState, addCemeteryState} from '../../../atoms';

const Wrap = styled.View`
  width: 100%;
  flex: 1;
`;
const ScrollList = styled.ScrollView`
  width: 100%;
  padding: 0 10px;
  height: 100%;
`;
const EmptyView = styled.Text`
  width: 100%;
  height: 100%;
  text-align: center;
  color: gray;
  line-height: ${Dimensions.get('window').height - 270}px;
`;

// navigation 추가 -  young
export default function MapSearch({navigation, route}) {
  // local state
  const [keyword, setKeyword] = useState('');
  const [mapVisible, setMapVisible] = useState(false);
  const [mapData, setMapData] = useState('');

  // recoil 추가 - young
  const [addMurMur, setAddMurMur] = useRecoilState(addMurMurState);
  const [addCemetery, setAddCemetery] = useRecoilState(addCemeteryState);

  const keywordUpdate = value => {
    setKeyword(value);
  };
  // const handleKeyDown = e => {
  //   if (e.nativeEvent.key == 'Enter') {
  //     onSubmit();
  //   }
  // };
  const [deadSearchList, setDeadSearchList] = useState([]);

  const onPressTarget = item => {
    console.log(item);
  };

  // 추가 - young
  console.log('------------------>');
  const check = route.params.check;

  // 데이터입력 구문
  // rest 호출
  const onSubmit = async () => {
    try {
      const resPlaceSearch = await searchApi(keyword);
      if (resPlaceSearch.status === 200) {
        // console.log(resPlaceSearch.data.response.result.items);
        let placeList = [];
        resPlaceSearch.data.response.result.items.map(o => {
          let place = {
            road: o.address.road,
            point: o.point,
            name: o.title,
          };
          placeList.push(place);
        });

        // 중복제거
        placeList = placeList.filter(
          (arr, index, callback) =>
            index === callback.findIndex(t => t.road === arr.road),
        );
        setDeadSearchList(placeList);
      } else if (resDeadSearch.status === 204) {
        // setDeadSearchList([]);
      }
    } catch (error) {
      return;
    }
  };

  // React.useEffect(() => {
  //   onSubmit();
  // }, [keyword]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        // height: Dimensions.get('window').height,
        height: '100%',
        width: '100%',
      }}>
      <MapModal
        type={2}
        visible={mapVisible}
        modalTogle={() => {
          setMapVisible(!mapVisible);
        }}
        position={mapData}
      />
      <BlankView height={'5px'} />
      <SquareLayer label={'장소 검색'} width={'100%'}>
        <BlankView height={'12px'} />
        <Row
          style={{
            marginTop: 5,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#cccccc',
          }}>
          <GInput
            placeholder={'장소를 입력해주세요.'}
            style={{flex: 1}}
            value={keyword}
            returnKeyType="search"
            onChangeText={keywordUpdate}
            // onSubmitEditing={handleKeyDown}
            mr={'34px'}
            ml={'4px'}
          />
          <FloatView top={'4px'} right={'83px'}>
            <ButtonDel
              width={'24px'}
              height={'24px'}
              bc={'#999999'}
              fontSize={'10px'}
              br={'6px'}
              onPress={() => {
                setKeyword('');
              }}
            />
          </FloatView>
          <Button
            width={'60px'}
            height={'32px'}
            style={{marginLeft: 10}}
            onPress={() => onSubmit()}>
            검색
          </Button>
        </Row>
        <Wrap>
          <ScrollList>
            <BlankView height={'7px'} />
            {deadSearchList.length !== 0 ? (
              deadSearchList.map((item, index) => {
                return (
                  <PlaceSearchItem
                    height={'65px'}
                    key={index}
                    delState={true}
                    data={item}
                    subBc={'#000'}
                    onPress={() => {
                      onPressTarget(item);
                      setMapData({
                        latitude: Number(item.point.y),
                        longitude: Number(item.point.x),
                        name: item.name,
                      });
                      // 추가 - young
                      check === 1 ? setAddMurMur(item) : setAddCemetery(item);
                      // setMapVisible(!mapVisible);
                      navigation.goBack();
                    }}>
                    {/* {item.name} */}
                  </PlaceSearchItem>
                );
              })
            ) : (
              <EmptyView>{`검색 결과가 없습니다.`}</EmptyView>
            )}
            <BlankView height={'10px'} />
          </ScrollList>
        </Wrap>
      </SquareLayer>
    </View>
  );
}

const data2 = null;
