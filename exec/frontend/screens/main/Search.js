import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import styled from 'styled-components';
// custom component
import SquareLayer from '../../components/styled/SquareLayer';
import DeadListItem from '../../components/styled/DeadListItem';
import GInput from '../../components/styled/GInput';
import {Row} from '../../components/styled/basic/View';
import Button from '../../components/styled/Button';
import ButtonDel from '../../components/styled/ButtonDel';
import BlankView from '../../components/styled/BlankView';
import FloatView from '../../components/styled/FloatView';
// rest api
import * as deadApi from '../../api/deadHttp/dead';
// recoil
import {useRecoilValue, useRecoilState} from 'recoil';
import {userIdState, deadIdState, liveState} from '../../atoms';

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

export default function RelSearch({navigation}) {
  // local state
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  // recoil
  const [deadId, setDeadId] = useRecoilState(deadIdState);
  const [live, setLive] = useRecoilState(liveState);

  const [keyword, setKeyword] = useState('');
  const keywordUpdate = value => {
    setKeyword(value);
  };
  // const handleKeyDown = e => {
  //   if (e.nativeEvent.key == 'Enter') {
  //     onSubmit();
  //   }
  // };
  const [deadSearchList, setDeadSearchList] = useState([]);

  const onPressTarget = target => {
    if (target) {
      setDeadId(target.deadId);
      setLive(false);
      navigation.navigate('Frame', {id: target.deadId});
    }
  };

  const onSubmit = async () => {
    try {
      const resDeadSearch = await deadApi.getDeadSearch(keyword);
      if (resDeadSearch.status === 200) {
        setDeadSearchList(resDeadSearch.data);
      } else if (resDeadSearch.status === 204) {
        setDeadSearchList([]);
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    onSubmit();
  }, [keyword]);

  return (
    <View
      style={{
        backgroundColor: 'white',
        height: Dimensions.get('window').height,
      }}>
      <BlankView height={'5px'} />
      <SquareLayer label={'고인 검색'} width={'100%'}>
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
            placeholder={'성명을 입력해주세요.'}
            style={{flex: 1}}
            value={keyword}
            returnKeyType="search"
            onChangeText={keywordUpdate}
            // onSubmitEditing={handleKeyDown}
            mr={'34px'}
            ml={'4px'}
          />
          <FloatView top={'4px'} right={'14px'}>
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
          {/* <Button
            width={'60px'}
            height={'32px'}
            style={{marginLeft: 10}}
            onPress={() => onSubmit()}>
            검색
          </Button> */}
        </Row>
        <Wrap>
          <ScrollList>
            <BlankView height={'7px'} />
            {deadSearchList.length !== 0 ? (
              deadSearchList.map((item, index) => {
                return (
                  <DeadListItem
                    key={`${index}friendList`}
                    relation={item.provider}
                    disabled={true}
                    delState={true}
                    data={item}
                    subBc={'#000'}
                    submit={onPressTarget}>
                    {item.name}
                  </DeadListItem>
                );
                d;
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
