import React, {useState} from 'react';
import {StyleSheet, View, Platform} from 'react-native';
import styled from 'styled-components/native';
import Button from '../../components/styled/Button';
import KakaoLogin from '../../components/styled/KakaoButton';
import * as authApi from '../../api/authHttp/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertModal from '../../components/styled/extended/AlertModal';

import moment from 'moment';
import 'moment/locale/ko';

import {
  getProfile as getKakaoProfile,
  login,
} from '@react-native-seoul/kakao-login';

// recoil state
import {useRecoilState} from 'recoil';
import {
  tokenState,
  refreshTokenState,
  tokenExpiresAtState,
  refreshTokenExpiresAtState,
  jwtState,
  userIdState,
  userNameState,
  imageUrlState,
  birthdayState,
  userInfoState,
} from '../../atoms';

const Image = styled.Image`
  flex-direction: row;
  width: 60px;
  height: 60px;
  margin-bottom: 40px;
`;
const Container = styled.View`
  width: 100%;
  margin-bottom: ${props => props.mb || 0};
`;
const Row = styled.View`
  flex-direction: row;
`;
const Text = styled.Text`
  margin-bottom: 8px;
  font-weight: ${props => props.weight || 'normal'};
  font-size: ${props => props.size || '16px'};
`;
const Blank = styled.View`
  width: ${props => props.width || 0}
  height: ${props => props.height || 0}
`;

// 기능 모듈
const kakaoLogin = async () => {
  try {
    // KAKAO SDK 로 받아온 유저 정보 요청하고 asyncStorages에 저장
    const resKakao = await login();
    if (resKakao.accessToken === null) {
      await AsyncStorage.clear();
    }
    await AsyncStorage.setItem('kakaoInfo', JSON.stringify(resKakao));
    return resKakao;
  } catch (error) {
    setAlertModalMessage(`kakao login error:${error}`);
    setAlertModalState(true);
  }
};
const griumLogin = async kakao => {
  try {
    // KAKAO 에서 준 토큰 서버에 토큰 전송, res로 넘어온 유저정보 asyncStorage에 저장
    const resGrium = await authApi.postLogin(kakao.accessToken);
    if (resGrium.status === 200) {
      await AsyncStorage.setItem(
        'userInfo',
        JSON.stringify(resGrium.data.data),
      );
      return resGrium.data.data;
    } else {
      setAlertModalMessage(
        `그리움 서버와 연결하는 도중 문제가 발생했습니다.[error:status is not 200]`,
      );
      setAlertModalState(true);
    }
  } catch (error) {
    setAlertModalMessage(`grium login error:${error}`);
    setAlertModalState(true);
  }
};
const refresh = async kakaoInfo => {
  try {
    const resRefresh = await authApi.postRefresh(kakaoInfo.refreshToken);
    if (resRefresh.status === 200) {
      const newKakaoInfo = {
        ...kakaoInfo,
        accessToken: resRefresh.data.access_token,
      };
      await AsyncStorage.setItem('kakaoInfo', JSON.stringify(newKakaoInfo));
      return newKakaoInfo;
    }
  } catch (error) {
    console.log(`refresh error: ${error}`);
  }
};

