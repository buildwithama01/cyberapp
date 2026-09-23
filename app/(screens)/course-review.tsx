import { Header } from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import StarRatingSelector from "@/components/StarRatingSelector";
import { ENROLLMENTS, MOCK_COURSES, CURRENT_USER } from "@/constants/mockData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CourseReview = () => {
  const router = useRouter();
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const enrollment = ENROLLMENTS.find(e => e.userId === CURRENT_USER.id && e.courseId === courseId) || ENROLLMENTS[0];
  const course = MOCK_COURSES.find(c => c.id === enrollment.courseId)!;

  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      router.back();
    }, 900);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Course Review" showMore={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.card}>
          <Text style={styles.title}>How was {course.name}?</Text>
          <Text style={styles.subtitle}>
            Let us know how your learning experience went and what we can do
            better.
          </Text>

          <StarRatingSelector
            label="Course rating"
            value={rating}
            onChange={setRating}
          />

          <View style={styles.inputWrap}>
            <Text style={styles.label}>Your review</Text>
            <TextInput
              value={reviewText}
              onChangeText={setReviewText}
              placeholder="Share a few words about your experience..."
              multiline
              numberOfLines={6}
              textAlignVertical="top"
              style={styles.textInput}
            />
          </View>

          {submitted ? (
            <View style={styles.successBox}>
              <Text style={styles.successTitle}>Thanks for your review</Text>
              <Text style={styles.successText}>
                Your feedback was submitted successfully.
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title={submitted ? "Review Sent" : "Submit Review"}
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default CourseReview;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  card: {
    gap: 20,
    padding: 20,
    borderRadius: 24,
    backgroundColor: "#F8FAFC",
  },
  title: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 26,
  },
  subtitle: {
    color: "#5D6470",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    lineHeight: 22,
  },
  inputWrap: {
    gap: 10,
  },
  label: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
  },
  textInput: {
    minHeight: 140,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDE7F2",
    backgroundColor: "#FFFFFF",
    color: "#1F2937",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
    textAlignVertical: "top",
  },
  successBox: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#E8F8F1",
  },
  successTitle: {
    color: "#0C7C52",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  successText: {
    marginTop: 4,
    color: "#2E7D5A",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
  },
  footer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    paddingHorizontal: 20,
    paddingBottom: 24,
    paddingTop: 12,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
});
