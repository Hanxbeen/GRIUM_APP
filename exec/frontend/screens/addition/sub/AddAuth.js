import React from 'react';
import {StyleSheet, SafeAreaView, ActivityIndicator} from 'react-native';
import {WebView} from 'react-native-webview';
import produce from 'immer';
// rest api
import * as authApi from '../../../api/authHttp/auth';
// recoil
import {useRecoilState} from 'recoil';
import {
  tokenState,
  refreshTokenState,
  jwtState,
  userIdState,
  userNameState,
  imageUrlState,
  birthdayState,
} from '../../../atoms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const paymentListener = async (state, navigation, setRecoil) => {
  if (state.title == '') return;
  const [domain, code] = state.url.split('?');
  if (domain.indexOf('grium') !== -1) {
    const cIndex = code.indexOf('=') + 1;
    const getCode = code.slice(cIndex);
    // 발급받은 인증 코드로 토큰 재발급 요청
    let newKakaoInfo;
    try {
      const resOauthToken = await authApi.postOauthToken(getCode);
      if (resOauthToken.status !== 200) return;
      // 재로그인 로직 구동 -> 성공시 recoil에도 반영
      const asyncKakao = JSON.parse(await AsyncStorage.getItem('kakaoInfo'));
      newKakaoInfo = produce(asyncKakao, draft => {
        draft.accessToken = resOauthToken.data.access_token;
        draft.refreshToken = resOauthToken.data.refresh_token;
      });
      await AsyncStorage.setItem('kakaoInfo', JSON.stringify(newKakaoInfo));
    } catch (error) {
      console.log(`권한 인증 코드로 토큰 발급 중 error : ${error}`);
      return;
    }
    try {
      // KAKAO 에서 준 토큰 서버에 토큰 전송, res로 넘어온 유저정보 asyncStorage에 저장
      const resGrium = await authApi.postLogin(newKakaoInfo.accessToken);
      if (resGrium.status === 200) {
        await AsyncStorage.setItem(
          'userInfo',
          JSON.stringify(resGrium.data.data),
        );
        await setRecoil(newKakaoInfo, resGrium.data.data);
        navigation.pop(1);
      }
    } catch (error) {
      console.log(`새로 발급한 토큰으로 재로그인 중 error : ${error}`);
      return;
    }
  }
  return;
};

export default function AddAuth({route, navigation}) {
  const [token, setToken] = useRecoilState(tokenState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
  const [jwt, setJwt] = useRecoilState(jwtState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const [birthday, setBirthday] = useRecoilState(birthdayState);

  const setRecoil = (kakao, grium) => {
    try {
      // atoms에 반영
      setToken(kakao.accessToken);
      setRefreshToken(kakao.refreshToken);
      setJwt(grium.jwt);
      setUserId(grium.uid);
      setUserName(grium.name);
      // setImageUrl(grium.imageUrl);
      setBirthday(grium.birthday);
    } catch (error) {
      console.log(`Recoil error:${error}`);
    }
  };

  return (
    <>
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          source={{uri: route.params.uri}}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          onLoadEnd={({nativeEvent}) => {
            paymentListener(nativeEvent, navigation, setRecoil);
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  button: {
    color: 'white',
    fontSize: 24,
  },
});
