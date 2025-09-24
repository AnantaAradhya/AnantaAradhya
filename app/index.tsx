import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, BackHandler } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

export default function App() {
  const webviewRef = useRef<WebView>(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onNavigationStateChange = (navState: any) => {
    setCanGoBack(navState.canGoBack);
  };

  const handleBackPress = useCallback(() => {
    if (canGoBack && webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    } else {
      Alert.alert("Exit App", "Do you want to exit?", [
        { text: "Cancel", style: "cancel" },
        { text: "Exit", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    }
  }, [canGoBack]);

  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );
    return () => {
      subscription.remove();
    };
  }, [handleBackPress]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        ref={webviewRef}
        source={{ uri: "https://anantaradhya.com" }}
        onNavigationStateChange={onNavigationStateChange}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        startInLoadingState={true}
        overScrollMode="never"
        nestedScrollEnabled={true}
        scrollEnabled={true}
      />
    </SafeAreaView>
  );
}
