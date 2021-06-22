import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
// custom component
import SquareLayer from '../SquareLayer';
import UserListItem from '../UserListItem';
import GInput from '../GInput';
import {Row} from '../basic/View';
import Button from '../Button';
import ButtonDel from '../ButtonDel';
import BlankView from '../BlankView';
import FloatView from '../FloatView';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {userIdState, relationAvailableState} from '../../../atoms';
// rest api
import * as authApi from '../../../api/authHttp/auth';
import * as relationApi from '../../../api/authHttp/relation';
import * as proposeApi from '../../../api/authHttp/propose';

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
  line-height: ${Dimensions.get('window').height - 400}px;
`;

export default function RelSearch(props) {
  const [keyword, setKeyword] = useState('');
  const keywordUpdate = value => {
    setKeyword(value);
  };
  // local state
  const [filteredData, setFilteredData] = useState([]);
  // recoil state
  const uid = useRecoilValue(userIdState);
  const [relationAvailable, setRelationAvailable] = useRecoilState(
    relationAvailableState,
  );

  const onPressTarget = target => {
    if (target) {
      props.submit(target);
    }
  };

  const init = async () => {
    console.log(uid, 'ddd');
    try {
      const resAvailable = await relationApi.getAvailable(uid);
      console.log(resAvailable);
      if (resAvailable.status === 200) {
        // 친구 추가 미동의 상태 -> 동의 로직 동작
        if (resAvailable.data.msg === 'insufficient scopes.') {
          // 토큰에 권한이 없으므로 권한을 요청하는 로직 수행
          // REST API와 WebView를 활용하여 구현
          alert(
            `친구목록을 불러올 수 없습니다. 카카오 계정 추가 권한 허용 절차를 진행해주세요.`,
          );
          const resGetOauth = await authApi.getOauth();
          props.navigation.navigate('AddAuth', {
            uri: resGetOauth,
          });
          return;
        }
        // 친구목록 리스트 성공적으로 가져왔을 경우 데이터 할당
        if (resAvailable.data.msg === 'success') {
          console.log(resAvailable.data.data);
          setRelationAvailable(resAvailable.data.data);
          setFilteredData(resAvailable.data.data);
        }
      }
    } catch (error) {
      console.log(`AddRelation init error : ${error}`);
    }
  };

  React.useEffect(() => {
    init();
  }, []);
  React.useEffect(() => {
    const filtering = relationAvailable.filter(element => {
      return element.name.indexOf(keyword) !== -1;
    });
    setFilteredData(filtering);
  }, [keyword]);
  return (
    <SquareLayer label={'사용자 검색'} width={'100%'}>
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
          mr={'32px'}
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
      </Row>
      <Wrap>
        <ScrollList>
          <BlankView height={'7px'} />
          {relationAvailable.length !== 0 ? (
            filteredData.map((item, index) => {
              return (
                <UserListItem
                  key={`${index}friendList`}
                  relation={item.provider}
                  disabled={true}
                  delState={true}
                  data={item}
                  subBc={'#43D4B1'}
                  addState={true}
                  submit={onPressTarget}>
                  {item.name}
                </UserListItem>
              );
            })
          ) : (
            <EmptyView>{`가족으로 등록할 수 있는 유저가 없습니다.`}</EmptyView>
          )}
          <BlankView height={'10px'} />
        </ScrollList>
      </Wrap>
    </SquareLayer>
  );
}

const data2 = null;
