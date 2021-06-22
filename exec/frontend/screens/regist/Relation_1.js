import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Block, Text, Button, TitleBox} from '../../components';
import {RadioButton} from 'react-native-paper';
import {theme} from '../../constants';
import * as relationApi from '../../api/authHttp/relation';
import {userIdState} from '../../atoms';
import {useRecoilValue} from 'recoil';
import AlertModal from '../../components/styled/extended/AlertModal';

const CheckRelation = ({navigation}) => {
  // useState
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  const [relations, setRelations] = useState([]);
  const [selected, setSelected] = useState(null);
  const uid = useRecoilValue(userIdState);

  const init = async () => {
    const response = await relationApi.getDead(uid);
    // 가족관계 모두 고인등록했을때 테스트용
    // const response = await relationApi.getFamily(uid);
    setRelations(response.data.data);
  };
  React.useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      init();
    });
    return refresh;
  }, [navigation]);

  return (
    <Block style={{backgroundColor: 'white'}}>
      <TitleBox color={theme.colors.white} style={styles.titlebox}>
        <Text
          style={{
            fontSize: 20,
            alignSelf: 'center',
          }}>
          어떤 분을 추모하시겠습니까?
        </Text>
      </TitleBox>
      {relations.length === 0 || relations === null ? (
        <Block flex={1}>
          <Block flex={3.2} style={styles.blank}>
            <Text center>추모할 가족이 없습니다</Text>
          </Block>
          <Block>
            <Button
              onPress={() => navigation.navigate('AddRelation')}
              color={theme.colors.black}
              style={styles.nextButton}>
              <Text white center bold style={{fontSize: 16}}>
                가족관리
              </Text>
            </Button>
          </Block>
        </Block>
      ) : (
        <Block>
          <Block flex={3.2}>
            <RadioButton.Group
              onValueChange={newValue => setSelected(newValue)}
              value={selected}>
              {relations.map(person => (
                <Block
                  flex={false}
                  row
                  key={person.concernUid}
                  style={styles.person}>
                  <RadioButton value={person} color="black" />
                  {/* <TouchableOpacity> */}
                  <Block space="between" row marginTop={5}>
                    <Text>{person.relationName}</Text>
                    <Text>{person.name}</Text>
                  </Block>
                  {/* </TouchableOpacity> */}
                </Block>
              ))}
            </RadioButton.Group>
          </Block>
          <Block>
            <Button
              color={theme.colors.black}
              style={styles.nextButton}
              onPress={() => {
                if (selected === null) {
                  setAlertModalMessage(`등록하실 가족을 선택해주세요.`);
                  setAlertModalState(true);
                } else navigation.navigate('Info', {selected});
              }}>
              <Text white center bold style={{fontSize: 16}}>
                다음
              </Text>
            </Button>
          </Block>
        </Block>
      )}
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
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
    width: '100%',
    borderRadius: 200,
    // left: 10,
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
  blank: {
    justifyContent: 'center',
  },
});
