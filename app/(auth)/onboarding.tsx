import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Onboarding1 from "@/assets/images/onboarding1.svg";
import Onboarding2 from "@/assets/images/onboarding2.svg";
import Onboarding3 from "@/assets/images/onboarding3.svg";

const Onboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(0);

  const OnboardingInfo = [
    {
      svgPath: Onboarding1,
      title: "We provide the best learning courses!",
      buttonText: "Next",
    },
    {
      svgPath: Onboarding2,
      title: "Learn anytime and anywhere easily and conveniently",
      buttonText: "Next",
    },
    {
      svgPath: Onboarding3,
      title: "Let's improve your skills together on Cybergate right now!",
      buttonText: "Get Started",
    },
  ];

  const handleNext = () => {
    if (currentScreen === OnboardingInfo.length - 1) {
      router.push("/signup");
    } else {
      setCurrentScreen(currentScreen + 1);
    }
  };

  const currentInfo = OnboardingInfo[currentScreen];
  const CurrentImage = currentInfo.svgPath;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageSection}>
        <CurrentImage
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
        />
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>{currentInfo.title}</Text>

        <View style={styles.dotsContainer}>
          {OnboardingInfo.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentScreen ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <PrimaryButton title={currentInfo.buttonText} onPress={handleNext} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  imageSection: {
    flex: 0.6,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  contentSection: {
    flex: 0.4,
    width: "100%",
    paddingHorizontal: 30,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    fontFamily: "Urbanist-Bold",
    marginTop: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  activeDot: {
    width: 28,
    backgroundColor: "#0d3a4b",
  },
  inactiveDot: {
    width: 8,
    backgroundColor: "#E0E0E0",
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 20,
  },
});
