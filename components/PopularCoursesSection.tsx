import CourseCard from "@/components/CourseCard";
import CourseCategoryFilter, {
  useCourseCategoryFilter,
} from "@/components/CourseCategoryFilter";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { COURSE_CATEGORIES, Course } from "@/constants/mockData";

interface PopularCoursesSectionProps {
  courses: Course[];
  onSeeAll?: () => void;
}

const PopularCoursesSection = ({
  courses,
  onSeeAll,
}: PopularCoursesSectionProps) => {
  const { selectedCategory, setSelectedCategory, filtered } =
    useCourseCategoryFilter(courses);

  return (
    <View style={styles.container}>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Most Popular Courses</Text>
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      {/* Category filter pills */}
      <CourseCategoryFilter
        categories={COURSE_CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Course cards */}
      <View style={styles.cardList}>
        {filtered.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            imageUri={course.imageUri}
            name={course.name}
            category={course.category}
            price={course.price}
            originalPrice={course.originalPrice}
            rating={course.rating}
            totalStudents={course.totalStudents}
          />
        ))}
      </View>
    </View>
  );
};

export default PopularCoursesSection;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 25,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
  },
  seeAll: {
    fontSize: 15,
    fontFamily: "Urbanist-SemiBold",
    color: "#0D3A4B",
  },
  cardList: {
    gap: 4,
  },
});
