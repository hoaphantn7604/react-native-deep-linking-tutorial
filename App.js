/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {
  Alert,
  Linking,
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const APP_SCHEME = 'demoapp://';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLinks(url);
      }
    });

    Linking.addEventListener('url', url => {
      if (url) {
        handleDeepLinks(url);
      }
    });
  }, []);

  // demoapp://notification=/id:123/name:hoaphan
  const handleDeepLinks = url => {
    const replaceScheme = url.replace(APP_SCHEME, ''); // notification=/id:123/name:hoaphan
    const splitString = replaceScheme.split('='); // [notification, /id:123/name:hoaphan]

    const route = splitString[0]; // notification
    const params = splitString[1]; // /id:123/name:hoaphan
    const splitParam = params.split('/'); // ['', 'id:123', 'name:hoaphan']

    const mapData = splitParam
      .map((e, i) => {
        if (e) {
          return {
            [e.split(':')[0]]: e.split(':')[1],
          };
        }
        return null;
      }) // [null, {id:"123"}, {name: 'hoaphan'}]
      .filter(e => e) // [{id: '123'}, {name: 'hoaphan'}]
      .reduce((a, b) => Object.assign(a, b), {}); // {id: '123', name: 'hoaphan'}

    const data = {
      route,
      ...mapData,
    };

    Alert.alert(data.route);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
