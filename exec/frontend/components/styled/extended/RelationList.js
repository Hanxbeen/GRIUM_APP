import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import {useSpring, animated} from '@react-spring/native';
// custom component
import SquareView from '../SquareView';
import GText from '../GText';
import {Row} from '../basic/View';
import {HightlightTextML} from '../basic/Text';
import Button from '../Button';
import OptionalModal from './OptionalModal';
import ButtonDel from '../ButtonDel';
// http api
import * as relationApi from '../../../api/authHttp/relation';
// recoil
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../../atoms';

const RelationItem = styled.View`
  flex-direction: row;
  width: 100%;
  height: 42px;
  align-items: center;
  justify-content: center;
`;

export default function RelationList(props) {
  // hook
  const [deleteMode, setDeleteMode] = useState(false);
  const [familyList, setFamilyList] = useState([]);
  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  // spring animation
  const increase = useSpring({
    width: deleteMode ? 32 : 0,
    height: 32,
    backgroundColor: 'red',
    marginLeft: deleteMode ? 10 : 0,
    justifyContent: 'center',
    alineItems: 'center',
    borderRadius: 10,
  });
  // recoil state
  const uid = useRecoilValue(userIdState);

  const modalTogle = target => {
    if (target) {
      setDeleteTarget(target);
    }
    setOptianlModalVisibled(!optianlModalVisibled);
  };

  const reqDeleteRelation = async () => {
    try {
      const resDeleteRelation = await relationApi.deleteRelation(
        uid,
        deleteTarget.relationId,
      );
      if (resDeleteRelation.status === 204) {
        modalTogle(null);
        init();
      }
    } catch (error) {
      console.log('가족관계 삭제 중 문제 발생', error);
    }
  };

  const init = async () => {
    try {
      const resFamily = await relationApi.getFamily(uid);
      if (resFamily.status === 200) {
        console.log(resFamily.data.data);
        setFamilyList(resFamily.data.data);
      }
    } catch (error) {
      console.log('가족관계 가져오는 도중 문제 발생', error);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <SquareView
      label={'가족관계'}
      width={`${Dimensions.get('window').width - 40}px`}
      mLR={'20px'}>
      {familyList.length !== 0
        ? familyList.map((item, index) => {
            return (
              <RelationItem key={`${item.relationId}${index}`}>
                <GText height={'32px'} color={'gray'} fontSize={'14px'}>
                  나의
                </GText>
                <HightlightTextML>{item.relationName}</HightlightTextML>
                <GText height={'32px'} color={'gray'}>
                  인
                </GText>
                <HightlightTextML>{item.name}</HightlightTextML>
                <animated.View style={increase}>
                  {deleteMode ? (
                    <ButtonDel
                      onPress={() => {
                        modalTogle(item);
                      }}
                      active={deleteMode}
                      width={'100%'}
                    />
                  ) : null}
                </animated.View>
              </RelationItem>
            );
          })
        : null}
      <Row style={{marginTop: 8}}>
        <Button
          active={deleteMode}
          width={'48.5%'}
          onPress={() => setDeleteMode(!deleteMode)}>
          {deleteMode ? '삭제 버튼 숨기기' : '삭제 버튼 보이기'}
        </Button>
        <Button
          active={true}
          width={'48.5%'}
          onPress={() => props.navigation.navigate('AddRelation')}>
          {`   가족관리    ≫`}
        </Button>
      </Row>
      <OptionalModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={reqDeleteRelation}>
        {` 삭제한 가족은 가족관리 페이지에서 다시 추가할 수 있습니다.

        ${deleteTarget ? deleteTarget.name : ''}을(를) 삭제하시겠습니까?`}
      </OptionalModal>
    </SquareView>
  );
}
