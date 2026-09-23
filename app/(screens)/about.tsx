import { Header } from "@/components/Header";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_CONFIG } from "@/constants/mockData";

const About = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="About" compact showMore={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandSection}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.logo}
          />
          <Text style={styles.appName}>{APP_CONFIG.name}</Text>
          <Text style={styles.tagline}>{APP_CONFIG.tagline}</Text>
          <Text style={styles.version}>{APP_CONFIG.version}</Text>
        </View>

        <View style={styles.descriptionSection}>
          <Text style={styles.sectionTitle}>{APP_CONFIG.descriptionTitle}</Text>
          <Text style={styles.description}>{APP_CONFIG.description}</Text>
        </View>

        <Text style={styles.copyright}>{APP_CONFIG.copyright}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default About;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  brandSection: {
    alignItems: "center",
    paddingVertical: 24,
  },
  logo: {
    width: 86,
    height: 86,
    borderRadius: 24,
    marginBottom: 16,
  },
  appName: {
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 26,
  },
  tagline: {
    marginTop: 6,
    color: "#0d3a4b",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  version: {
    marginTop: 8,
    color: "#858585",
    fontFamily: "Urbanist-Regular",
    fontSize: 12,
  },
  descriptionSection: {
    marginTop: 8,
    marginBottom: 22,
  },
  sectionTitle: {
    marginBottom: 9,
    color: "#292929",
    fontFamily: "Urbanist-Bold",
    fontSize: 17,
  },
  description: {
    color: "#686770",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
  copyright: {
    marginTop: 28,
    color: "#999999",
    fontFamily: "Urbanist-Regular",
    fontSize: 12,
    textAlign: "center",
  },
});
