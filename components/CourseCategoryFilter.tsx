import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export interface Category {
  label: string;
  emoji?: string;
}

export interface CategorizedCourse {
  category: string;
}

export const useCourseCategoryFilter = <T extends CategorizedCourse>(
  courses: T[],
) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filtered =
    selectedCategory === "All"
      ? courses
      : courses.filter((course) => course.category === selectedCategory);

  return { selectedCategory, setSelectedCategory, filtered };
};

interface CourseCategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (label: string) => void;
}

const CourseCategoryFilter = ({
  categories,
  selected,
  onSelect,
}: CourseCategoryFilterProps) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {categories.map((cat) => {
        const isSelected = cat.label === selected;
        return (
          <TouchableOpacity
            key={cat.label}
            style={[styles.pill, isSelected && styles.pillSelected]}
            onPress={() => onSelect(cat.label)}
            activeOpacity={0.75}
          >
            {cat.emoji ? <Text style={styles.emoji}>{cat.emoji}</Text> : null}
            <Text
              style={[styles.pillText, isSelected && styles.pillTextSelected]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CourseCategoryFilter;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 2,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: "#D0D5E8",
    paddingVertical: 9,
    paddingHorizontal: 18,
    backgroundColor: "#FFFFFF",
  },
  pillSelected: {
    backgroundColor: "#0D3A4B",
    borderColor: "#0D3A4B",
  },
  emoji: {
    fontSize: 15,
    marginRight: 6,
  },
  pillText: {
    fontSize: 14,
    fontFamily: "Urbanist-SemiBold",
    color: "#4A5568",
  },
  pillTextSelected: {
    color: "#FFFFFF",
  },
});
