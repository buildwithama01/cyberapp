import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import React from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Splash = () => {
  const insets = useSafeAreaInsets();
  return (
    <ImageBackground
      source={require("@/assets/images/onboarding-img.png")}
      style={styles.container}
    >
      <View style={styles.safeArea}>
        <View style={styles.content}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={{ marginBottom: 20 }}
          />
          <Text style={[styles.text, styles.title]}>
            {"Welcome\n to our Store!"}
          </Text>
          <Text style={[styles.text, styles.subtitle]}>
            Get your groceries in as fast as one hour
          </Text>
          <PrimaryButton
            title="Get Started"
            onPress={() => router.push("/signup")}
            style={{ marginTop: 50 }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({
  safeArea: {
    width: "80%",
    marginBottom: 80,
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  content: {
    justifyContent: "flex-end",
    alignItems: "center",
  },
  text: { textAlign: "center", color: "#ffffff" },
  title: {
    fontSize: 40,
    fontFamily: "Urbanist-ExtraBold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
    fontFamily: "Urbanist-Regular",
  },
});
