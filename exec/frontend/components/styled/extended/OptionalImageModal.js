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
import FloatView from '../FloatView';
import ButtonDel from '../ButtonDel';
import GInput from '../GInput';
import BlankView from '../BlankView';
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
    marginTop: 20,
    marginBottom: 15,
  },
});

const OptionalModal = props => {
  // button 연속클릭 방지
  let buttonDisabled = false;
  // hook
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const messageUpdate = value => {
    setMessage(value);
    props.submit2(value);
  };
  // callback
  const onSubmit = async () => {
    buttonDisabled = true;
    if (!buttonDisabled) return;
    try {
      setMessage('');
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

  console.log(props);

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
          <HorizontalScroll horizontal={true}>
            <BlankView width={'5px'} />
            {props.images.length !== 0
              ? props.images.map((item, index) => {
                  return (
                    <ImageWrap key={index}>
                      <GImage source={{uri: item.uri}} />
                      <Label numberOfLines={1}>{message}</Label>
                    </ImageWrap>
                  );
                })
              : null}
            <BlankView width={'5px'} />
          </HorizontalScroll>
          <Row
            style={{
              marginTop: 5,
              paddingLeft: 10,
              paddingRight: 10,
              paddingBottom: 23,
              borderBottomWidth: 1,
              borderBottomColor: '#cccccc',
            }}>
            <GInput
              placeholder={'여기에 글을 남겨주세요.'}
              style={{flex: 1}}
              value={message}
              returnKeyType="search"
              onChangeText={messageUpdate}
              maxLength={200}
              // onSubmitEditing={handleKeyDown}
              mr={'30px'}
              ml={'4px'}
            />
            <FloatView top={'4px'} right={'14px'}>
              <ButtonDel
                width={'24px'}
                height={'24px'}
                bc={'#999999'}
                fontSize={'10px'}
                br={'6px'}
                onPress={() => {
                  setMessage('');
                }}
              />
            </FloatView>
          </Row>
          <Text style={styles.modalText}>{props.children}</Text>
          <Row>
            <Button
              width={'45%'}
              style={{elevation: 10}}
              bc={'#F75450'}
              active={true}
              mt={'5px'}
              onPress={() => {
                props.modalTogle();
                setMessage('');
              }}>
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

const imageSize = Dimensions.get('window').width * 0.22;
const HorizontalScroll = styled.ScrollView`
  flex-direction: row;
  width: 100%;
`;
const ImageWrap = styled.View`
  width: ${imageSize + 12}px;
  height: ${imageSize + 25}px;
  padding: 5px 20px
  align-items: center;
  margin: 10px 5px 20px;
  border: 1px solid #fdfdfd;
  background-color:white;
  border-radius: 5px;
  elevation: 8;
  `;
const GImage = styled.Image`
  height: ${imageSize}px;
  aspect-ratio: 1;
  border-radius: 3px;
  background-color: #cccccc;
`;
const Label = styled.Text`
  margin-top: 4px;
  width: 50px;
  text-align: center;
  overflow: hidden;
  font-size: 7px;
`;
