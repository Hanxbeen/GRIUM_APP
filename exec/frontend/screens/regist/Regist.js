import React, {useState} from 'react';
import {StyleSheet, Switch} from 'react-native';
import {Block, Text, Button} from '../../components';
import {theme} from '../../constants';
import * as relationApi from '../../api/authHttp/relation';
import * as deadApi from '../../api/deadHttp/dead';
import AlertModal from '../../components/styled/extended/AlertRegistModal';

import {
  murmurDateState,
  cemeteryDateState,
  addMurMurState,
  addCemeteryState,
  userIdState,
  deadIdState,
  liveState,
} from '../../atoms';
import {useRecoilValue, useRecoilState} from 'recoil';

const CheckRelation = ({navigation, route}) => {
  const murmurDate = useRecoilValue(murmurDateState);
  const cemeteryDate = useRecoilValue(cemeteryDateState);
  const addMurMur = useRecoilValue(addMurMurState);
  const addCemetery = useRecoilValue(addCemeteryState);
  const uid = useRecoilValue(userIdState);

  const [recoilDeadId, setRecoilDeadId] = useRecoilState(deadIdState);
  const [live, setLive] = useRecoilState(liveState);

  const deadId = route.params.deadId;
  const portraitUrl = route.params.portraitUrl;
  const [relations, setRelations] = useState([]);
  const [isPublic, setIsPublic] = useState(false);

  const [alertModalState, setAlertModalState] = useState(false);

  React.useEffect(async () => {
    const response = await relationApi.getFamily(deadId);
    setRelations(response.data.data);
  }, [navigation]);

  const saveAsync = async id => {
    await AsyncStorage.setItem('deadId', id);
  };

  const requestRegist = async () => {
    try {
      const payload = {
        deadId: deadId,
        userId: uid,
        imprintDate: murmurDate,
        deceasedDate: cemeteryDate,
        murmurName: addMurMur.name,
        murmurAddress: addMurMur.road,
        murmurLat: addMurMur.point.y,
        murmurLng: addMurMur.point.x,
        cemeteryName: addCemetery.name,
        cemeteryAddress: addCemetery.road,
        cemeteryLat: addCemetery.point.y,
        cemeteryLng: addCemetery.point.x,
        portraitUrl: portraitUrl,
        isPublic: isPublic,
      };
      const res = await deadApi.putDead(payload);
      if (res.status === 200) {
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleSwitch = () => {
    setIsPublic(!isPublic);
  };
  return (
    <Block style={{backgroundColor: 'white'}}>
      <AlertModal
        state={alertModalState}
        setState={() => {
          setAlertModalState(false);
          saveAsync(deadId);
          setRecoilDeadId(deadId);
          setLive(false);
          navigation.popToTop();
          navigation.navigate('Frame', {id: deadId});
        }}
        message={`삼가 故人의 冥福을 빕니다.`}
      />
      <Block flex={0.8}>
        <Text style={styles.titlebox}>공개 범위를 설정해주세요</Text>
        <Block
          flex={false}
          space="between"
          row
          marginTop={30}
          style={styles.person}>
          <Text>{isPublic !== true ? '지인' : '공개'}</Text>
          <Switch
            trackColor={{false: '#aaaaaa', true: '#666666'}}
            thumbColor={isPublic ? '#000000' : '#f4f3f4'}
            onValueChange={toggleSwitch}
            value={isPublic}
          />
        </Block>
      </Block>
      <Block flex={4} marginTop={5}>
        <Text style={styles.titlebox}>고인의 가족 관계를 확인해주세요</Text>
        <Block>
          <Block flex={false} marginTop={30}>
            {relations.map(person => (
              <Block
                flex={false}
                row
                key={person.concernUid}
                style={styles.person}>
                <Block space="between" row marginTop={5}>
                  <Text>{person.relationName}</Text>
                  <Text>{person.name}</Text>
                </Block>
              </Block>
            ))}
          </Block>
        </Block>
      </Block>
      <Block flex={1.4}>
        <Button
          color={theme.colors.black}
          style={styles.nextButton}
          onPress={() => {
            requestRegist();
            setAlertModalState(true);
          }}>
          <Text white center bold style={{fontSize: 16}}>
            등록
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default CheckRelation;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  titlebox: {
    fontSize: 20,
    alignSelf: 'center',
  },
  nextButton: {
    width: '60%',
    left: '20%',
    borderRadius: 300,
    height: 45,
  },
  person: {
    margin: 10,
    height: theme.sizes.base * 2,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
