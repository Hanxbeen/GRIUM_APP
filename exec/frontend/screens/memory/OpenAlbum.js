import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import { Block, Card, Text, Button, Input, Badge } from '../../components';
import { theme } from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OptionalModal from '../../components/styled/extended/OptionalModal';
import AlertModal from '../../components/styled/extended/AlertModal';
const { width } = Dimensions.get('window');
// recoil
import { useRecoilValue } from 'recoil';
import {
  userIdState,
  relationCheckState,
  deadIdState,
  liveState,
} from '../../atoms';
// http api
import * as albumApi from '../../api/memoryHttp/album';


const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

// main
const OpenAlbum = ({ navigation }) => {
  const userId = useRecoilValue(userIdState);
  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const modalTogle = target => {
    if (target) {
      setDeleteTarget(target);
    }
    setOptianlModalVisibled(!optianlModalVisibled);
  };
  const [refreshing, setRefreshing] = React.useState(false);
  const [ModalOpen, setModalOpen] = useState(false);
  const [FocusedModal, setFocusedModal] = useState(false);
  const [FocusedPhoto, setFocusedPhoto] = useState('');
  const [text, setText] = useState('');
  const [IdCheck, setIdCheck] = useState('');
  const [UserIdCheck, setUserIdCheck] = useState(false);
  const [OpenPicture, setOpenPicture] = useState([]);
  const [PhotoInfo, setPhotoInfo] = useState([]);
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModalMessage, setAlertModalMessage] = useState(false);
  const [NullCheck, setNullCheck] = useState(false);

  // recoil
  const deadId = useRecoilValue(deadIdState);
  const Live = useRecoilValue(liveState);

  // 2021-05-18 04:33:23 PM byr
  const relationCheck = useRecoilValue(relationCheckState);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    try {
      const res = await albumApi.init({
        userId, deadId
      });
      setPhotoInfo(res.data.data);
      setFocusedPhoto(res.data.data);
    } catch (error) {
      // setAlertModalMessage('사용할 수 없는 서비스입니다');
      // setNullCheck(true);
      console.log(err);
    }
  }, []);

  const Focus = async value => {
    setFocusedPhoto(value);
    if (value.userId == userId) {
      setUserIdCheck(true);
    } else {
      setUserIdCheck(false);
    }
    setIdCheck(value.guestImageId);
    setFocusedModal(true);
  };

  const Delete = async () => {
    try {
      const res = await albumApi.Delete(
        userId, IdCheck
      );
      setFocusedModal(false);
      modalTogle();
      init();
      setAlertModalState(true);
      setAlertModalMessage('해당 게시글이 삭제되었습니다.');
    } catch (error) {
      console.log(err);

    }
  };

  const Report = async () => {
    const data = {
      userId,
      guestImageId: IdCheck,
    };

    if (FocusedPhoto.reportCheck == 0) {
      try {
        const res = await albumApi.Report(
          data
        );
        FocusedPhoto.reportCheck = res.reportCheck;
        setAlertModalState(true);
        setAlertModalMessage('해당 게시글이 신고되었습니다.');
        setPhotoInfo(response.data.data);
      } catch (error) {
        console.log(err);
      }
    } else {
      setAlertModalState(true);
      setAlertModalMessage('이미 신고되었습니다');
    }
  }


  const Like = async () => {
    const data = {
      userId,
      guestImageId: IdCheck,
    };

    try {
      const res = await albumApi.Report(
        data
      );
      FocusedPhoto.likeCheck = res.data.check;
      init();
    } catch (error) {
      console.log(err);
    }
  };

  const init = async () => {
    try {
      const res = await albumApi.init({
        userId, deadId
      });
      res.data.length < 1
        ? // setAlertModalState(true),
        (setAlertModalMessage('등록된 게시물이 없습니다.'),
          setNullCheck(true))
        : (setPhotoInfo(res.data.data),
          setFocusedPhoto(res.data.data),
          setNullCheck(false));
    } catch (error) {
      setAlertModalMessage('사용할 수 없는 서비스입니다');
      setNullCheck(true);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const Xbtn = () => {
    setModalOpen(false);
    setOpenPicture([]);
    setText('');
  };

  const sendImage = async () => {
    let FD = new FormData();
    FD.append('deadId', deadId);
    FD.append('userId', userId);
    FD.append('contents', text);

    if (OpenPicture.length >= 1 && text != '') {
      for (let i = 0; i < OpenPicture.length; i++) {
        FD.append(`file[${i}]`, OpenPicture[i]);
      }
      try {
        const res = await boardApi.sendImage(
          FD
        );
        setModalOpen(false);
        setAlertModalState(true);
        setAlertModalMessage('추억이 공유되었습니다.');
        setOpenPicture([]);
        setText('');
        init();
      } catch (error) {
        console.log(err);
      }
    } else if (OpenPicture.length < 1 && text == '') {
      setAlertModalState(true);
      setAlertModalMessage('사진과 글을 작성해주세요.');
    } else if (text == '') {
      setAlertModalState(true);
      setAlertModalMessage('글을 입력해주세요.');
    } else if (OpenPicture.length < 1) {
      setAlertModalState(true);
      setAlertModalMessage('사진을 선택해주세요.');
    }
  };

  const openImagePicker = () => {
    let imageList = [];
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
      mediaType: 'any',
      includeBase64: true,
    })
      .then(response => {
        response.map(image => {
          let imageArray = image.path.split('/');
          imageList.push({
            uri: image.path,
            type: image.mime,
            name: imageArray[imageArray.length - 1],
          });
        });
        imageList.length > 5
          ? (setAlertModalState(true),
            setAlertModalMessage('5개만 선택해주세요.'))
          : setOpenPicture(imageList);
      })
      .catch(err => console.log('Error: ', err.message));
  };
  return (
    <View style={styles.container}>
      {/* <RegPhotoModal /> */}
      <Modal
        animationType="fade"
        visible={ModalOpen}
        modalStyle={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
        }}>
        <TouchableOpacity onPress={() => Xbtn()} style={{ alignSelf: 'center' }}>
          {/* <Badge
            style={{borderWidth: 2, backgroundColor: '#000'}}
            margin={15}
            size={30}> */}
          <Image
            source={require('../../assets/essential/cancel.png')}
            style={{
              resizeMode: 'contain',
              width: 22,
              height: 22,
              marginTop: 20,
              tintColor: '#000',
            }}
          />
          {/* </Badge> */}
        </TouchableOpacity>
        <Text dark center bold style={{ marginTop: 30, fontSize: 15 }}>
          사진을 선택해주세요
        </Text>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ paddingVertical: theme.sizes.base * 1 }}>
          <Block flex={false} row style={styles.skyalbum}>
            {OpenPicture.map((pictures, index) => (
              <TouchableOpacity key={index}>
                <Card center shadow middle style={styles.open}>
                  <Image
                    source={{ uri: pictures.uri }}
                    style={styles.memoryPicture}
                  />
                </Card>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => openImagePicker()}>
              <Card center middle style={styles.open}>
                <Image
                  source={require('../../assets/essential/regPhoto.png')}
                  style={styles.memoryPlus}
                />
              </Card>
            </TouchableOpacity>
          </Block>
        </ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View>
            <Input
              center
              style={styles.input}
              placeholder="글을 남겨주세요."
              onChangeText={text => setText(text)}
              defaultValue={text}
            />
          </View>
        </KeyboardAvoidingView>

        <Button
          style={{
            width: '100%',
            height: 50,
            borderRadius: 0,
            marginBottom: 0,
          }}
          onPress={() => sendImage()}
          color="rgba(0,0,0,1)">
          <Text center white style style={{ fontSize: 14 }}>
            추억 공유
          </Text>
        </Button>
      </Modal>
      <OptionalModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={Delete}>
        {`삭제하면 다시 되돌릴 수 없습니다.
           \n삭제 하시겠습니까?`}
      </OptionalModal>
      <AlertModal
        state={AlertModalState}
        setState={setAlertModalState}
        message={AlertModalMessage}
      />
      <Modal animationType="fade" transparent={true} visible={FocusedModal}>
        <View style={styles.modalBackground}>
          <View style={styles.modalMain}>
            <View style={styles.modalTop}>
              <TouchableOpacity onPress={() => setFocusedModal(false)}>
                <Image
                  source={require('../../assets/essential/cancel.png')}
                  style={styles.X}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{
                // alignSelf: 'center',
                flex: 7.2,
                width: Dimensions.get('window').width * 0.93,
              }}>
              {FocusedModal === false ? (
                <Text></Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={true}>
                  {FocusedPhoto.imageUrl.map((image, idx) => (
                    <View key={idx} style={styles.focusedCard}>
                      <Image source={{ uri: image }} style={styles.img} />
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
            <View style={{ flex: 2, width: '100%', paddingTop: 10 }}>
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingHorizontal: Dimensions.get('window').width * 0.05,
                  height: Dimensions.get('window').height * 0.1,
                }}>
                <Text bold style={{ flex: 2, marginBottom: 5, fontSize: 13 }}>
                  {FocusedPhoto.name}
                </Text>
                <Text gray2 style={{ flex: 1, marginBottom: 5, fontSize: 10 }}>
                  {FocusedPhoto.createdAt}
                </Text>
                <Text style={{ flex: 7, fontSize: 12 }}>
                  {FocusedPhoto.contents}
                </Text>
              </ScrollView>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                width: Dimensions.get('window').width * 0.93,
                flex: 0.8,
                flexDirection: 'row',
                // borderWidth: 0.2,
                borderRadius: 10,
              }}>
              {UserIdCheck ? (
                <TouchableOpacity
                  style={styles.LikeAndReportTouch}
                  onPress={() => setOptianlModalVisibled(true)}>
                  <Image
                    source={require('../../assets/essential/trash.png')}
                    style={styles.LikeAndReport}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.LikeAndReportTouch}
                  onPress={() => Report()}>
                  {FocusedPhoto.reportCheck === 0 ? (
                    <Image
                      source={require('../../assets/essential/bell.png')}
                      style={styles.LikeAndReported}
                    />
                  ) : (
                    <Image
                      source={require('../../assets/essential/belled.png')}
                      style={styles.LikeAndReport}
                    />
                  )}
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.LikeAndReportTouch}
                onPress={() => Like()}>
                {!FocusedPhoto.likeCheck ? (
                  <Image
                    source={require('../../assets/essential/heart.png')}
                    style={styles.LikeAndReported}
                  />
                ) : (
                  <Image
                    source={require('../../assets/essential/hearted.png')}
                    style={styles.LikeAndReport}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {NullCheck ? (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>{AlertModalMessage}</Text>
        </View>
      ) : (
        <ScrollView
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={{ width: Dimensions.get('window').width * 1 }}>
          <Block row style={styles.album}>
            {PhotoInfo.map((photo, idx) => (
              <TouchableOpacity key={idx} onPress={() => Focus(photo)}>
                <Block style={styles.mine}>
                  <Image source={{ uri: photo.imageUrl[0] }} style={styles.img} />
                </Block>
                {photo.imageUrl.length > 1 ? (
                  <Image
                    source={require('../../assets/layer.png')}
                    style={styles.layer}
                  />
                ) : (
                  <View></View>
                )}
              </TouchableOpacity>
            ))}
          </Block>
        </ScrollView>
      )}
      {relationCheck ? (
        <TouchableOpacity
          style={styles.write}
          onPress={() => setModalOpen(true)}>
          <Card
            center
            middle
            shadow
            style={{
              borderRadius: 100,
              width: 20,
              height: 20,
              // padding: 3,
              backgroundColor: '#000',
            }}>
            <Image
              source={require('../../assets/essential/openalbum.png')}
              style={styles.writebutton}
            />
          </Card>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default OpenAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: Dimensions.get('window').height * 0.056,
    paddingBottom: Dimensions.get('window').height * 0.05,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    elevation: 100,
  },
  modalMain: {
    width: Dimensions.get('window').width * 0.93,
    height: Dimensions.get('window').height * 0.78,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalTop: {
    width: Dimensions.get('window').width * 0.93,
    height: Dimensions.get('window').height * 0.05,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    // borderWidth: 1,
  },
  X: {
    resizeMode: 'contain',
    position: 'relative',
    width: 21,
    height: 21,
    tintColor: '#000',
  },
  focusedCard: {
    width: Dimensions.get('window').width * 1,
    height: Dimensions.get('window').width * 1,
    borderWidth: 1,
    borderRadius: 0,
  },
  open: {
    marginRight: 20,
    minWidth: (width - theme.sizes.padding * 2 - theme.sizes.base) / 1,
    maxWidth: (width - theme.sizes.padding * 2 - theme.sizes.base) / 1,
    maxHeight: (width - theme.sizes.padding * 2 - theme.sizes.base) / 1,
    borderRadius: 0,
  },
  input: {
    maxWidth: Dimensions.get('window').width * 0.8,
    maxHeight: Dimensions.get('window').width * 0.5,
    borderRadius: 10,
    borderColor: '#fff',
    flexWrap: 'wrap',
    fontSize: 11,
    overflow: 'scroll',
    alignSelf: 'center',
    // flex: 1,
    // paddingBottom:100
  },
  img: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  plus: {
    backgroundColor: '#fff',
    width: '60%',
    height: '60%',
  },
  memoryPlus: {
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'contain',
    backgroundColor: '#fff',
    width: '80%',
    height: '80%',
  },
  memoryPicture: {
    backgroundColor: '#fff',
    width: '113%',
    height: '120%',
  },
  album: {
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    // paddingHorizontal: theme.sizes.base * 0.2,
    borderWidth: 0.1,
    borderColor: '#000',
  },
  skyalbum: {
    flexWrap: 'wrap',
    paddingHorizontal: theme.sizes.base * 2,
    paddingTop: Dimensions.get('window').height * 0.03,
    height: Dimensions.get('window').height * 0.6,
  },
  mine: {
    minWidth: Dimensions.get('window').width * 0.329,
    maxHeight: Dimensions.get('window').width * 0.329,
    margin: 0.7,
    borderRadius: 0,
    borderWidth: 0.4,
    borderColor: '#000',
  },

  write: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 55,
    right: 25,
    width: 35,
    height: 35,
    borderRadius: 100,
  },
  writebutton: {
    tintColor: '#fff',
    width: 20,
    height: 20,
    borderRadius: 0,
    resizeMode: 'contain',
  },
  LikeAndReport: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  LikeAndReported: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 24,
    height: 24,
  },
  LikeAndReportTouch: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  layer: {
    resizeMode: 'contain',
    position: 'absolute',
    margin: 5,
    width: 20,
    height: 20,
    tintColor: '#000',
  },
});
