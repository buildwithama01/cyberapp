import { Header } from "@/components/Header";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { APP_CONFIG } from "@/constants/mockData";

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Privacy Policy" showMore={false} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {APP_CONFIG.privacyPolicy.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.paragraphs.map((paragraph, index) => (
              <Text key={`${section.title}-${index}`} style={styles.paragraph}>
                {paragraph}
              </Text>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicy;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 8,
    paddingBottom: 28,
  },
  section: {
    marginBottom: 14,
  },
  sectionTitle: {
    marginBottom: 10,
    color: "#292929",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
  },
  paragraph: {
    marginBottom: 8,
    color: "#555555",
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
    lineHeight: 24,
  },
});
