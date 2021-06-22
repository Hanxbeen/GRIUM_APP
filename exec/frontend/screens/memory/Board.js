import React, { useState, useEffect } from 'react';
import { theme } from '../../constants';
import {
  View,
  StyleSheet,
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Text, Button, Input } from '../../components';
import produce from 'immer';
import OptionalModal from '../../components/styled/extended/OptionalModal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilValue } from 'recoil';
import {
  userIdState,
  relationCheckState,
  deadIdState,
  liveState,
  userNameState,
} from '../../atoms';
import AlertModal from '../../components/styled/extended/AlertModal';
// http api
import * as boardApi from '../../api/memoryHttp/board';

// main
const Board = ({ navigation }) => {
  const [NullCheck, setNullCheck] = useState(false);

  const [AlertModalState, setAlertModalState] = useState(false);
  const [AlertModalMessage, setAlertModalMessage] = useState(false);

  const [optianlModalVisibled, setOptianlModalVisibled] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const modalTogle = target => {
    setValue(target);
    if (target) {
      setDeleteTarget(target);
    }
    setOptianlModalVisibled(!optianlModalVisibled);
  };
  const [text, setText] = useState('');
  const [ModalOpen, setModalOpen] = useState(false);
  const [CommentList, setCommentList] = useState([]);
  const [Value, setValue] = useState([]);
  const [EditText, setEditText] = useState('');
  const [EditOpen, setEditOpen] = useState(false);
  const [EditData, setEditData] = useState({
    userId: '',
    guestCommentId: 0,
    contents: '',
  });

  // 2021-05-18 04:33:23 PM byr
  const relationCheck = useRecoilValue(relationCheckState);
  // recoil
  const userId = useRecoilValue(userIdState);
  const UserName = useRecoilValue(userNameState);
  const deadId = useRecoilValue(deadIdState);
  const Live = useRecoilValue(liveState);

  const init = async () => {
    try {
      const res = await boardApi.init({
        userId, deadId
      });
      res.data.data == null
        ? (setAlertModalState(true),
          setAlertModalMessage('등록된 게시물이 없습니다.'),
          setNullCheck(true))
        : (setCommentList(res.data.data), setNullCheck(false));
    } catch (error) {
      setAlertModalMessage('사용할 수 없는 서비스입니다');
      setNullCheck(true);
    }
  };

  useEffect(async () => {
    init();
  }, []);

  const Delete = async () => {
    try {
      const res = await boardApi.Delete(
        Value
      );
      init();
      modalTogle();
      // alert('해당 게시글이 삭제되었습니다.');
      setAlertModalState(true);
      setAlertModalMessage('해당 게시글이 삭제되었습니다.');

    } catch (error) {
      console.log(err);

    }
  };

  const Edit = async value => {
    const contents = value.contents;
    setEditText(contents);
    setEditOpen(true);
    const edit_comment = {
      userId: value.userId,
      guestCommentId: value.guestCommentId,
      contents: text,
    };
    setEditData(edit_comment);
  };

  const EditGo = async () => {
    EditData.contents = text;
    if (EditData.contents == '') {
      // alert('글 내용을 수정해주세요');

      setAlertModalState(true);
      setAlertModalMessage('글 내용을 수정해주세요');
    } else {
      try {
        const res = await boardApi.EditGo(
          EditData
        );
        init();
        setAlertModalState(true);
        setAlertModalMessage('해당 게시글이 수정되었습니다.');
        setEditOpen(false);
        setText('');
      } catch (error) {
        console.log(err);
      }
    }
  };
  const Report = async reportedComment => {
    const data = {
      userId,
      guestCommentId: reportedComment.guestCommentId,
    };

    if (reportedComment.reportCheck == 0) {
      try {
        const res = await boardApi.Report(
          data
        );
        reportedComment.reportCheck = res.data.check;
        init();
        setAlertModalState(true);
        setAlertModalMessage('해당 게시글이 신고되었습니다.');
      } catch (error) {
        console.log(err);
      }
    } else {
      setAlertModalState(true);
      setAlertModalMessage('이미 신고되었습니다');
    }
  };

  const Like = async (likedComment, index) => {
    const data = {
      userId,
      guestCommentId: likedComment.guestCommentId,
    };

    try {
      const res = await boardApi.Like(
        data
      );
      setCommentList(
        produce(CommentList, list => {
          list[index].likeCheck = res.data.check ? 1 : 0;
        }),
      );
      // init();
    } catch (error) {
      console.log(err);
    }
  };

  const modalX = () => {
    if (EditOpen == true) {
      setText('');
      setEditOpen(false);
    } else {
      setText('');
      setModalOpen(false);
    }
  };

  const sendComment = async () => {
    setModalOpen(false);
    const regist_comment = {
      deadId,
      userId,
      contents: text,
    };

    if (EditOpen) {
      try {
        const res = await boardApi.sendComment(
          regist_comment
        );
        setModalOpen(false);
        setText('');
        init();
      } catch (error) {
        console.log(err);
      }

    } else {
      Edit();
    }
  };

  const renderPost = (postedCommentList, index) => {
    return (
      <View style={styles.boardItem}>
        <Modal
          animationType="fade"
          visible={EditOpen}
          modalStyle={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#FFF',
          }}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => modalX()}>
              <Image
                source={require('../../assets/essential/cancel.png')}
                style={{
                  resizeMode: 'contain',
                  width: 22,
                  height: 22,
                  margin: 10,
                }}
              />
            </TouchableOpacity>
            <Button
              onPress={() => EditGo()}
              color={theme.colors.black}
              style={styles.modalbtn}>
              <Text h4 white center>
                수 정
              </Text>
            </Button>
          </View>
          <View style={{ flexDirection: 'row', marginLeft: 15 }}>
            <Image
              source={require('../../assets/essential/user.png')}
              style={styles.avatar}
            />
            <Text h2 style={{ alignSelf: 'center' }}>
              {UserName}
            </Text>
          </View>
          <View>
            <Input
              center
              style={styles.input}
              placeholder={EditText}
              onChangeText={text => setText(text)}
              defaultValue={text}
            />
          </View>
        </Modal>

        <View>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text
              bold
              style={{
                fontSize: 12,
                flex: 9,
                height: 20,
              }}>
              {postedCommentList.name}
            </Text>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}></View>
          </View>

          <Text
            gray2
            caption
            style={{ fontSize: 10, marginTop: 3, marginBottom: 3 }}>
            {postedCommentList.createdAt}
          </Text>
          <Text h4 style={{ fontSize: 12 }}>
            {postedCommentList.contents}
          </Text>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              height: 10,
              marginTop: 10,
            }}>
            <View style={{ flex: 7 }}></View>
            {postedCommentList.userId === userId ? (
              <View
                style={{
                  // flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <TouchableOpacity onPress={() => Edit(postedCommentList)}>
                  <Image
                    source={require('../../assets/essential/write.png')}
                    style={{
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      width: 20,
                      marginRight: 14,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => modalTogle(postedCommentList)}>
                  <Image
                    source={require('../../assets/essential/trash.png')}
                    style={{
                      alignSelf: 'center',
                      resizeMode: 'contain',
                      width: 20,
                      marginRight: 10,
                      height: 20,
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  flex: 1.5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => Report(postedCommentList)}>
                <Image
                  source={
                    postedCommentList.reportCheck == 0
                      ? require('../../assets/essential/bell.png')
                      : require('../../assets/essential/belled.png')
                  }
                  style={{
                    alignSelf: 'center',
                    resizeMode: 'contain',
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => Like(postedCommentList, index)}>
              <Image
                source={
                  postedCommentList.likeCheck == 0
                    ? require('../../assets/essential/heart.png')
                    : require('../../assets/essential/hearted.png')
                }
                style={{
                  alignSelf: 'center',
                  resizeMode: 'contain',
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <AlertModal
        state={AlertModalState}
        setState={setAlertModalState}
        message={AlertModalMessage}
      />
      <OptionalModal
        visible={optianlModalVisibled}
        modalTogle={modalTogle}
        submit={Delete}>
        {`다시 되돌릴 수 없습니다.
           \n 삭제 하시겠습니까?`}
      </OptionalModal>

      <Modal
        animationType="fade"
        visible={ModalOpen}
        modalStyle={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#FFF',
        }}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => modalX()}>
            <Image
              source={require('../../assets/essential/cancel.png')}
              style={{
                resizeMode: 'contain',
                width: 22,
                height: 22,
                margin: 10,
              }}
            />
          </TouchableOpacity>
          <Button
            onPress={() => sendComment()}
            color={theme.colors.black}
            style={styles.modalbtn}>
            <Text h4 white center>
              글쓰기
            </Text>
          </Button>
        </View>
        <View style={{ flexDirection: 'row', marginLeft: 15 }}>
          <Image
            source={require('../../assets/essential/user.png')}
            style={styles.avatar}
          />
          <Text h2 style={{ alignSelf: 'center' }}>
            {UserName}
          </Text>
        </View>
        <View>
          <Input
            center
            style={styles.input}
            placeholder="추억의 언어를 공유하세요."
            onChangeText={text => setText(text)}
            defaultValue={text}
          />
        </View>
      </Modal>

      {NullCheck ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{AlertModalMessage}</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={styles.board}
            data={CommentList}
            renderItem={({ item, index }) => renderPost(item, index)}
            keyExtractor={item => item.guestCommentId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}

      {relationCheck ? (
        <TouchableOpacity
          style={styles.write}
          onPress={() => setModalOpen(true)}>
          <Card
            center
            middle
            style={{
              borderRadius: 100,
              width: 20,
              height: 20,
              // padding: 3,
              backgroundColor: '#000',
            }}>
            <Image
              source={require('../../assets/essential/write.png')}
              style={styles.writebutton}
            />
          </Card>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};
export default Board;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: Dimensions.get('window').height * 0.065,
    paddingBottom: Dimensions.get('window').height * 0.065,
  },
  board: {
    marginHorizontal: 10,
    backgroundColor: '#fff1',
    // elevation: 300,
  },
  boardItem: {
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    marginVertical: 3,
    width: '100%',
    borderWidth: 0.4,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 100,
    marginRight: 15,
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
    // elevation:30
  },
  writebutton: {
    tintColor: '#fff',
    width: 17,
    height: 17,
    // borderRadius: 100,
    // resizeMode: 'contain',
  },
  modalHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalbtn: {
    width: 80,
    height: 30,
    borderRadius: 100,
  },
  input: {
    margin: 30,
    height: 400,
    borderColor: '#fff',
    width: '80%',
    flexWrap: 'wrap',
    height: '85%',
    justifyContent: 'center',
    letterSpacing: 2,
    textAlign: 'left',
  },
});
