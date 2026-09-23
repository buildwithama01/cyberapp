import PrimaryButton from "@/components/PrimaryButton";
import { useRouter } from "expo-router"; // Swap with your router pack if not using Expo
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OrderAccepted = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Image
            source={require("@/assets/images/success.png")}
            style={styles.successImage}
            resizeMode="contain"
          />
          <Text style={styles.titleText}>
            Your Order has been{"\n"}accepted
          </Text>
          <Text style={styles.subtitleText}>
            Your items have been placed and are on{"\n"}their way to being
            processed
          </Text>
        </View>
        <View style={styles.buttonFooter}>
          <PrimaryButton
            title="Track Order"
            onPress={() => {
              router.push("/(tabs)/track");
            }}
          />
          <TouchableOpacity
            style={styles.homeLinkButton}
            onPress={() => {
              router.push("/(tabs)/home");
            }}
          >
            <Text style={styles.homeLinkText}>Back to home</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderAccepted;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 0.8,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  successImage: {
    width: 220,
    height: 220,
    marginBottom: 40,
  },
  titleText: {
    fontSize: 28,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
    textAlign: "center",
    lineHeight: 36,
    marginBottom: 15,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: "Urbanist-Regular",
    color: "#7C7C7C",
    textAlign: "center",
    lineHeight: 22,
  },
  buttonFooter: {
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: "center",
    width: "100%",
  },
  homeLinkButton: {
    paddingVertical: 10,
    marginTop: 20,
  },
  homeLinkText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
  },
});
