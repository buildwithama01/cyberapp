import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ContactIcon = keyof typeof Ionicons.glyphMap;

interface ContactOptionProps {
  icon: ContactIcon;
  label: string;
  onPress?: () => void;
}

const ContactOption = ({ icon, label, onPress }: ContactOptionProps) => (
  <TouchableOpacity
    accessibilityLabel={label}
    accessibilityRole="button"
    activeOpacity={0.8}
    onPress={onPress}
    style={styles.container}
  >
    <Ionicons name={icon} size={24} color="#0d3a4b" />
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

export default ContactOption;

const styles = StyleSheet.create({
  container: {
    minHeight: 60,
    borderRadius: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    shadowColor: "#B9BDC7",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  label: {
    marginLeft: 14,
    color: "#292929",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
});
