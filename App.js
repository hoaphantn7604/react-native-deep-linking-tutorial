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
    const removeAppScheme = url.replace(APP_SCHEME, ''); // notification=/id:123/name:hoaphan
    const splitUrl = removeAppScheme.split('='); // [notification, /id:123/name:hoaphan]

    const route = splitUrl[0]; // notification
    const params = splitUrl[1]; // /id:123/name:hoaphan
    const splitParams = params.split('/'); // ['', 'id:123', 'name:hoaphan']

    const mapData = splitParams
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

    const response = {
      route,
      ...mapData,
    };

    Alert.alert(JSON.stringify(response));
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
