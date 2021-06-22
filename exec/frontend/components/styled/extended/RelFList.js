import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
// custom component
import SquareLayer from '../SquareLayer';
import UserListItem from '../UserListItem';
import BlankView from '../BlankView';
import OptionalModal from './OptionalModal';
// rest api
import * as relationApi from '../../../api/authHttp/relation';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  userIdState,
  relationAvailableState,
  relationFamilyState,
  relationFriendState,
} from '../../../atoms';

const Wrap = styled.View`
  width: 100%;
  height: 100%;
`;
const ScrollList = styled.ScrollView`
  width: 100%;
  height: 100%;
  padding: 0 10px;
`;
const EmptyView = styled.Text`
  width: 100%;
  height: 100%;
  text-align: center;
  color: gray;
  line-height: ${Dimensions.get('window').height - 200}px;
`;

export default function RelFList(props) {
  // local state
  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  // recoil state
  const uid = useRecoilValue(userIdState);
  const [relationFriend, setRelationFriend] =
    useRecoilState(relationFriendState);

  const modalTogle = target => {
    if (target) {
      setDeleteTarget(target);
    }
    setOptianlModalVisibled(!optianlModalVisibled);
  };

  // 관계 삭제
  const reqRelationDelete = async () => {
    try {
      const resDeleteRelation = await relationApi.deleteRelation(
        uid,
        deleteTarget.relationId,
      );
      console.log(resDeleteRelation);
      if (resDeleteRelation.status === 204) {
        await init();
        modalTogle();
        // // available 새 목록 요청해서 저장
        // const resAvailable = await relationApi.getAvailable(uid);
        // if (
        //   resAvailable.status === 200 &&
        //   resAvailable.data.msg === 'success'
        // ) {
        //   setRelationAvailable(resAvailable.data.data);
        // }
      }
    } catch (error) {
      console.log('친구 삭제 중 문제 발생', error);
    }
  };

  const init = async () => {
    // 친구목록 조회해서 local state에 set
    const resFriend = await relationApi.getFriend(uid);
    if (resFriend.status === 200) {
      setRelationFriend(resFriend.data.data);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <SquareLayer key={'second'} label={'친구 목록'} width={'100%'}>
      <Wrap>
        <ScrollList>
          <BlankView height={'12px'} />
          {relationFriend.length !== 0 ? (
            relationFriend.map((item, index) => {
              return (
                <UserListItem
                  key={`${index}friendList`}
                  relation={item.relationName}
                  disabled={true}
                  delState={true}
                  data={item}
                  subBc={'#F75450'}
                  submit={modalTogle}>
                  {item.name}
                </UserListItem>
              );
            })
          ) : (
            <EmptyView>등록된 친구가 없습니다.</EmptyView>
          )}
          <BlankView height={'10px'} />
        </ScrollList>
      </Wrap>
      <OptionalModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={reqRelationDelete}>
        {` 기억공간을 비공개로 변경하면 등록된 친구만 찾아올 수 있습니다.

        ${deleteTarget ? deleteTarget.name : ''}을(를) 삭제하시겠습니까?`}
      </OptionalModal>
    </SquareLayer>
  );
}

const data2 = [
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호0',
    relationName: '친구',
  },
  {
    relationId: 1,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호1',
    relationName: '친구',
  },
  {
    relationId: 2,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호2',
    relationName: '친구',
  },
  {
    relationId: 3,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
  {
    relationId: 0,
    concernUid: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    name: '무야호',
    relationName: '친구',
  },
];
