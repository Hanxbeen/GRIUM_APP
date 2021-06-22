import React, {useState} from 'react';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import {Block, Badge, Text, Button} from '../../components';
import {theme} from '../../constants';
import SwitchSelector from 'react-native-switch-selector';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as deadApi from '../../api/deadHttp/dead';
import FloatView from '../../components/styled/FloatView';
import styled from 'styled-components';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userIdState, deadIdState, liveState, mainState} from '../../atoms';

const saveAsync = async id => {
  await AsyncStorage.setItem('deadId', id);
};

export default function Main({navigation}) {
  // react hook
  const [feeds, setFeeds] = useState([]);
  const [feed, setFeed] = useState({});
  const [hasFeeds, setHasFeeds] = useState(false);
  const [isState, setIsState] = useState('private');

  // recoil
  const userId = useRecoilValue(userIdState);
  const [deadId, setDeadId] = useRecoilState(deadIdState);
  const [live, setLive] = useRecoilState(liveState);

  const selectedData = async value => {
    try {
      const res = await deadApi.getDeadFeeds(value, userId);
      if (res.status === 204) {
        setHasFeeds(false);
      } else if (res.status === 200) {
        setHasFeeds(true);
        setFeeds(res.data);
        setFeed(res.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    selectedData('private');
  }, [userId]);

  React.useEffect(() => {
    // 이벤트 수신 후 데이터 갱신
    DeviceEventEmitter.addListener('backToMain', () => {
      selectedData(isState);
    });
  });

  React.useEffect(() => {
    const focus_event = navigation.addListener('focus', () => {
      console.log('focus ', isState);
      selectedData(isState);
    });
    return focus_event;
  }, [navigation]);

  let block;
  if (hasFeeds) {
    block = (
      <Block flex={8}>
        {/* 유저 캐러셀 */}
        <Block flex={1.75} row center space="between" style={styles.header}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{paddingVertical: theme.sizes.base * 1}}>
            <Block flex={false} row space="between">
              {feeds.map((feed, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setFeed(feed);
                  }}>
                  {/* <Funeralbadge progressCheck={feed.progressCheck}></Funeralbadge> */}
                  <Badge
                    center
                    middle
                    margin={[0, 10, 5]}
                    size={60}
                    // color={theme.colors.black}
                    style={{borderWidth: 2}}>
                    <Image source={{uri: feed.imageUrl}} style={styles.feed} />

                    {feed.progressCheck == true ? (
                      <FloatView top={'0px'} right={'0px'}>
                        <FunernalIcon
                          style={{tintColor: 'white'}}
                          source={require('../../assets/essential/ribbon.png')}
                        />
                      </FloatView>
                    ) : (
                      <></>
                    )}
                  </Badge>
                  <Text style={styles.name}>{feed.name}</Text>
                </TouchableOpacity>
              ))}
            </Block>
          </ScrollView>
        </Block>

        {/* 캐러셀 밑 유저 이름 */}
        <Block flex={0.5}>
          <Text style={styles.selected_name}>{feed.name}</Text>
        </Block>

        {/* 클릭한 사람 상세 */}
        <Block flex={4} row center style={styles.selected_user}>
          <Badge
            center
            middle
            size={230}
            borderRadius={125}
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              borderWidth: 4,
              shadowOpacity: 0.36,
              shadowRadius: 6.68,
              elevation: 20,
            }}>
            <Image source={{uri: feed.imageUrl}} style={styles.feed_large} />
            {/* <Image source={{uri : "../../assets/person.png"}} style={styles.feed} /> */}
            {/* <Image
                source={require('../../assets/person.png')}
                style={styles.feed_large}
              /> */}
          </Badge>
        </Block>

        {/* 기억공간 버튼 */}
        <Block flex={2}>
          <Button
            onPress={() => {
              if (isState === 'private') {
                saveAsync(feed.deadId);
                setDeadId(feed.deadId);
                setLive(false);
                navigation.navigate('Frame', {id: feed.deadId});
              } else {
                saveAsync(feed.id);
                setDeadId(feed.id);
                setLive(false);
                navigation.navigate('Frame', {id: feed.id});
              }
            }}
            color={theme.colors.black}
            style={styles.memory_button}>
            {/* <Image
                source={require('../../assets/essential/ribbon.png')}
                style={{
                  resizeMode: 'contain',
                  width: 18,
                  height: 18,
                  tintColor: '#fff',
                }}></Image> */}
            <Text white center style={{fontSize: 16}}>
              기억공간
            </Text>
            {/* <Image
                source={require('../../assets/essential/ribbon.png')}
                style={{
                  resizeMode: 'contain',
                  width: 18,
                  height: 18,
                  tintColor: '#fff',
                }}></Image> */}
          </Button>
        </Block>
      </Block>
    );
  } else {
    block = (
      <Block flex={8}>
        <Block flex={6.25} style={styles.blank}>
          <Text center>지인을 등록하세요</Text>
        </Block>
        <Block flex={2}>
          <Button
            onPress={() => navigation.navigate('AddFriend')}
            color={theme.colors.black}
            style={styles.memory_button}>
            <Text bold white center style={{fontSize: 16}}>
              친구관리
            </Text>
          </Button>
        </Block>
      </Block>
    );
  }

  return (
    <Block style={{backgroundColor: 'white', paddingTop: 10}}>
      {/* 토글 */}
      <Block flex={0.5} style={styles.toggle}>
        <SwitchSelector
          initial={isState === 'private' ? 0 : 1}
          options={[
            {label: '지인', value: 'private'},
            {label: '공개', value: 'public'},
          ]}
          onPress={value => {
            setIsState(value);
            console.log('setState ', value);
            selectedData(value);
          }}
          height={35}
          fontSize={12}
          textColor={theme.colors.gray}
          selectedColor={theme.colors.black}
          buttonColor={theme.colors.white}
          borderColor={theme.colors.white}
          hasPadding
          testID="switch-selector"
          accessibilityLabel="switch-selector"
        />
      </Block>
      {block}
    </Block>
  );
}

const styles = StyleSheet.create({
  toggle: {
    width: '30%',
    alignSelf: 'center',
    borderRadius: 1000,
    elevation: 10,
    height: 30,
  },
  header: {
    top: 0,
    paddingHorizontal: theme.sizes.base * 0.1,
  },
  feed: {
    borderRadius: 1000,
    width: '96%',
    height: '96%',
  },
  feed_large: {
    borderRadius: 1000,
    width: '99%',
    height: '99%',
    backgroundColor: '#fff',
  },
  name: {
    textAlign: 'center',
    fontSize: 10,
  },
  selected_name: {
    textAlign: 'center',
    fontSize: 19,
  },
  selected_user: {
    justifyContent: 'center',
  },
  memory_button: {
    width: '60%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 100,
    height: 45,
    flexDirection: 'row',
  },
  blank: {
    justifyContent: 'center',
  },
});
const FunernalIcon = styled.Image`
  width: 16px;
  height: 16px;
  background-color: black;
  border-radius: 8px;
`;

const IconBlock = styled.Image`
  width: 16px;
  height: 16px;
  background-color: black;
  border-radius: 8px;
`;
