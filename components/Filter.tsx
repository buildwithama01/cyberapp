import CourseCategoryFilter from "@/components/CourseCategoryFilter";
import PriceRange from "@/components/PriceRange";
import RatingFilter from "@/components/RatingFilter";
import { COURSE_CATEGORIES, COURSE_REVIEWS_META } from "@/constants/mockData";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface FilterProps {
  visible: boolean;
  category: string;
  minPrice: number;
  maxPrice: number;
  rating: "All" | number;
  onCategoryChange: (category: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: "All" | number) => void;
  onReset: () => void;
  onApply: () => void;
  onClose: () => void;
}

const Filter = ({
  visible,
  category,
  minPrice,
  maxPrice,
  rating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
  onApply,
  onClose,
}: FilterProps) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <Pressable style={styles.backdrop} onPress={onClose}>
      <Pressable
        style={styles.sheet}
        onPress={(event) => event.stopPropagation()}
      >
        <View style={styles.handle} />
        <Text style={styles.title}>Filter</Text>

        <View style={styles.divider} />
        <Text style={styles.sectionTitle}>Category</Text>
        <CourseCategoryFilter
          categories={COURSE_CATEGORIES}
          selected={category}
          onSelect={onCategoryChange}
        />

        <Text style={styles.sectionTitle}>Price</Text>
        <PriceRange min={minPrice} max={maxPrice} onChange={onPriceChange} />

        <Text style={styles.sectionTitle}>Rating</Text>
        <RatingFilter
          ratings={COURSE_REVIEWS_META.ratingFilters}
          selected={rating}
          onSelect={onRatingChange}
        />

        <View style={styles.divider} />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.resetButton} onPress={onReset}>
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={onApply}>
            <Text style={styles.applyText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
    </Pressable>
  </Modal>
);

export default Filter;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(17, 24, 39, 0.65)",
  },
  sheet: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
  handle: {
    alignSelf: "center",
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D9D9D9",
    marginBottom: 18,
  },
  title: {
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
    textAlign: "center",
    marginBottom: 18,
  },
  divider: { height: 1, backgroundColor: "#EEEEEE", marginBottom: 20 },
  sectionTitle: {
    color: "#35343D",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    marginBottom: 15,
  },
  actions: { flexDirection: "row", alignItems: "center", gap: 10 },
  resetButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 28,
    backgroundColor: "#EEF1FF",
  },
  resetText: { color: "#0D3A4B", fontFamily: "Urbanist-Bold", fontSize: 15 },
  applyButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 28,
    backgroundColor: "#0D3A4B",
  },
  applyText: { color: "#EEF1FF", fontFamily: "Urbanist-Bold", fontSize: 15 },
});
