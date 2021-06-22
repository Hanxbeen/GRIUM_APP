import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import styled from 'styled-components';
import axios from 'axios';
import { Text, Card, Button } from '../../components';
import { theme } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  userIdState,
  relationCheckState,
  deadIdState,
  liveState,
} from '../../atoms';

// 2021-05-18 bae yr
import MapModal from '../../components/MapModal';
import { initialWindowMetrics } from 'react-native-safe-area-context';
// ******* end *********

const { width } = Dimensions.get('window');
// main
const Funeral = ({ navigation, route }) => {
  const userId = useRecoilValue(userIdState);
  const [deadInfo, setDeadInfo] = useState(true);
  const [ProgressCheck, setProgressCheck] = useState(true);
  const [Good, setGood] = useState(false);
  // 2021-05-18 03:56:09 PM byr
  const [mapVisible, setMapVisible] = useState(false);
  const [mapData, setMapData] = useState('');
  const [relationCheck, setRelationCheck] = useRecoilState(relationCheckState);
  const deadId = useRecoilValue(deadIdState);
  const Live = useRecoilValue(liveState);

  const init = async () => {
    let dead_info = {
      name: '', //장례식장 이름
      address: '', //장례식장, 장지 주소
      date: '', //발인 날짜
      dateText: '발인일 : ', // 발인, 사망 표시
      familyRelations: [], //가족 관계
      // 2021-05-18 03:57:50 PM byr
      latitude: '', // 장례식장, 장지 경도
      longitude: '', // 장례식장, 장지 위도
    };

    try {
      const res = await goneApi.init({
        deadId, userId
      });
      if (res.data.progressCheck) {
        // 장례 중
        setProgressCheck(true);
        dead_info = {
          name:
            res.data.data.murmurName === ''
              ? dead_info.name
              : res.data.data.murmurName,
          address:
            res.data.data.murmurAddress === ''
              ? dead_info.address
              : res.data.data.murmurAddress,
          date: res.data.data.imprintDate,
          dateText: '발인일 : ',
          familyRelations: res.data.data.familyRelations,
          latitude: Number(res.data.data.murmurLat),
          longitude: Number(res.data.data.murmurLng),
        };
        setRelationCheck(res.data.data.relationCheck);
      } else {
        // 장례 끝
        setProgressCheck(false);
        dead_info = {
          name:
            res.data.data.cemeteryName === ''
              ? dead_info.name
              : res.data.data.cemeteryName,
          address:
            res.data.data.cemeteryAddress === ''
              ? dead_info.address
              : res.data.data.cemeteryAddress,
          latitude: Number(res.data.data.cemeteryLat),
          longitude: Number(res.data.data.cemeteryLng),
          familyRelations: res.data.data.familyRelations,
        };
      }
      setDeadInfo(dead_info);
      setGood(true);
      setMapData(dead_info);
      setRelationCheck(res.data.data.relationCheck);
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
      {!Live ? (
        <View
          style={
            {
              // marginTop: theme.sizes.base * 5,
            }
          }>
          {deadInfo.name != '' ? (
            <View
              style={{
                flex: 1.5,
                flexDirection: 'row',
                // width: Dimensions.get('window').width * 0.85,
                alignItems: 'center',
              }}>
              <Text bold style={{ flex: 3, fontSize: 14 }}>
                장소 :
              </Text>
              <Col style={{ flex: 9 }}>
                <Text style={{ fontSize: 12, marginTop: 5 }}></Text>
                <Text style={{ fontSize: 13 }}>{deadInfo.name}</Text>
                <Text style={{ fontSize: 11, marginTop: 5 }}>
                  {deadInfo.address}
                </Text>
              </Col>
              <IconButtom
                onPress={() => {
                  setMapVisible(!mapVisible);
                }}>
                <Image
                  source={require('../../assets/essential/funeraldata.png/')}
                  resizeMode="contain"
                  style={styles.icons}
                />
              </IconButtom>
            </View>
          ) : (
            <Text></Text>
          )}

          {deadInfo.date != '' ? (
            <View
              style={{
                flexDirection: 'row',
                flex: 1.5,
                alignItems: 'center',
                opacity: ProgressCheck ? 1 : 0,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text bold style={{ flex: 3, fontSize: 14 }}>
                  {deadInfo.dateText}
                </Text>
                <Text style={{ flex: 9, fontSize: 13 }}>{deadInfo.date}</Text>
              </View>
            </View>
          ) : (
            <Text></Text>
          )}

          <View
            style={{
              flex: 4,
            }}>
            <View>
              {!Good == true ? (
                <Text></Text>
              ) : (
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{
                    width: Dimensions.get('window').width * 0.85,
                    // borderWidth: 1,
                  }}>
                  {deadInfo.familyRelations.map((member, index) => (
                    <View key={index} style={{ flexDirection: 'row' }}>
                      <Card center middle style={styles.love}>
                        <Text h3 style={{ marginBottom: 10, fontSize: 12 }}>
                          {member.name}
                        </Text>
                        <Text gray style={{ fontSize: 10 }}>
                          {member.relationName}
                        </Text>
                      </Card>
                    </View>
                  ))}
                </ScrollView>
              )}
            </View>
            <View
              style={{
                flex: 1,
              }}>
              {Live ? (
                <Text></Text>
              ) : (
                <Button
                  style={{
                    width: Dimensions.get('window').width * 0.6,
                    borderRadius: 90,
                    marginTop: Dimensions.get('window').height * 0.025,
                    alignSelf: 'center',
                    position: 'absolute',
                  }}
                  // onPress={() => alert('마음전달 페이지로 이동')}
                  onPress={() => navigation.navigate('Mind')}
                  color="black">
                  <Text white center style={{ fontSize: 16 }}>
                    마음 전달
                  </Text>
                </Button>
              )}
            </View>
          </View>
        </View>
      ) : (
        <Text>사용할 수 없는 서비스입니다.</Text>
      )}
      <MapModal
        type={2}
        visible={mapVisible}
        modalTogle={() => {
          setMapVisible(!mapVisible);
        }}
        position={mapData}
      />
    </View>
  );
};

export default Funeral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: Dimensions.get('window').height * 0.055,
    paddingBottom: Dimensions.get('window').height * 0.05,
    paddingRight: Dimensions.get('window').width * 0.05,
    paddingLeft: Dimensions.get('window').width * 0.05,
  },
  icons: {
    flex: 1,
    backgroundColor: '#fff',
    width: 26,
    height: 26,
  },
  love: {
    marginRight: 15,
    minWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 4,
    maxWidth: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 2,
    maxHeight: (width - theme.sizes.padding * 2.4 - theme.sizes.base) / 4,
    borderRadius: 5,
    elevation: 5,
    marginLeft: 5,
    marginTop: 10,
  },
});

//bae yr
const IconButtom = styled.TouchableOpacity`
  padding: 0;
  height: 30px;
`;
const Col = styled.View``;
