import React from 'react';
import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';

function OAuth({navigation}) {
  let uri = 'https://www.google.com/';

  return (
    <SafeAreaView
      style={[
        styles.webView,
        Platform.OS === 'ios' ? styles.iosPadding : styles.androidPadding,
      ]}>
      <WebView
        source={{uri: uri}}
        // onLoad={alert('loaded!')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  webView: {
    flex: 1,
  },
  iosPadding: {
    paddingTop: 40,
  },
  androidPadding: {
    paddingTop: 32,
  },
});

export default OAuth;
