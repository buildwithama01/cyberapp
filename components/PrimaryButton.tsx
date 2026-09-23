import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const PrimaryButton = ({ onPress, title, style }: PrimaryButtonProps) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: "#0D3A4B",
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    paddingHorizontal: 24,
    width: "100%",
    shadowColor: "#000", // iOS Shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 3.5,
    elevation: 2, // Android Shadow
  },
  buttonText: {
    color: "#ffffff",
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
  },
});
