import AssessmentQuestionCard from "@/components/AssessmentQuestionCard";
import { Header } from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { getAssessment } from "@/constants/assessmentData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AssessmentReview = () => {
  const router = useRouter();
  const { sectionId, answers } = useLocalSearchParams<{
    sectionId?: string;
    answers?: string;
  }>();

  const assessment = getAssessment(sectionId);
  const parsedAnswers = React.useMemo(() => {
    try {
      return answers ? (JSON.parse(answers) as Record<number, number>) : {};
    } catch {
      return {} as Record<number, number>;
    }
  }, [answers]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Review Answers" showMore={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {assessment.questions.map((question, index) => {
          const selectedAnswer = parsedAnswers[index];
          const isCorrect = selectedAnswer === question.correctAnswer;

          return (
            <View key={question.id} style={styles.questionCard}>
              <AssessmentQuestionCard
                question={question}
                questionNumber={index + 1}
                selectedAnswer={selectedAnswer}
                showResult
                onSelect={() => undefined}
              />

              <View style={styles.summaryBox}>
                <Text style={styles.summaryLabel}>Answer review</Text>
                <Text
                  style={[
                    styles.summaryValue,
                    isCorrect ? styles.correct : styles.incorrect,
                  ]}
                >
                  {isCorrect
                    ? "Correct answer"
                    : `Incorrect — correct answer: ${question.options[question.correctAnswer]}`}
                </Text>
                <Text style={styles.explanation}>{question.explanation}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Back to Results"
          onPress={() => router.back()}
          style={styles.button}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssessmentReview;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 18,
  },
  questionCard: {
    gap: 14,
  },
  summaryBox: {
    padding: 16,
    borderRadius: 18,
    backgroundColor: "#F6F7FA",
  },
  summaryLabel: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 13,
  },
  summaryValue: {
    marginTop: 8,
    fontFamily: "Urbanist-SemiBold",
    fontSize: 14,
    lineHeight: 20,
  },
  correct: {
    color: "#1FA973",
  },
  incorrect: {
    color: "#E05656",
  },
  explanation: {
    marginTop: 10,
    color: "#5D6470",
    fontFamily: "Urbanist-Regular",
    fontSize: 13,
    lineHeight: 20,
  },
  footer: {
    position: "absolute",
    right: 0,
    bottom: 0,
    left: 0,
    padding: 20,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  button: {
    height: 54,
    paddingVertical: 0,
  },
});
