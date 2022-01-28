import React from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  StatusBar,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import "react-native-gesture-handler";

import FirstConnection from "./components/Welcome/FirstConnection";
import PhotoReader from "./components/PhotoReader";

export default function App() {
  return (
    <>
      <StatusBar style="default" />
      <SafeAreaView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flexGrow: 1, width: "100%" }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                onStartShouldSetResponder={() => true}
                style={styles.container}
              >
                <PhotoReader />
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </SafeAreaProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
});
