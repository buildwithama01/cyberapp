import { Header } from "@/components/Header";
import ReviewCard from "@/components/ReviewCard";
import { COURSE_REVIEWS_DATA, COURSE_REVIEWS_META } from "@/constants/mockData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Reviews = () => {
  const [selectedRating, setSelectedRating] = useState<"All" | number>("All");

  const reviews =
    selectedRating === "All"
      ? COURSE_REVIEWS_DATA
      : COURSE_REVIEWS_DATA.filter(
          (review) => review.rating === selectedRating,
        );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Reviews" onMorePress={() => undefined} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ratingFilters}
        >
          {COURSE_REVIEWS_META.ratingFilters.map((filter) => {
            const isSelected = selectedRating === filter;

            return (
              <TouchableOpacity
                key={filter}
                accessibilityRole="button"
                accessibilityState={{ selected: isSelected }}
                onPress={() => setSelectedRating(filter)}
                style={[
                  styles.ratingFilter,
                  isSelected && styles.selectedFilter,
                ]}
              >
                <FontAwesome
                  name="star"
                  size={12}
                  color={isSelected ? "#FFFFFF" : "#0D3A4B"}
                />
                <Text
                  style={[
                    styles.ratingFilterText,
                    isSelected && styles.selectedFilterText,
                  ]}
                >
                  {filter}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  ratingFilters: {
    gap: 8,
    paddingVertical: 8,
  },
  ratingFilter: {
    minWidth: 48,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    borderWidth: 1.5,
    borderColor: "#0D3A4B",
    borderRadius: 18,
    paddingHorizontal: 13,
  },
  selectedFilter: {
    backgroundColor: "#0D3A4B",
  },
  ratingFilterText: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
  selectedFilterText: {
    color: "#FFFFFF",
  },
  reviewsList: {
    marginTop: 2,
  },
});
