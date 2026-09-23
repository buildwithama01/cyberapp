import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface EnrollFooterProps {
  coursePrice: string;
  onPress?: () => void;
}

const EnrollFooter = ({ coursePrice, onPress }: EnrollFooterProps) => {
  return (
    <View style={styles.footer}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onPress}
        style={styles.enrollButton}
        activeOpacity={0.85}
      >
        <Text style={styles.enrollText}>Enroll Course - ₦{coursePrice}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EnrollFooter;

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 14,
    backgroundColor: "#FFFFFF",
  },
  enrollButton: {
    backgroundColor: "#0D3A4B",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3.5,
    elevation: 2,
  },
  enrollText: { color: "#FFFFFF", fontFamily: "Urbanist-Bold", fontSize: 20 },
});
