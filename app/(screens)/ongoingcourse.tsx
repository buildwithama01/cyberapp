import { Header } from "@/components/Header";
import LessonItem from "@/components/LessonItem";
import PrimaryButton from "@/components/PrimaryButton";
import { COURSE_LESSONS_DATA, ENROLLMENTS, MOCK_COURSES, CURRENT_USER } from "@/constants/mockData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OngoingCourse = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const enrollment = ENROLLMENTS.find(e => e.userId === CURRENT_USER.id && e.courseId === courseId) || ENROLLMENTS[0];
  const course = MOCK_COURSES.find(c => c.id === enrollment.courseId)!;

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title={course.name} onMorePress={() => undefined} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {COURSE_LESSONS_DATA.map((section) => (
          <View key={section.id} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionDuration}>
                {section.totalDuration}
              </Text>
            </View>
            <View style={styles.lessonsList}>
              {section.lessons.map((lesson) => (
                <LessonItem key={lesson.id} lesson={lesson} />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title="Continue Course"
          onPress={() =>
            router.push({
              pathname: "/course-player",
              params: { courseId: course.id },
            })
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default OngoingCourse;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 23, paddingBottom: 110 },
  section: { marginBottom: 6 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 7,
    marginBottom: 10,
  },
  sectionTitle: {
    color: "#686770",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 15,
  },
  sectionDuration: {
    color: "#315BFF",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  lessonsList: { gap: 12 },
  footer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    padding: 23,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
