import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import NavigateScreens from './components/SignInUp/NavigateScreens';

import 'react-native-gesture-handler';

import FirstConnection from './components/Welcome/FirstConnection';

export default function App() {

  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" />
      <SafeAreaProvider>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{flexGrow: 1, width: '100%' }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              onStartShouldSetResponder={() => true}
              style={styles.container}
            >
              <FirstConnection />
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});
