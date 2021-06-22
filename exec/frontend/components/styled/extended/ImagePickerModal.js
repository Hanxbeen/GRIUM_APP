import React, {useState} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import produce from 'immer';
// custom component
import Button from '../Button';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  imagePickerState,
  userIdState,
  deadInfoState,
  imageUrlState,
  deadImageUrlState,
} from '../../../atoms';
// REST API
import * as deadApi from '../../../api/deadHttp/dead';
import {transform} from '@babel/core';

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#33333333',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

// 이미지 formData 변환
const transFormData = (userId, getImage) => {
  const formData = new FormData();
  formData.append('deadId', userId);
  formData.append('userId', userId);
  formData.append('imageUrl', null);
  formData.append('file', {
    uri: getImage.uri,
    type: getImage.type,
    name: getImage.fileName,
  });
  return formData;
};

const ImagePickerModal = props => {
  // recoil state
  const [modalVisible, setModalVisible] = useRecoilState(imagePickerState);
  const [deadInfo, setDeadInfo] = useRecoilState(deadInfoState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const [deadImageUrl, setDeadImageUrl] = useRecoilState(deadImageUrlState);
  const uid = useRecoilValue(userIdState);

  // imagePicker
  const [response, setResponse] = React.useState(null);

  // image 서버로 전송
  const requestImage = async () => {
    try {
      let payload;
      if (!props.deadId) {
        payload = transFormData(uid, response);
      } else {
        payload = transFormData(props.deadId, response);
      }
      console.log('이미지 업로드', payload);
      const resUpload = await deadApi.putDeadPortrait(payload);
      console.log('이미지 업로드 reponse', resUpload);
      if (resUpload.status === 200) {
        console.log('resUpload', resUpload);
        if (!props.deadId) {
          const newDeadInfo = produce(deadInfo, draft => {
            draft.portraitUrl = resUpload.data.portraitUrl;
          });
          setDeadInfo(newDeadInfo);
          setImageUrl(newDeadInfo.portraitUrl);
        } else {
          props.submit(resUpload.data.portraitUrl);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <TouchableOpacity
        style={styles.bg}
        onPress={() => setModalVisible(false)}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {response ? (
            <View style={styles.image}>
              <Image
                style={{
                  width: Dimensions.get('window').width * 0.7,
                  height: Dimensions.get('window').width * 0.7,
                  resizeMode: 'contain',
                }}
                source={{uri: response.uri}}
              />
              <Button
                style={{elevation: 10}}
                mt={'10px'}
                mb={'20px'}
                width={`${Dimensions.get('window').width * 0.7}px`}
                active={true}
                onPress={() => {
                  requestImage();
                  setModalVisible(false);
                  // setResponse(null);
                }}>
                위 사진으로 변경하기
              </Button>
            </View>
          ) : (
            <Text style={styles.modalText}>버튼을 눌러 사진 선택</Text>
          )}

          <Button
            mt={'5px'}
            onPress={() =>
              launchImageLibrary(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                response => {
                  if (response.didCancel) {
                    setResponse(null);
                  } else {
                    setResponse(response);
                  }
                },
              )
            }>
            앨범에서 가져오기
          </Button>
          <Button
            mt={'5px'}
            onPress={() =>
              launchCamera(
                {
                  mediaType: 'photo',
                  includeBase64: false,
                  maxHeight: 200,
                  maxWidth: 200,
                },
                response => {
                  if (response.didCancel) {
                    setResponse(null);
                  } else {
                    setResponse(response);
                  }
                },
              )
            }>
            촬영하여 가져오기
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
