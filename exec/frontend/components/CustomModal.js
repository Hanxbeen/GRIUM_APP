import React, {useState} from 'react';
import {Modal, StyleSheet, View, Alert} from 'react-native';
import Button from '../components/styled/Button';

import Map from '../screens/regist/Map';
import {murmurDateState, isMurmurDateState, cemeteryDateState} from '../atoms';
import {useRecoilState} from 'recoil';
import moment from 'moment';

const CustomModal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const [murmurDate, setMurMurDate] = useRecoilState(murmurDateState);
  const [isMurmurDate, setIsMurMurDate] = useRecoilState(isMurmurDateState);
  const [cemeteryDate, setCemetryDate] = useRecoilState(cemeteryDateState);

  React.useEffect(() => {
    setModalVisible(props.visible);
  }, [props]);

  // 현재 날짜
  // const currentDate = moment().add(9, 'hours').format('YYYY-MM-DD');

  console.log('props : ', props.type);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        props.modalTogle();
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Map position={props.position} placeName={props.position.name} />
          <Button
            width={'45%'}
            style={{elevation: 10}}
            bc={'#F75450'}
            active={true}
            mt={'5px'}
            onPress={() => props.modalTogle()}>
            닫기
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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

export default CustomModal;
