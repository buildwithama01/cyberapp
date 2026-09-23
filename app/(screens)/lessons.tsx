import EnrollFooter from "@/components/EnrollFooter";
import { Header } from "@/components/Header";
import LessonItem from "@/components/LessonItem";
import { COURSE_LESSONS_DATA } from "@/constants/mockData";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Lessons = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Lessons" onMorePress={() => undefined} />

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
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  onPress={() =>
                    router.push({
                      pathname: "/course-player",
                      params: { courseId: "1" },
                    })
                  }
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.assessmentButton}
              onPress={() =>
                router.push({
                  pathname: "/assessment",
                  params: { sectionId: section.id },
                })
              }
              activeOpacity={0.8}
            >
              <Text style={styles.assessmentButtonText}>Take Assessment</Text>
              <Text style={styles.assessmentButtonArrow}>→</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <EnrollFooter coursePrice="40" />
    </SafeAreaView>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 13,
    paddingBottom: 110,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 8,
  },
  sectionTitle: {
    color: "#4C4B56",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 17,
  },
  sectionDuration: {
    color: "#35343D",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  lessonsList: {
    gap: 12,
  },
  assessmentButton: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: "#EEF2FF",
  },
  assessmentButtonText: {
    color: "#0d3a4b",
    fontFamily: "Urbanist-Bold",
    fontSize: 14,
  },
  assessmentButtonArrow: {
    color: "#0d3a4b",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
  },
});
