import React, {useState} from 'react';
import {Image, StyleSheet, Pressable, View, Dimensions} from 'react-native';
import {Block, Badge, Text, Button} from '../../components';
import {theme} from '../../constants';
import * as deadApi from '../../api/deadHttp/dead';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  murmurDateState,
  isMurmurDateState,
  cemeteryDateState,
  addMurMurState, // 추가 -young
  addCemeteryState, // 추가 -young
  userIdState,
  imagePickerState,
  deadImageUrlState,
} from '../../atoms';
import {useRecoilState, useRecoilValue} from 'recoil';
// profile update - 용렬
import FloatView from '../../components/styled/FloatView';
import ImagePickerModal from '../../components/styled/extended/ImagePickerModal';
import styled from 'styled-components';
import AlertModal from '../../components/styled/extended/AlertModal';
import moment from 'moment';

const Info = ({navigation, route}) => {
  const [murmurDate, setMurMurDate] = useRecoilState(murmurDateState);
  const [isMurmurDate, setIsMurMurDate] = useState(true);
  const [cemeteryDate, setCemetryDate] = useRecoilState(cemeteryDateState);
  const uid = useRecoilValue(userIdState);
  const [calendalVisible, setCalendarVisible] = useState(false);
  const [portraitUrl, setPortraitUrl] = useState(null);
  const value = route.params.selected;

  //추가 -young
  const [addMurMur, setAddMurMur] = useRecoilState(addMurMurState);
  const [addCemetery, setAddCemetery] = useRecoilState(addCemeteryState);
  // modal 토글용
  const [modalVisible, setModalVisible] = useRecoilState(imagePickerState);
  const [imagePickerVisibled, setImagePickerVisibled] = useState(false);
  const [deadImageUrl, setDeadImageUrl] = useRecoilState(deadImageUrlState);
  // alert
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);
  // datepicker

  const changeDate = date => {
    let now = moment(date).format('YYYY-MM-DD');
    if (isMurmurDate == true) {
      console.log(now, 'murmurDate');
      setMurMurDate(now);
    } else {
      if (moment(murmurDate).diff(now) > 0) {
        setAlertModalMessage(`별세일보다 뒤의 날짜를 선택해주세요.`);
        setAlertModalState(true);
      } else {
        console.log(now, 'cemetryDate');
        setCemetryDate(now);
      }
    }
    setCalendarVisible(false);
  };

  const init = async () => {
    setMurMurDate(null);
    setCemetryDate(null);
    setIsMurMurDate(false);
    setAddMurMur(null);
    setAddCemetery(null);
    setPortraitUrl(null);
    setDeadImageUrl(null);
    const res = await deadApi.getDeadInfo(value.concernUid, uid);
    if (res.data.data.portraitUrl !== null) {
      setPortraitUrl(res.data.data.portraitUrl);
    }
  };
  React.useEffect(() => {
    init();
  }, []);

  const submit = imageUrl => {
    console.log(imageUrl);
    setPortraitUrl(imageUrl);
  };

  return (
    <View
      style={{
        backgroundColor: 'white',
        paddingTop: 10,
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
      }}>
      {/* 달력 모달 */}
      <DateTimePickerModal
        isVisible={calendalVisible}
        value={new Date()}
        mode="date"
        onConfirm={changeDate}
        onCancel={() => {
          setCalendarVisible(false);
        }}
      />

      {/* 상단 고인 이미지 등록 창 */}
      <Block flex={false} center height={150}>
        {portraitUrl ? (
          <ImageWrap disabled={true}>
            <ProfileImage
              source={
                portraitUrl !== null
                  ? {uri: portraitUrl}
                  : require('../../assets/essential/user.png')
              }
            />
          </ImageWrap>
        ) : (
          <>
            <ImageWrap onPress={() => setModalVisible(true)}>
              <ProfileImage
                source={
                  portraitUrl !== null
                    ? {uri: portraitUrl}
                    : require('../../assets/essential/user.png')
                }
              />
              <FloatView top={'0px'} right={'0px'}>
                <PlusIcon source={require('../../assets/icons/plus-w-p.png')} />
              </FloatView>
            </ImageWrap>
            <ImagePickerModal
              submit={submit}
              deadId={value.concernUid}
              visible={imagePickerVisibled}
            />
          </>
        )}
      </Block>

      <Block flex={2.2}>
        {/* 고인 성함  */}
        <Block
          flex={1}
          row
          space="between"
          style={{
            height: '10%',
            marginBottom: 10,
            paddingTop: 18,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text style={styles.title}>고인성함</Text>
          <Text style={styles.datas}>{value.name}</Text>
          <Text flex={0.8}></Text>
        </Block>
        {/* 별세일 */}
        <Block flex={1} row space="between" style={styles.info_input}>
          <Text style={styles.title}>별세일</Text>
          <Text style={styles.datas}>{murmurDate}</Text>
          <Pressable
            flex={0.8}
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setCalendarVisible(true);
              setIsMurMurDate(true);
            }}>
            <Image
              source={require('../../assets/essential/calendar.png')}
              style={styles.icon}
            />
          </Pressable>
        </Block>
        {/* 발인일 */}
        <Block flex={1} row space="between" style={styles.info_input}>
          <Text style={styles.title}>발인일</Text>
          <Text style={styles.datas}>{cemeteryDate}</Text>
          <Pressable
            flex={0.8}
            style={[styles.button, styles.buttonOpen]}
            onPress={() => {
              setCalendarVisible(true);
              setIsMurMurDate(false);
            }}>
            <Image
              source={require('../../assets/essential/calendar.png')}
              style={styles.icon}
            />
          </Pressable>
        </Block>
        {/* 장례식장 */}
        <Block flex={1} row space="between" style={styles.info_input}>
          <Text style={styles.title}>장례식장</Text>
          <Text style={styles.datas}>
            {addMurMur === null ? '' : addMurMur.name}
          </Text>
          <Pressable
            flex={0.8}
            style={[styles.button, styles.buttonOpen]}
            onPress={() => navigation.navigate('MapSearch', {check: 1})}>
            <Image
              source={require('../../assets/essential/map.png')}
              style={styles.icon}
            />
          </Pressable>
        </Block>
        {/* 장지 */}
        <Block
          flex={1}
          row
          space="between"
          style={{
            // height: '10%',
            // paddingBottom: 19,
            paddingTop: 10,
            borderBottomWidth: 1,
            borderColor: '#ccc',
          }}>
          <Text style={styles.title}>장지</Text>
          <Text style={styles.datas}>
            {/* {addCemetery === null ? '장지를 입력해주세요' : addCemetery.name} */}
            {addCemetery === null ? '' : addCemetery.name}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            flex={0.8}
            onPress={() => navigation.navigate('MapSearch', {check: 2})}>
            <Image
              source={require('../../assets/essential/map.png')}
              style={styles.icon}
            />
          </Pressable>
        </Block>
      </Block>
      {/* 다음 버튼 */}
      <Block>
        <Button
          color={theme.colors.black}
          style={styles.nextButton}
          onPress={() => {
            if (murmurDate === null) {
              setAlertModalMessage(`별세일을 입력해주세요.`);
              setAlertModalState(true);
            } else if (cemeteryDate === null) {
              setAlertModalMessage(`발인일을 입력해주세요.`);
              setAlertModalState(true);
            } else if (addMurMur === null) {
              setAlertModalMessage(`장례장소를 입력해주세요.`);
              setAlertModalState(true);
            } else if (addCemetery === null) {
              setAlertModalMessage(`장지를 입력해주세요.`);
              setAlertModalState(true);
            } else if (portraitUrl === null) {
              setAlertModalMessage(`사진을 등록해주세요.`);
              setAlertModalState(true);
            } else {
              navigation.navigate('Regist', {
                deadId: value.concernUid,
                portraitUrl: portraitUrl,
              });
            }
            // navigation.navigate('Regist', {
            //   deadId: value.concernUid,
            // });
          }}>
          <Text white center bold style={{fontSize: 16}}>
            다음
          </Text>
        </Button>
      </Block>
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feed: {
    borderRadius: 500,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  info_input: {
    // height: '10%',
    marginBottom: 10,
    marginTop: 10,
    height: theme.sizes.base * 3,
    borderBottomWidth: 1,
    // borderTopWidth: 1,
    borderBottomColor: '#ccc',
  },
  button: {
    borderRadius: 20,
    // padding: 10,
    // elevation: 2
  },
  buttonOpen: {
    // backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    width: theme.sizes.base * 1.5,
    height: theme.sizes.base * 1.5,
  },
  nextButton: {
    width: Dimensions.get('window').width * 0.6,
    alignSelf: 'center',
    borderRadius: 300,
    height: 45,
  },
  title: {
    fontSize: 17,
    flex: 2,
    fontWeight: 'bold',
    // width: 100,
  },
  datas: {
    fontSize: 17,
    flex: 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    height: '90%',
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 30,
  },
});

const ImageWrap = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width * 0.3}px;
  height: ${Dimensions.get('window').width * 0.3}px;
  aspect-ratio: 1;
  padding: 3px;
  border: 2px solid black;
  border-radius: 200px;
`;
const ProfileImage = styled.Image`
  border-radius: 80px;
  width: 100%;
  height: 100%;
`;
const PlusIcon = styled.Image`
  width: 32px;
  height: 32px;
  background-color: black;
  border-radius: 16px;
`;
