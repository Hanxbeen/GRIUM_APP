import {atom, selector} from 'recoil';

// date
export const murmurDateState = atom({
  key: 'murmurDate',
  default: '',
});
export const isMurmurDateState = atom({
  key: 'isMurmurDate',
  default: false,
});
export const cemeteryDateState = atom({
  key: 'cemeteryDate',
  default: '',
});
// kakaoInfo
export const tokenState = atom({
  key: 'tokenState',
  default: null,
});
export const tokenExpiresAtState = atom({
  key: 'tokenExpiresAtState',
  default: null,
});
export const refreshTokenState = atom({
  key: 'refreshToken',
  default: null,
});
export const refreshTokenExpiresAtState = atom({
  key: 'refreshTokenExpiresAtState',
  default: null,
});

// userInfo
export const userInfoState = atom({
  key: 'userInfoState',
  default: null,
});
export const jwtState = atom({
  key: 'jwtState',
  default: null,
});
export const userIdState = atom({
  key: 'userIdState',
  default: null,
});
export const allInfoState = atom({
  key: 'allInfoState',
  default: null,
});
export const userNameState = atom({
  key: 'userName',
  defualt: null,
});
export const imageUrlState = atom({
  key: 'imageUrl',
  default: null,
});
export const emailState = atom({
  key: 'email',
  default: null,
});
export const birthdayState = atom({
  key: 'birthday',
  default: null,
});
export const backgroundMusicState = atom({
  key: 'backgroundMusic',
  default: null,
});
export const alarmSettingState = atom({
  key: 'alarmSetting',
  default: null,
});

// dead
export const deadInfoState = atom({
  key: 'deadInfoState',
  default: null,
});

// ImagePicker
// 모달 visible 상태
export const imagePickerState = atom({
  key: 'imagePickerState',
  default: false,
});

// Relation
// 관계 추가 가능 리스트
export const relationAvailableState = atom({
  key: 'relationAvailableState',
  default: [],
});
// 친구 리스트
export const relationFriendState = atom({
  key: 'relationFriendState',
  default: [],
});
// 가족 리스트
export const relationFamilyState = atom({
  key: 'relationFamilyState',
  default: [],
});
// recoil변수 추가. - young
export const addMurMurState = atom({
  key: 'addMurMurState',
  default: null,
});
// recoil변수 추가. - young
export const addCemeteryState = atom({
  key: 'addCemeteryState',
  default: null,
});
// recoil변수 추가. - young
export const deadImageUrlState = atom({
  key: 'deadImageUrlState',
  default: null,
});

// ************************
// ****** selector ********
// ************************

// kakaoInfo
export const loginState = selector({
  key: 'loginState',
  get: ({get}) => {
    if (get(tokenState) !== null && get(jwtState) !== null) {
      return true;
    } else {
      return false;
    }
  },
});
export const getToken = selector({
  key: 'getToken',
  get: ({get}) => {
    return get(tokenState);
  },
});

// 2021-05-18 04:30:13 PM byr 가족 및 친구 여부
export const relationCheckState = atom({
  key: 'relationCheckState',
  default: false,
});
// 2021-05-18 07:07:57 PM byr AlertModal State 관리
export const alertModalVisibleState = atom({
  key: 'alertModalVisibleState',
  default: false,
});
export const alertModalMessageState = atom({
  key: 'alertModalMessageState',
  default: '',
});

// 2021-05-20 asyncStorage -> recoil migration
export const deadIdState = atom({
  key: 'deadIdState',
  default: null,
});
export const liveIdState = atom({
  key: 'liveIdState',
  default: null,
});
export const liveState = atom({
  key: 'liveState',
  default: null,
});
