import {auth as http, kakaoAuth} from '../http';

const kakaoApi = {
  nativeAppKey: '321199b51912c6c5987c08c2d9f2aa20',
  restApiKey: 'e62a9191e2732cd009b8a8e9cb8dc0b2',
  javaScriptKey: '217538c6a4f80edb25d43d4d2eb92bf0',
  adminKey: '0965decdec09143591096fa013f01a6b',
};
// 로그인
export function postLogin(token) {
  return http.post(`/user/login`, {
    accessToken: token,
  });
}

// 토큰 갱신
export function postRefresh(refreshToken) {
  const params = new URLSearchParams();
  params.append('grant_type', 'refresh_token');
  params.append('client_id', kakaoApi.nativeAppKey);
  params.append('refresh_token', refreshToken);
  return kakaoAuth.post(`/oauth/token`, params);
}

// 추가 권한 요청(친구)
export function getOauth() {
  // return kakaoAuth.get(
  //   `/oauth/authorize?client_id=${kakaoApi.restApiKey}&redirect_uri=http://grium.me/oauth&response_type=code&scope=friends}`,
  // );
  return `https://kauth.kakao.com/oauth/authorize?client_id=${kakaoApi.restApiKey}&redirect_uri=http://grium.me/kakao/oauth&response_type=code&scope=friends`;
}

// 권한 인증 코드로 토큰 재발급
export function postOauthToken(authorizationCode) {
  const params = new URLSearchParams();
  params.append('grant_type', 'authorization_code');
  params.append('client_id', kakaoApi.restApiKey);
  params.append('redirect_uri', 'http://grium.me/kakao/oauth');
  params.append('code', authorizationCode);
  return kakaoAuth.post(`/oauth/token`, params);
}
//
