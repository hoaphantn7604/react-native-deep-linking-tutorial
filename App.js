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
import DeepLinking from 'react-native-deep-linking';

const APP_SCHEME = 'demoapp://';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // cmd: npx uri-scheme open "demoapp://chat/hoaphan/test@gmail.com" --android

  useEffect(() => {
    DeepLinking.addScheme(APP_SCHEME);

    Linking.getInitialURL().then(url => {
      if (url) {
        DeepLinking.evaluateUrl(url);
      }
    });

    Linking.addEventListener('url', ({url}) => {
      if (url) {
        DeepLinking.evaluateUrl(url);
      }
    });

    DeepLinking.addRoute('/chat/:name/:email', res => {
      Alert.alert(`${res.name}-${res.email}`);
    });
  }, []);

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
