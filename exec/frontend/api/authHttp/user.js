import {auth as http} from '../http';

// user All info
export function getAllInfo(userId) {
  return http.get(`/user/allinfo?uid=${userId}`);
}

// user 정보 수정
/*
{
  "uid": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "birthday": "string",
  "birthyear": "string",
  "commentForCondolence": "string"
}
*/
export function putUser(payload) {
  return http.put(`/user`, payload);
}

// 유저의 이미지 가져오기
export function getUserImage(userId) {
  return http.get(`/user/image?uid=${userId}`);
}

// 여러장의 이미지와 글 업로드
export function postUserImage(formData) {
  return http.post('/user/image', formData, {
    // headers: {
    //   'Content-Type': 'multipart/form-data',
    // },
  });
}

// 이미지 삭제
export function deleteUserImage(userId, imageId) {
  return http.delete('/user/image', {
    data: {
      uid: userId,
      imageId: imageId,
    },
    withCredentials: true,
  });
}
