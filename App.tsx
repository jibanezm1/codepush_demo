/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import WebView from 'react-native-webview';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({ children, title }: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const debugging = `
  const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'Console', 'data': {'type': type, 'log': log}}));
  console = {
    log: (log) => consoleLog('log', log),
    debug: (log) => consoleLog('debug', log),
    info: (log) => consoleLog('info', log),
    warn: (log) => consoleLog('warn', log),
    error: (log) => consoleLog('error', log),
  };`;

  const onMessage = (payload: any) => {
    let dataPayload;
    try {
      dataPayload = JSON.parse(payload.nativeEvent.data);
    } catch (e) { }

    if (dataPayload) {
      if (dataPayload.type === 'Console') {
        console.info(`[Console] ${JSON.stringify(dataPayload.data)}`);
      } else {
        console.log(dataPayload);
      }
    }
  };
  const onUrl = (payload: any) => {

    console.log(payload);
  }
  const injectedJavaScript = `
  document.addEventListener("DOMContentLoaded", function() {
    window.isNative = true
    console.log(window);
  });`;

  return (
    <SafeAreaView

      style={[{ flex: 1, backgroundColor: 'white' }]}
    >
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <TouchableOpacity
        style={{ backgroundColor: '#0483e5', padding:20, borderRadius:8, margin:10  }}

      >
        <Text style={{alignSelf:'center', color:'white', fontSize:14, fontWeight:'bold'}}>Hola</Text>
      </TouchableOpacity>

      <WebView
        source={{ uri: 'https://preunic.cl/products/rutina-hialuronica-basica-l-oreal-paris-crema-dia-y-agua-micelar?default_sku=578055' }}
        style={{ display: 'flex' }}
        userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari/537.36"
        originWhitelist={['https://*', 'http://*', 'file://*', 'sms://*']}
        allowsInlineMediaPlayback
        useWebKit={true}
        // injectedJavaScriptBeforeContentLoaded={debugging} juan.inacap19@gmail.com
        injectedJavaScriptBeforeContentLoaded={injectedJavaScript}
        mediaPlaybackRequiresUserAction={false}
        // onNavigationStateChange={(value) => onUrl(value)}
        mixedContentMode="compatibility"
        mediaCapturePermissionGrantType="grantIfSameHostElsePrompt"
        onMessage={onMessage}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
