import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import produce from 'immer';
// custom component
import SquareLayer from '../SquareLayer';
import BlankView from '../BlankView';
import OptionalModal from './OptionalModal';
import GInput from '../GInput';
import {Row} from '../basic/View';
import Button from '../Button';
import ButtonDel from '../ButtonDel';
import FloatView from '../FloatView';
import UserListItem from '../UserListItem';
// rest api
import * as authApi from '../../../api/authHttp/auth';
import * as relationApi from '../../../api/authHttp/relation';
import * as proposeApi from '../../../api/authHttp/propose';
import AlertModal from '../../../components/styled/extended/AlertModal';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  userIdState,
  relationAvailableState,
  relationFriendState,
} from '../../../atoms';

const Wrap = styled.View`
  width: 100%;
  height: 100%;
  padding-bottom: 60px;
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
  line-height: ${Dimensions.get('window').height - 280}px;
`;

export default function RelFSearch(props) {
  // top component(검색) local state
  const [keyword, setKeyword] = useState('');
  const keywordUpdate = value => {
    setKeyword(value);
  };
  // const pressEnter = value => {
  //   alert(value);
  // };

  // local state
  const [filteredData, setFilteredData] = useState([]);
  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [addTarget, setAddTarget] = useState(null);
  // modal
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);
  // recoil state
  const uid = useRecoilValue(userIdState);
  const [relationAvailable, setRelationAvailable] = useRecoilState(
    relationAvailableState,
  );
  const [relationFriend, setRelationFriend] =
    useRecoilState(relationFriendState);

  const modalTogle = target => {
    if (target) {
      console.log(target);
      setAddTarget(target);
    }
    setOptianlModalVisibled(!optianlModalVisibled);
  };

  // 관계 등록 요청
  const reqRelation = async () => {
    const payload = {
      senderId: uid,
      receiverId: addTarget.uid,
      senderToReceiver: '친구',
      receiverToSender: '친구',
    };
    try {
      const resPropose = await proposeApi.postPropose(payload);
      if (resPropose.status === 200) {
        if (resPropose.data === 'Relation connect success') {
          setAlertModalMessage('서로 친구가 되었습니다.');
          setAlertModalState(true);
          const resFriend = await relationApi.getFriend(uid);
          if (resFriend.status === 200) {
            setRelationFriend(resFriend.data.data);
            setRelationAvailable(
              produce(relationAvailable, draft => {
                draft.filter(element => element.id !== addTarget.id);
              }),
            );
          }
        } else if (resPropose.data === 'add Propose success') {
          setAlertModalMessage(`친구 요청을 보냈습니다.
          
  상대방이 수락한 경우 친구 목록에서 확인할 수 있습니다.`);
          setAlertModalState(true);
        }
        modalTogle();
      } else {
        setAlertModalMessage('친구 추가 중 문제가 발생했습니다.');
        setAlertModalState(true);
      }
    } catch (error) {
      console.log('친구 추가 중 문제 발생', error);
    }
  };

  // 데이터 초기화
  const init = async () => {
    try {
      const resAvailable = await relationApi.getAvailable(uid);
      if (resAvailable.status === 200 && resAvailable.data.msg === 'success') {
        setRelationAvailable(resAvailable.data.data);
        setFilteredData(resAvailable.data.data);
      }
    } catch (error) {
      console.log(`RelFSearch init error : ${error}`);
    }
  };
  // 초기화(등록 가능한 유저 리스트 요청 및 state 반영)
  React.useEffect(() => {
    init();
  }, [relationFriend]);

  React.useEffect(() => {
    const filtering = relationAvailable.filter(element => {
      return element.name.indexOf(keyword) !== -1;
    });
    setFilteredData(filtering);
  }, [keyword]);

  return (
    <SquareLayer key={'first'} label={'사용자 검색'} width={'100%'}>
      <BlankView height={'12px'} />
      <Row
        style={{
          marginTop: 5,
          paddingRight: 10,
          paddingLeft: 10,
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
          // onSubmit={pressEnter}
          mr={'32px'}
          ml={'4px'}
        />
        <FloatView top={'4px'} right={'14px'}>
          <ButtonDel
            br={'6px'}
            width={'24px'}
            height={'24px'}
            bc={'#999999'}
            fontSize={'10px'}
            onPress={() => {
              setKeyword('');
            }}
          />
        </FloatView>
      </Row>
      <Wrap>
        <ScrollList>
          <BlankView height={'10px'} />
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
                  submit={modalTogle}>
                  {item.name}
                </UserListItem>
              );
            })
          ) : (
            <EmptyView>{`친구로 등록할 수 있는 유저가 없습니다.`}</EmptyView>
          )}

          <BlankView height={'10px'} />
        </ScrollList>
      </Wrap>
      <OptionalModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={reqRelation}>
        {` 친구는 비공개된 기억공간에 찾아올 수 있습니다.

        ${addTarget ? addTarget.name : ''}을(를) 등록하시겠습니까?`}
      </OptionalModal>
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </SquareLayer>
  );
}
