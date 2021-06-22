import {auth as http} from '../http';

// 관계 삭제
export function deleteRelation(userId, relationId) {
  return http.delete(`/relation?uid=${userId}&relationId=${relationId}`);
}

// 관계 추가 가능한 유저
export function getAvailable(userId) {
  return http.get(`/relation/available?uid=${userId}`);
}

// 유저의 가족관계
export function getFamily(userId) {
  return http.get(`/relation/family?uid=${userId}`);
}

// 유저의 친구관계
export function getFriend(userId) {
  return http.get(`/relation/friend?uid=${userId}`);
}

// 가족관계 중 고인 등록 할 수 있는 가족
export function getDead(userId) {
  return http.get(`/relation/dead?uid=${userId}`);
}
