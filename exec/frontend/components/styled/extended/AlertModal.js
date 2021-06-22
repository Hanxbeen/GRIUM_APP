import React, {useState} from 'react';
import {StyleSheet, Modal, View, Text, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';
// custom component
import Button from '../Button';
import {Row} from '../basic/View';

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

const AlertModal = props => {
  const [modalVisible, setModalVisible] = useState(false);

  React.useEffect(() => {
    setModalVisible(props.state);
  }, [props]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        // props.modalTogle();
        props.setState(false);
      }}>
      <TouchableOpacity
        style={styles.bg}
        onPress={() => {
          // props.modalTogle();
          props.setState(false);
        }}
      />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{props.message}</Text>
          <Row>
            <Button
              style={{elevation: 10}}
              elevation={'10'}
              width={'100%'}
              bc={'#F75450'}
              active={true}
              mt={'20px'}
              onPress={() => {
                // props.modalTogle();
                props.setState(false);
              }}>
              닫기
            </Button>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;
