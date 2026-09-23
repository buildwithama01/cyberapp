import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AssessmentOptionProps {
  label: string;
  selected: boolean;
  correct?: boolean;
  incorrect?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const AssessmentOption = ({
  label,
  selected,
  correct = false,
  incorrect = false,
  disabled = false,
  onPress,
}: AssessmentOptionProps) => {
  const stateStyle = correct
    ? styles.correct
    : incorrect
      ? styles.incorrect
      : selected
        ? styles.selected
        : undefined;

  return (
    <TouchableOpacity
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={[styles.option, stateStyle]}
      activeOpacity={0.8}
    >
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && <View style={styles.radioDot} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default AssessmentOption;

const styles = StyleSheet.create({
  option: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#E6E7EB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
  },
  selected: {
    borderColor: "#0d3a4b",
    backgroundColor: "#EEF2FF",
  },
  correct: {
    borderColor: "#2EAF73",
    backgroundColor: "#EAF8F1",
  },
  incorrect: {
    borderColor: "#F05D5E",
    backgroundColor: "#FFF0F0",
  },
  radio: {
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 1.5,
    borderColor: "#A7A9B0",
    borderRadius: 10,
  },
  radioSelected: {
    borderColor: "#0d3a4b",
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0d3a4b",
  },
  label: {
    flex: 1,
    color: "#292929",
    fontFamily: "Urbanist-Medium",
    fontSize: 14,
    lineHeight: 19,
  },
});
