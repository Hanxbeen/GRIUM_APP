import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const load = async () => {
  const userInfo = await AsyncStorage.getItem('userInfo');
  if (userInfo !== null) {
    return JSON.parse(userInfo).jwt;
  } else {
    return null;
  }
};

const basicConfig = async config => {
  const jwt = await load();
  if (jwt !== null) {
    config['headers'] = {
      Authorization: `Bearer ${jwt}`,
    };
  } else {
    config['headers'] = {
      Authorization: 'guest',
    };
  }
  console.log(config);
  return config;
};

// 인증 서버
export const auth = axios.create({
  baseURL: 'http://k4c104.p.ssafy.io:8443',
});
auth.interceptors.request.use(async function (config) {
  return await basicConfig(config);
});

// 고인 서버
export const dead = axios.create({
  baseURL: 'http://k4c104.p.ssafy.io:8001',
});
dead.interceptors.request.use(async function (config) {
  return await basicConfig(config);
});

// 거래 기록 서버
export const deal = axios.create({
  baseURL: 'http://k4c104.p.ssafy.io:8081',
});
deal.interceptors.request.use(async function (config) {
  return await basicConfig(config);
});

// ********************************************
// ********************************************
// ********************************************

// kakao auth 서버
export const kakaoAuth = axios.create({
  baseURL: 'https://kauth.kakao.com',
});
kakaoAuth.interceptors.request.use(async function (config) {
  config['headers'] = {
    'content-type': `application/x-www-form-urlencoded;charset=utf-8`,
  };
  console.log(config);
  return config;
});

// kakao pay 서버
export const kakaoPay = axios.create({
  baseURL: 'https://kapi.kakao.com',
});
kakaoPay.interceptors.request.use(async function (config) {
  config['headers'] = {
    Authorization: `KakaoAK 0965decdec09143591096fa013f01a6b`,
    'content-type': `application/x-www-form-urlencoded;charset=utf-8`,
  };
  console.log(config);
  return config;
});

// 외부 서버(검색)
export const search = axios.create({
  baseURL:
    'http://api.vworld.kr/req/search?service=search&request=search&version=2.0&size=1000&page=1&type=place&format=json&errorformat=json&key=17A978B6-A1B6-32E7-BC36-7EF0605BEB3D&category=07031305&query=',
});
