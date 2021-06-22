import React, {useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
// custom component
import BasicInfo from '../../../components/styled/extended/BasicInfo';
import EtcSetting from '../../../components/styled/extended/EtcSetting';
import RelationList from '../../../components/styled/extended/RelationList';
import BlankView from '../../../components/styled/BlankView';
import HorizontalImage from '../../../components/styled/extended/HorizontalImage';
import Button from '../../../components/styled/Button';
import {Subtitle} from '../../../components/styled/basic/Text';
// recoile
import {useRecoilValue, useRecoilState} from 'recoil';
import {
  userIdState,
  imageUrlState,
  deadInfoState,
  deadIdState,
  liveState,
} from '../../../atoms';
// http api
import * as userApi from '../../../api/authHttp/user';
import * as deadApi from '../../../api/deadHttp/dead';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../../../components/styled/extended/AlertModal';

// memory main function
export default function Memory({navigation}) {
  // react hook
  const [relationList, setRelationList] = useState(null);
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  // recoil state
  const uid = useRecoilValue(userIdState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const [deadInfo, setDeadInfo] = useRecoilState(deadInfoState);
  const [deadId, setDeadId] = useRecoilState(deadIdState);
  const [live, setLive] = useRecoilState(liveState);

  // 기억공간 공개 여부
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = async () => {
    try {
      const resDeadState = await deadApi.putDeadStatus({
        deadId: deadInfo.deadId,
        userId: uid,
        status: !isEnabled,
      });
      if (resDeadState.status === 200) {
        setIsEnabled(resDeadState.data.status);
      }
    } catch (error) {
      setAlertModalMessage('서버와 통신 중 문제가 발생했습니다.');
      setAlertModalState(true);
    }
  };

  const putUser = async () => {
    try {
      const response = await userApi.putUser({
        uid: uid,
        birthday: deadInfo.birthday,
        birthyear: deadInfo.birthyear,
        commentForCondolence: deadInfo.commentForCondolence,
      });
    } catch (error) {
      setAlertModalMessage('유저 정보를 가져오는 도중 문제가 발생했습니다.');
      setAlertModalState(true);
    }
  };

  const init = async () => {
    try {
      // dead 정보 조회
      const resDeadInfo = await deadApi.getDeadInfo(uid, uid);
      if (resDeadInfo.status === 200) {
        // 1. atoms(deadInfoState)에 반
        setDeadInfo(resDeadInfo.data.data);
        setImageUrl(resDeadInfo.data.data.portraitUrl);
        // 2. 관계 리스트 할당
        setRelationList(resDeadInfo.data.data.familyRelations);
        // 3. 기타 설정 토글 상태 반영
        setIsEnabled(resDeadInfo.data.data.public);
      }
    } catch (error) {
      console.log(`memory page init error:${error}`);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView style={styles.scrollContainer}>
      <Subtitle>나를 표현해보세요</Subtitle>
      <BasicInfo submit={putUser} />
      <RelationList value={relationList} navigation={navigation} />
      <EtcSetting
        submit={toggleSwitch}
        value={isEnabled}
        navigation={navigation}
      />
      <HorizontalImage mb={'10px'} />
      <Button
        active={true}
        mr={'20px'}
        ml={'20px'}
        style={{borderRadius: 100, alignSelf: 'center'}}
        width={'60%'}
        onPress={async () => {
          setDeadId(uid);
          setLive(true);
          navigation.navigate('Frame', {
            id: uid,
            live: true,
          });
        }}>
        {`기억공간 미리보기`}
      </Button>
      <BlankView height={Platform.OS === 'ios' ? '80px' : '65px'} />
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: 'white',
    minHeight: '100%',
  },
});
