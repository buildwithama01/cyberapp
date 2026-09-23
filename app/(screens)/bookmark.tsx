import CourseCard from "@/components/CourseCard";
import CourseCategoryFilter, {
  useCourseCategoryFilter,
} from "@/components/CourseCategoryFilter";
import { Header } from "@/components/Header";
import RemoveBookmark from "@/components/RemoveBookmark";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COURSE_CATEGORIES, MOCK_COURSES } from "@/constants/mockData";

export default function BookmarkScreen() {
  const [bookmarkedCourses, setBookmarkedCourses] = useState(MOCK_COURSES);
  const [courseToRemove, setCourseToRemove] = useState<
    (typeof MOCK_COURSES)[number] | null
  >(null);
  const { selectedCategory, setSelectedCategory, filtered } =
    useCourseCategoryFilter(bookmarkedCourses);

  const removeCourse = () => {
    if (!courseToRemove) return;
    setBookmarkedCourses((courses) =>
      courses.filter((course) => course.id !== courseToRemove.id),
    );
    setCourseToRemove(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Bookmark" />
      <View style={styles.categoryFilter}>
        <CourseCategoryFilter
          categories={COURSE_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
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
            onBookmarkPress={() => setCourseToRemove(course)}
          />
        ))}
      </ScrollView>
      {courseToRemove && (
        <RemoveBookmark
          isVisible
          onClose={() => setCourseToRemove(null)}
          onConfirm={removeCourse}
          imageUri={courseToRemove.imageUri}
          name={courseToRemove.name}
          category={courseToRemove.category}
          price={courseToRemove.price}
          originalPrice={courseToRemove.originalPrice}
          rating={courseToRemove.rating}
          totalStudents={courseToRemove.totalStudents}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  categoryFilter: {
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 5,
    paddingBottom: 24,
  },
});
