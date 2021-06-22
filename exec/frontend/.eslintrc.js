module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
      {
        // 하나의 값을 배열로 했을 때 (에러로 처리)
        // 'react-native/no-single-element-style-arrays': 2,
      },
      {
        // jsx에서 함수 사용 하지 않기 (에러로 처리)
        // 'react/jsx-no-bind': 2,
      },
      {
        // jsx 상에서 인라인 스타일 사용하지 않기 (에러로 처리)
        'react-native/no-inline-styles': 2,
      },
      {
        // 불필요한 스타일 선언 하지 않기 (에러로 처리)
        // 'react-native/no-unused-styles': 2,
      },
    ],
  },
};
