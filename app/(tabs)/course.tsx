import NotFoundImage from "@/assets/images/notfound.svg";
import { CourseCard, isCourseCompleted } from "@/components/MyCourseCard";
import { TabHeader } from "@/components/TabHeader";
import { TabSelector } from "@/components/TabSelector";
import { COURSE_TABS, ENROLLMENTS, MOCK_COURSES, CURRENT_USER } from "@/constants/mockData";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyCoursesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Ongoing");
  const [searchQuery, setSearchQuery] = useState("");
  const userEnrollments = ENROLLMENTS.filter((e) => e.userId === CURRENT_USER.id);
  const myCourses = userEnrollments.flatMap((e) => {
    const course = MOCK_COURSES.find((c) => c.id === e.courseId);
    if (!course) return [];

    return [
      {
        ...course,
        currentLesson: e.currentLesson,
        totalLessons: e.totalLessons,
      },
    ];
  });

  const filteredCourses = myCourses.filter(
    (course) =>
      (activeTab === "Completed"
        ? isCourseCompleted(course.currentLesson, course.totalLessons)
        : !isCourseCompleted(course.currentLesson, course.totalLessons)) &&
      course.name.toLowerCase().includes(searchQuery.trim().toLowerCase()),
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabHeader
        title="My Courses"
        showInlineSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <TabSelector
        tabs={COURSE_TABS}
        activeTab={activeTab}
        onSelectTab={setActiveTab}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              {...course as any}
              onPress={() =>
                router.push({
                  pathname: isCourseCompleted(
                    course.currentLesson,
                    course.totalLessons,
                  )
                    ? "/completedcourse"
                    : "/ongoingcourse",
                  params: { courseId: course.id },
                })
              }
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <NotFoundImage width={300} height={300} />
            <Text style={styles.emptyStateText}>No active course here</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 80,
  },
  emptyStateText: {
    marginTop: 12,
    fontSize: 20,
    fontFamily: "Urbanist-SemiBold",
    color: "#6B7280",
  },
});