// export function
export default function Login({navigation}) {
  const [token, setToken] = useRecoilState(tokenState);
  const [tokenExpiresAt, setTokenExpiresAt] =
    useRecoilState(tokenExpiresAtState);
  const [refreshToken, setRefreshToken] = useRecoilState(refreshTokenState);
  const [refreshTokenExpiresAt, setrefreshTokenExpiresAtState] = useRecoilState(
    refreshTokenExpiresAtState,
  );
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [jwt, setJwt] = useRecoilState(jwtState);
  const [userId, setUserId] = useRecoilState(userIdState);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [imageUrl, setImageUrl] = useRecoilState(imageUrlState);
  const [birthday, setBirthday] = useRecoilState(birthdayState);
  const [alertModalState, setAlertModalState] = useState(false);
  const [alertModalMessage, setAlertModalMessage] = useState(false);

  const setRecoil = (kakao, grium) => {
    try {
      console.log(grium);
      // atoms에 반영
      setToken(kakao.accessToken);
      setTokenExpiresAt(kakao.accessTokenExpiresAt);
      setRefreshToken(kakao.refreshToken);
      setrefreshTokenExpiresAtState(kakao.refreshTokenExpiresAt);
      setUserInfo(JSON.stringify(grium));
      setJwt(grium.jwt);
      setUserId(grium.uid);
      setUserName(grium.name);
      setBirthday(grium.birthday);
    } catch (error) {
      console.log(`Recoil error:${error}`);
    }
  };

  // login init 로직
  const init = async () => {
    // 기본 설정(배경음악, 알림여부)
    const bgmState = await AsyncStorage.getItem('bgmState');
    if (bgmState === null) {
      await AsyncStorage.setItem('bgmState', '1');
    }
    const alertState = await AsyncStorage.getItem('alertState');
    if (alertState === null) {
      await AsyncStorage.setItem('alertState', '1');
    }
    // 로그인
    const kakaoInfo = JSON.parse(await AsyncStorage.getItem('kakaoInfo'));
    const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
    try {
      // 1. 처음 접속한 유저 (asyncStrage에 token이 null) -> return null
      if (kakaoInfo.refreshToken === null || userInfo.jwt === null) {
        AsyncStorage.clear();
        return;
      }
      // 2. 가입 유저 && 토큰 만료 기간 내 -> asyncStorage에 저장 된 데이터 recoil에 적용
      // 3. 가입 유저 && 토큰 만료 -> 갱신 후 grium 서버에 재로그인하여 변경된 kakaoToken 전송
      const today = moment();
      const accessTokenExpiresAt = moment(
        kakaoInfo.accessTokenExpiresAt,
        'YYYY-MM-DD HH:mm:ss',
      );
      if (
        kakaoInfo.accessToken !== null &&
        moment.duration(accessTokenExpiresAt.diff(today)).asHours() > 2
      ) {
        // 만료 전
        setRecoil(kakaoInfo, userInfo);
      } else {
        //만료 직전(새로 받기)
        const newKakaoInfo = await refresh(kakaoInfo);
        const newUserInfo = await griumLogin(newKakaoInfo);
        setRecoil(newKakaoInfo, newUserInfo);
      }
    } catch (error) {
      console.log(`init error: ${error}`);
    }
  };
  // 4. 로그아웃??
  // 5. 탈퇴 -> 링크 해제?

  // 가입하기(asyncStorage 저장, atoms 반영)
  const signInWithKakao = async () => {
    try {
      // KAKAO SDK 로 받아온 유저 정보 요청하고 asyncStorages에 저장
      const resKakao = await kakaoLogin();
      const resGrium = await griumLogin(resKakao);
      await setRecoil(resKakao, resGrium);
    } catch (error) {
      alert(`로그인 도중 문제가 발생했습니다.[error:${error}]`);
    }
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'ios' ? styles.iosBottom : styles.androidBottom,
      ]}>
      <Text
        style={Platform.OS === 'ios' ? {marginTop: 80} : {marginTop: 60}}
        size={'30px'}
        weight={'bold'}>
        그리움
      </Text>
      <Container mb={'60px'}>
        <Image source={require('../../assets/images/black-ribbon.png')} />
        <Row>
          <Text weight={'bold'}>그리움</Text>
          <Text>에서,</Text>
        </Row>
        <Text>소중한 사람을 기억하세요.</Text>
      </Container>
      <Container>
        <Row style={styles.buttonGroup}>
          {/* <Button
            onPress={() => {
              setToken('c3f797c5-e644-4244-ab0b-36f9fbe67629');
              setJwt('c3f797c5-e644-4244-ab0b-36f9fbe67629');
              setUserId('c3f797c5-e644-4244-ab0b-36f9fbe67629');
            }}>
            둘러보기
          </Button> */}

          {/* <Blank width={'10px'} />
          <Button onPress={() => navigation.navigate('Main')}>회원가입</Button> */}
        </Row>
        <KakaoLogin
          onPress={() => {
            signInWithKakao();
          }}>
          카카오 로그인
        </KakaoLogin>
      </Container>
      <AlertModal
        state={alertModalState}
        setState={setAlertModalState}
        message={alertModalMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 0,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  iosBottom: {
    paddingBottom: 40,
  },
  androidBottom: {
    paddingBottom: 24,
  },
  buttonGroup: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
