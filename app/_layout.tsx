import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Urbanist: require("../assets/fonts/Urbanist-VariableFont_wght.ttf"),
    "Urbanist-Thin": require("../assets/fonts/static/Urbanist-Thin.ttf"),
    "Urbanist-ExtraLight": require("../assets/fonts/static/Urbanist-ExtraLight.ttf"),
    "Urbanist-Light": require("../assets/fonts/static/Urbanist-Light.ttf"),
    "Urbanist-Regular": require("../assets/fonts/static/Urbanist-Regular.ttf"),
    "Urbanist-Medium": require("../assets/fonts/static/Urbanist-Medium.ttf"),
    "Urbanist-SemiBold": require("../assets/fonts/static/Urbanist-SemiBold.ttf"),
    "Urbanist-Bold": require("../assets/fonts/static/Urbanist-Bold.ttf"),
    "Urbanist-ExtraBold": require("../assets/fonts/static/Urbanist-ExtraBold.ttf"),
    "Urbanist-Black": require("../assets/fonts/static/Urbanist-Black.ttf"),
    "Urbanist-ThinItalic": require("../assets/fonts/static/Urbanist-ThinItalic.ttf"),
    "Urbanist-ExtraLightItalic": require("../assets/fonts/static/Urbanist-ExtraLightItalic.ttf"),
    "Urbanist-LightItalic": require("../assets/fonts/static/Urbanist-LightItalic.ttf"),
    "Urbanist-Italic": require("../assets/fonts/static/Urbanist-Italic.ttf"),
    "Urbanist-MediumItalic": require("../assets/fonts/static/Urbanist-MediumItalic.ttf"),
    "Urbanist-SemiBoldItalic": require("../assets/fonts/static/Urbanist-SemiBoldItalic.ttf"),
    "Urbanist-BoldItalic": require("../assets/fonts/static/Urbanist-BoldItalic.ttf"),
    "Urbanist-ExtraBoldItalic": require("../assets/fonts/static/Urbanist-ExtraBoldItalic.ttf"),
    "Urbanist-BlackItalic": require("../assets/fonts/static/Urbanist-BlackItalic.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
