import React, {useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
// custom component
import RelFSearch from '../../../components/styled/extended/RelFSearch';
import RelFList from '../../../components/styled/extended/RelFList';
// rest api
import * as authApi from '../../../api/authHttp/auth';
import * as relationApi from '../../../api/authHttp/relation';
// recoil
import {useRecoilValue} from 'recoil';
import {userIdState} from '../../../atoms';

// main
export default function AddFriend({navigation}) {
  // tab view state
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '사용자 검색'},
    {key: 'second', title: '친구 목록'},
  ]);
  // recoil state
  const uid = useRecoilValue(userIdState);

  const renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex =>
              inputIndex === i ? 1 : 0.2,
            ),
          });

          return (
            <TouchableOpacity
              key={i}
              style={styles.tabItem}
              onPress={() => setIndex(i)}>
              <Animated.Text style={{opacity, fontWeight: 'bold'}}>
                {route.title}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  const initialLayout = {width: Dimensions.get('window').width};
  const renderScene = SceneMap({
    first: RelFSearch,
    second: RelFList,
  });

  // 데이터 초기화
  const init = async () => {
    try {
      const resAvailable = await relationApi.getAvailable(uid);
      if (resAvailable.status === 200) {
        // 친구 추가 미동의 상태 -> 동의 로직 동작
        if (resAvailable.data.msg === 'insufficient scopes.') {
          // 토큰에 권한이 없으므로 권한을 요청하는 로직 수행
          // REST API와 WebView를 활용하여 구현
          alert(
            `친구목록을 불러올 수 없습니다. 카카오 계정 추가 권한 허용 절차를 진행해주세요.`,
          );
          const resGetOauth = await authApi.getOauth();
          navigation.navigate('AddAuth', {
            uri: resGetOauth,
          });
        }
      }
    } catch (error) {
      console.log(`AddFriend init error : ${error}`);
    }
  };
  // 초기화(등록 가능한 유저 리스트 요청 및 state 반영)
  React.useEffect(() => {
    init();
  });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={styles.container}
    />
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scene: {
    // flex: 1,
    height: 100,
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 4,
  },
});
