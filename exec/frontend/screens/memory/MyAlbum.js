import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import { Block, Text } from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilValue } from 'recoil';
import { userIdState, deadIdState } from '../../atoms';
import AlertModal from '../../components/styled/extended/AlertModal';

const MyAlbum = ({ navigation }) => {
  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModalMessage, setAlertModalMessage] = useState(false);
  const [NullCheck, setNullCheck] = useState(false);

  const userId = useRecoilValue(userIdState);
  const deadId = useRecoilValue(deadIdState);

  const [FocusedModal, setFocusedModal] = useState(false);
  const [FocusedPhoto, setFocusedPhoto] = useState([]);
  const [PhotoInfo, setPhotoInfo] = useState([]);
  const Focus = value => {
    setFocusedPhoto(value);
    setFocusedModal(true);
  };
  const init = async () => {
    try {
      const res = await albumApi.init({
        deadId
      });
      res.data.length < 1
        ? // setAlertModalState(true),
        (setAlertModalMessage('등록된 게시물이 없습니다.'),
          setNullCheck(true))
        : (setPhotoInfo(res.data), setNullCheck(false));
    } catch (error) {
      setAlertModalMessage('사용할 수 없는 서비스입니다');
      setNullCheck(true);
    }
  };

  useEffect(async () => {
    init();
  }, [deadId]);

  return (
    <View style={styles.container}>
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
              style={{ flex: 6.7, width: Dimensions.get('window').width * 0.93 }}>
              {FocusedModal === false ? (
                <Text></Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}>
                  {FocusedPhoto.imageUrl.map((image, idx) => (
                    <View key={idx} style={styles.focusedCard}>
                      <Image source={{ uri: image }} style={styles.img} />
                    </View>
                  ))}
                </ScrollView>
              )}

              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  paddingHorizontal: Dimensions.get('window').width * 0.05,
                  height: Dimensions.get('window').height * 0.1,
                }}>
                <Text gray style={{ flex: 2, fontSize: 11 }}>
                  {FocusedPhoto.createdAt}
                </Text>
                <Text style={{ flex: 8, marginTop: 10, fontSize: 14 }}>
                  {FocusedPhoto.contents}
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>

      <View>
        {NullCheck ? (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{AlertModalMessage}</Text>
          </View>
        ) : (
          <ScrollView
            horizontal={false}
            showsHorizontalScrollIndicator={false}
            style={{
              width: Dimensions.get('window').width * 1,
            }}>
            <Block flex={false} row style={styles.album}>
              {PhotoInfo.map((photo, idx) => (
                <TouchableOpacity key={idx} onPress={() => Focus(photo)}>
                  <Block style={styles.mine}>
                    {/* {photo.imageUrl.map(image => ( */}
                    <Image
                      source={{ uri: photo.imageUrl[0] }}
                      style={styles.img}
                    />

                    {/* ))} */}
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
      </View>
    </View>
  );
};

export default MyAlbum;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
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
    height: Dimensions.get('window').height * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  modalTop: {
    width: Dimensions.get('window').width * 0.93,
    height: Dimensions.get('window').height * 0.05,
    // backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    // borderRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
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
  mine: {
    minWidth: Dimensions.get('window').width * 0.329,
    maxHeight: Dimensions.get('window').width * 0.329,
    margin: 0.7,
    borderRadius: 0,
    borderWidth: 0.4,
    borderColor: '#000',
  },
  img: {
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',
  },
  album: {
    flexWrap: 'wrap',
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
