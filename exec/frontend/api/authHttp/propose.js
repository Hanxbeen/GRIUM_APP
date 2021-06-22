import {auth as http} from '../http';

// 관계 신청 내역
export function getPropose(receiverUid) {
  return http.get(`propose?receiverUid=${receiverUid}`);
}
/*
response 예시
[
  {
    "senderUid": "cea06c66-fc0c-4ac6-bcb1-fece58d3deda",
    "receiverUid": "f9ca363f-0dc4-4dc0-8121-5d64e5ff581d",
    "senderToReceiver": "아빠",
    "receiverToSender": "아들",
    "createdDate": null
  }
]
*/

// 관계 신청
/*
payload =
{
  "senderId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "receiverId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "senderToReceiver": "string", 
  "receiverToSender": "string"
}
*/
export function postPropose(payload) {
  return http.post('/propose', payload);
}
