import {dead as http} from '../http';

// 가족관계
export function getRelation(deadId) {
  return http.get(`/relation/all/${deadId}`);
}

// 인증되지 않은 관계자 추가
/*
payload = {
  "unauthRelationId": 0,
  "deadId": "string",
  "relationName": "string",
  "name": "string"
}
*/
export function postRelation(payload) {
  return http.post(`/relation/unauthenticated`, payload);
}
