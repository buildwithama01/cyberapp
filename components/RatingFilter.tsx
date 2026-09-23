import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

interface RatingFilterProps {
  ratings: Array<"All" | number>;
  selected: "All" | number;
  onSelect: (rating: "All" | number) => void;
}

const RatingFilter = ({ ratings, selected, onSelect }: RatingFilterProps) => (
  <ScrollView
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {ratings.map((rating) => {
      const isSelected = selected === rating;
      return (
        <TouchableOpacity
          key={rating}
          onPress={() => onSelect(rating)}
          style={[styles.pill, isSelected && styles.selectedPill]}
        >
          <FontAwesome
            name="star"
            size={12}
            color={isSelected ? "#FFFFFF" : "#0D3A4B"}
          />
          <Text style={[styles.text, isSelected && styles.selectedText]}>
            {rating}
          </Text>
        </TouchableOpacity>
      );
    })}
  </ScrollView>
);

export default RatingFilter;

const styles = StyleSheet.create({
  container: { gap: 8, paddingVertical: 4 },
  pill: {
    height: 36,
    minWidth: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
    borderWidth: 1.5,
    borderColor: "#0D3A4B",
    borderRadius: 20,
    paddingHorizontal: 14,
  },
  selectedPill: { backgroundColor: "#0D3A4B" },
  text: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  selectedText: { color: "#FFFFFF" },
});
