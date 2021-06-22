import {dead as http} from '../http';

// 프로필 사진(영정사진) 업로드
/*
{
  "deadId": "string",
  "userId": "string",
  "imageUrl": "string",
  "file": [
    "string"
  ]
}
*/
export function putDeadPortrait(formdata) {
  return http.put('/dead/portrait', formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

// dead 정보 요청
export function getDeadInfo(deadId, userId) {
  return http.get(`/dead/${deadId}/${userId}`);
}

// dead 공개 여부 수정
/*
payload = 
{
  "deadId": "string",
  "userId": "string",
  "status": true
}
*/
export function putDeadStatus(payload) {
  return http.put('/dead/status', payload);
}

export function getDeadManage(userId) {
  return http.get(`/dead/manage/${userId}`);
}

// 메인 피드 데이터 private/public
export function getDeadFeeds(value, userId) {
  return http.get(`/dead/${value}?userId=${userId}`);
}

// 고인 검색
export function getDeadSearch(name) {
  return http.get(`/dead/search?name=${name}`);
}

// 고인 등록
export function putDead(payload) {
  return http.put('/dead', payload, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}