import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface StarRatingSelectorProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
}

const StarRatingSelector = ({
  value,
  onChange,
  label,
}: StarRatingSelectorProps) => (
  <View style={styles.wrapper}>
    {label ? <Text style={styles.label}>{label}</Text> : null}
    <View style={styles.stars}>
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= value;

        return (
          <TouchableOpacity
            key={star}
            accessibilityRole="button"
            accessibilityLabel={`Rate ${star} star${star > 1 ? "s" : ""}`}
            onPress={() => onChange(star)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            style={styles.starButton}
          >
            <Ionicons
              name={active ? "star" : "star-outline"}
              size={28}
              color={active ? "#FFB800" : "#D7DCE5"}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
);

export default StarRatingSelector;

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  label: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  stars: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  starButton: {
    padding: 2,
  },
});
