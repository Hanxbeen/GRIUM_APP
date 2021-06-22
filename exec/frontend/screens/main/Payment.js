import {current} from 'immer';
import {isSafeInteger} from 'lodash';
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import * as payApi from '../../api/kakaoHttp/pay';

const paymentListener = async (state, navigation, payInfo, deadId) => {
  console.log('------------------------------------------', state);
  if (state.title === '404 Not Found') return;

  const [domain, pgToken] = state.url.split('?');
  console.log('domain', domain);
  console.log('pgToken', pgToken);

  // *******************************************
  // ios일 경우 ******************************
  // *******************************************
  if (Platform.OS === 'ios') {
    if (domain.indexOf('grium') !== -1) {
      const dIndex = domain.lastIndexOf('/') + 1;
      const getDomain = domain.slice(dIndex);
      switch (getDomain) {
        case 'success':
          const pIndex = pgToken.indexOf('=') + 1;
          const getPgToken = pgToken.slice(pIndex);
          try {
            const successInfo = {
              tid: payInfo.tid,
              partner_order_id: payInfo.partner_order_id,
              partner_user_id: payInfo.partner_user_id,
              pg_token: getPgToken,
              total_amount: payInfo.total_amount,
              deadId: payInfo.deadId,
            };
            console.log('successInfo------------', successInfo);
            const response = await payApi.postPaymentSuccess(successInfo);
            if (respone.status !== 200) throw new Error('Grium network error!');
          } catch (error) {
            //  alert(`부조금 전달 중 문제가 발생했습니다. (error: ${error})`);
            //  navigation.goBack();
            //  return;
          }
          navigation.navigate('Completed');
          break;
        case 'cancel':
          alert('부조금 전달이 취소되었습니다.');
          navigation.goBack();
          break;
        case 'fail':
          alert('부조금 전달 중 문제가 발생했습니다.');
          navigation.goBack();
          break;
      }
    }
    // *******************************************
    // 안드로이드일 경우 ******************************
    // *******************************************
  } else {
    if (domain != null && pgToken != null) {
      const pIndex = pgToken.indexOf('=') + 1;
      const getPgToken = pgToken.slice(pIndex);
      // console.log('########################', payInfo);
      // console.log('########################deadId', deadId);
      try {
        const successInfo = {
          tid: payInfo.tid,
          partner_order_id: payInfo.partner_order_id,
          partner_user_id: payInfo.partner_user_id,
          pg_token: getPgToken,
          total_amount: payInfo.total_amount,
          deadId: deadId,
        };
        // console.log('successInfo------------', successInfo);
        const response = await payApi.postPaymentSuccess(successInfo);
        // console.log('response------------------', response);
        // if (respone.status !== 200) throw new Error('Grium network error!');
      } catch (error) {
        console.log(`부조금 전달 중 문제가 발생했습니다.error:${error}`);
        // console.log(error);
        //  navigation.goBack();
        //  return;
      }
      navigation.navigate('Completed');
    }
    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<<<<<<<<<<<<<<<<');
  }
  // else if (Platform.OS === 'android') {
  //   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
  //   const SendIntentAndroid = require('react-native-send-intent');
  //   SendIntentAndroid.openChromeIntent(state.url)
  //     .then(isOpened => {
  //       if (!isOpened) {
  //         alert('앱 실행이 실패했습니다');
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   return false;
  // }
  return;
};

const onShouldStartLoadWithRequest = event => {
  if (
    event.url.startsWith('http://') ||
    event.url.startsWith('https://') ||
    event.url.startsWith('about:blank')
  ) {
    return true;
  }
  if (Platform.OS === 'android') {
    const SendIntentAndroid = require('react-native-send-intent');
    SendIntentAndroid.openChromeIntent(event.url)
      .then(isOpened => {
        if (!isOpened) {
          alert('앱 실행이 실패했습니다');
        }
      })
      .catch(err => {
        console.log(err);
      });

    return false;
  } else {
    Linking.openURL(event.url).catch(err => {
      alert(
        '앱 실행이 실패했습니다. 설치가 되어있지 않은 경우 설치하기 버튼을 눌러주세요.',
      );
    });
    return false;
  }
};

export default function Payment({route, navigation}) {
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  const webviewRef = useRef(null);

  backButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goBack();
  };
  frontButtonHandler = () => {
    if (webviewRef.current) webviewRef.current.goForward();
  };

  const [state, setState] = useState({
    key: 1,
    isWebViewUrlChanged: false,
  });

  React.useEffect(() => {
    console.log(route.params.uri);
    const temp = {
      url: route.params.uri,
    };
    onShouldStartLoadWithRequest(temp);
  }, []);

  const onMessage = evevt => {
    console.log('weorwer');
  };
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView style={styles.flexContainer}>
        <WebView
          key={state.key}
          originWhitelist={['*']}
          source={{uri: route.params.uri}}
          // source={{uri: 'http://grium.me/pay/success'}}
          // source={current}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator
              color="black"
              size="large"
              style={styles.flexContainer}
            />
          )}
          onMessage={event => onMessage(event)}
          onLoadProgress={path => {
            console.log('current_path', path);
          }}
          onNavigationStateChange={state => {
            paymentListener(
              state,
              navigation,
              route.params.payInfo,
              route.params.deadId,
            );
          }}
          onShouldStartLoadWithRequest={event => {
            return onShouldStartLoadWithRequest(event);
          }}
          // onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}

          // ref={webviewRef}
          // onNavigationStateChange={navState => {
          //   setCanGoBack(navState.canGoBack);
          //   setCanGoForward(navState.canGoForward);
          //   setCurrentUrl(navState.url);
          // }}
        />
        {/* <View style={styles.tabBarContainer}>
          <TouchableOpacity onPress={backButtonHandler}>
            <Text style={styles.button}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={frontButtonHandler}>
            <Text style={styles.button}>Forward</Text>
          </TouchableOpacity>
        </View> */}
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  tabBarContainer: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
  },
  button: {
    color: 'white',
    fontSize: 24,
  },
});
