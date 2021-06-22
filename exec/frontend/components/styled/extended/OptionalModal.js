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
import styled from 'styled-components/native';
import produce from 'immer';
// custom component
import Button from '../Button';
import {Row} from '../basic/View';
// recoil
import {useRecoilState, useRecoilValue} from 'recoil';
import {imagePickerState, userIdState, deadInfoState} from '../../../atoms';
// REST API
import * as deadApi from '../../../api/deadHttp/dead';

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
  },
});

const OptionalModal = props => {
  let buttonDisabled = false;
  const [modalVisible, setModalVisible] = useState(false);

  // callback
  const onSubmit = async () => {
    buttonDisabled = true;
    try {
      props.submit();
    } catch (error) {
      console.log(error);
    }
    setTimeout(() => {
      buttonDisabled = false;
    }, 1000);
  };

  React.useEffect(() => {
    setModalVisible(props.visible);
  }, [props]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        props.modalTogle();
      }}>
      <TouchableOpacity style={styles.bg} onPress={() => props.modalTogle()} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.children}</Text>
          <Row>
            <Button
              width={'45%'}
              style={{elevation: 10}}
              bc={'#F75450'}
              active={true}
              mt={'5px'}
              onPress={() => props.modalTogle()}>
              아니오
            </Button>
            <Button
              style={{elevation: 10}}
              elevation={'10'}
              width={'45%'}
              bc={'#43D4B1'}
              active={true}
              mt={'5px'}
              onPress={() => {
                if (!buttonDisabled) {
                  onSubmit();
                }
              }}>
              예
            </Button>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default OptionalModal;
