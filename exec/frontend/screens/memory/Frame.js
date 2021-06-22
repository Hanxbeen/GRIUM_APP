import React, { useState, useEffect } from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { Block, Badge, Text } from '../../components';
import { theme } from '../../constants';
import MemoryTab from '../../navigation/MemoryTab';
import axios from 'axios';
import { DeviceEventEmitter } from 'react-native';
import { useRecoilValue } from 'recoil';
import { userIdState, deadIdState, liveState } from '../../atoms';
// http api
import * as goneApi from '../../api/memoryHttp/gone';

// main
const Frame = ({ navigation, route }) => {
  const [UserName, setUserName] = React.useState('로딩 중');
  const [UserBirthday, setUserBirthday] = useState('');
  const [DeceasedDay, setDeceasedDay] = useState('');
  const [CondolenceCnt, setCondolenceCnt] = useState(0);
  const [ContentSize, setContentSize] = useState(0);
  const [commentForCondolence, setcommentForCondolence] = useState(
    '방문해주신 여러분,\n언제 어디서나 행복하세요.',
  );
  const [PortraitUrl, setPortraitUrl] = useState('../../assets/mock/user.png');
  const [stateTest, setstateTest] = useState(
    '../../assets/essential/heart.png',
  );
  const [CondolenceCheck, setCondolenceCheck] = useState(false);

  // 2021-05-20 01:05:38 AM byr recoil
  const userId = useRecoilValue(userIdState);
  const deadId = useRecoilValue(deadIdState);
  const Live = useRecoilValue(liveState);

  useEffect(() => {
    // Main으로 갈때 이벤트 발생
    DeviceEventEmitter.emit('backToMain');
  }, []);


  const init = async () => {
    const DEAD_ID = route.params.id;

    try {
      const response = await goneApi.init({
        DEAD_ID, userId
      });

      setUserName(response.data.data.name);
      setDeceasedDay(response.data.data.deceasedDate);
      setCondolenceCnt(response.data.data.condolenceCount);
      setContentSize(response.data.data.userImagesCount);
      setPortraitUrl(response.data.data.portraitUrl);
      setCondolenceCheck(response.data.data.condolenceCheck);
      setUserBirthday(
        response.data.data.birthyear +
        '-' +
        response.data.data.birthday[0] +
        response.data.data.birthday[1] +
        '-' +
        response.data.data.birthday[2] +
        response.data.data.birthday[3],
      );

      response.data.data.commentForCondolence == null
        ? setcommentForCondolence(commentForCondolence)
        : setcommentForCondolence(response.data.data.commentForCondolence);
    } catch (error) {
      setAlertModalMessage('사용할 수 없는 서비스입니다');
      setNullCheck(true);
    }
  };


  const condolence = async () => {
    let condolence_data = {
      deadId,
      userId,
    };

    try {
      const response = await goneApi.condolence(
        condolence_data
      );
      setCondolenceCheck(response.data.condolenceCheck);
      init();

    } catch (error) {
      console.log(err);
    }
  };

  useEffect(() => {
    init();
  }, [deadId]);

  return (
    <Block backgroundColor="white">
      <Block flex={false} row center space="between" style={styles.header}>
        <Block
          style={{ paddingVertical: theme.sizes.base * 1 }}
          row
          space="between">
          <TouchableOpacity>
            <Badge
              style={{ borderWidth: 2 }}
              center
              middle
              margin={15}
              size={140}>
              <Image
                source={
                  PortraitUrl == null
                    ? require('../../assets/mock/user.png')
                    : { uri: PortraitUrl }
                }
                style={
                  PortraitUrl === '' ? { width: 50, height: 50 } : styles.profile
                }
              />
            </Badge>
          </TouchableOpacity>
          <Block style={{ marginLeft: 3, marginRight: 10, marginTop: 5 }}>
            <Block style={{ flex: 0.5 }}></Block>
            <Text bold style={{ flex: 1.5, fontSize: 14 }}>
              {UserName}
            </Text>
            <Text
              gray2
              style={{
                fontSize: 11,
                marginTop: 7,
                // marginBottom: 7,
              }}>
              {UserBirthday} ~ {DeceasedDay}
            </Text>
            <Block row style={{ flex: 5 }}>
              <ScrollView
                horizontal={false}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginBottom: 3,
                  width: '100%',
                }}>
                <Text
                  style={{
                    fontSize: 13,
                    marginTop: 4,
                  }}>
                  {commentForCondolence}
                </Text>
              </ScrollView>
            </Block>

            <Block row style={{ flex: 2.2, marginTop: 2 }}>
              <View
                style={{
                  flex: 3.5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {!Live ? (
                  <TouchableOpacity
                    style={{
                      width: 30,
                      height: 30,
                      flex: 4,
                    }}
                    onPress={() => {
                      condolence();
                    }}>
                    <Image
                      source={
                        CondolenceCheck == false
                          ? require('../../assets/essential/heart.png')
                          : require('../../assets/essential/hearted.png')
                      }
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      flex: 4,
                    }}>
                    <Image
                      source={require('../../assets/essential/heart.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                )}

                <View style={{ flex: 1 }}></View>
                <Text
                  style={{
                    fontSize: 12,
                    flex: 6,
                  }}>
                  {CondolenceCnt}
                </Text>
              </View>
              <View
                style={{
                  flex: 3.5,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    width: 20,
                    height: 20,
                    flex: 4,
                  }}>
                  <Image
                    source={require('../../assets/essential/gonegallery.png')}
                    style={styles.icon}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: 12,
                    flex: 6,
                  }}>
                  {ContentSize}
                </Text>
              </View>
              <View style={{ flex: 3, flexDirection: 'row' }}></View>
            </Block>
          </Block>
        </Block>
      </Block>

      <Block>
        <MemoryTab />
      </Block>
    </Block>
  );
};
export default Frame;

const styles = StyleSheet.create({
  profile: {
    width: '100%',
    height: '100%',
    borderRadius: 1000,
  },

  icon: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
    flex: 3,
  },
});
