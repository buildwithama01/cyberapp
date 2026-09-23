import { Header } from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { getAssessment } from "@/constants/assessmentData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AssessmentScore = () => {
  const router = useRouter();
  const { sectionId, score, answers } = useLocalSearchParams<{
    sectionId?: string;
    score?: string;
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

  const totalQuestions = assessment.questions.length;
  const correctAnswers = assessment.questions.reduce(
    (total, question, index) =>
      total + (parsedAnswers[index] === question.correctAnswer ? 1 : 0),
    0,
  );
  const currentScore = Number(score ?? correctAnswers ?? 0);
  const scorePercentage = Math.round((currentScore / totalQuestions) * 100);

  const statusText =
    scorePercentage >= 80
      ? "Excellent work"
      : scorePercentage >= 60
        ? "Nice progress"
        : scorePercentage >= 40
          ? "Keep going"
          : "Let’s try again";

  const handleReview = () => {
    router.push({
      pathname: "/assessment-review",
      params: {
        sectionId: assessment.sectionId,
        answers: JSON.stringify(parsedAnswers),
      },
    });
  };

  const handleRetake = () => {
    router.replace({
      pathname: "/assessment",
      params: { sectionId: assessment.sectionId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Assessment Result" showMore={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.summaryCard}>
          <Text style={styles.badge}>Section Complete</Text>
          <Text style={styles.scoreLabel}>Your score</Text>
          <Text style={styles.scoreText}>
            {currentScore}/{totalQuestions}
          </Text>
          <Text style={styles.scorePercent}>({scorePercentage}%)</Text>
          <Text style={styles.statusText}>{statusText}</Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{correctAnswers}</Text>
            <Text style={styles.infoLabel}>Correct</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>
              {totalQuestions - correctAnswers}
            </Text>
            <Text style={styles.infoLabel}>Incorrect</Text>
          </View>
        </View>

        <View style={styles.reviewCard}>
          <Text style={styles.reviewTitle}>Review summary</Text>
          {assessment.questions.map((question, index) => {
            const selectedIndex = parsedAnswers[index];
            const isCorrect = selectedIndex === question.correctAnswer;

            return (
              <View key={question.id} style={styles.questionRow}>
                <View style={styles.questionHeader}>
                  <Text style={styles.questionNumber}>Q{index + 1}</Text>
                  <Text
                    style={[
                      styles.resultBadge,
                      isCorrect ? styles.correctBadge : styles.incorrectBadge,
                    ]}
                  >
                    {isCorrect ? "Correct" : "Incorrect"}
                  </Text>
                </View>
                <Text style={styles.questionText}>{question.question}</Text>
                <Text style={styles.answerText}>
                  Your answer:{" "}
                  {selectedIndex !== undefined
                    ? question.options[selectedIndex]
                    : "No answer selected"}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Review Answers"
          onPress={handleReview}
          style={styles.button}
        />
        <PrimaryButton
          title="Retake Assessment"
          onPress={handleRetake}
          style={[styles.button, styles.secondaryButton]}
        />
      </View>
    </SafeAreaView>
  );
};

export default AssessmentScore;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  summaryCard: {
    alignItems: "center",
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderRadius: 28,
    backgroundColor: "#F3F7FB",
  },
  badge: {
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#E0F5EE",
    color: "#11845B",
    fontFamily: "Urbanist-Bold",
    fontSize: 12,
  },
  scoreLabel: {
    color: "#5D6470",
    fontFamily: "Urbanist-Medium",
    fontSize: 15,
  },
  scoreText: {
    marginTop: 8,
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 42,
  },
  scorePercent: {
    marginTop: 4,
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 18,
  },
  statusText: {
    marginTop: 12,
    color: "#181725",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 18,
  },
  infoRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  infoBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 18,
    borderRadius: 18,
    backgroundColor: "#F7F7F8",
  },
  infoValue: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 24,
  },
  infoLabel: {
    marginTop: 4,
    color: "#686770",
    fontFamily: "Urbanist-Medium",
    fontSize: 13,
  },
  reviewCard: {
    marginTop: 20,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#D9DCE8",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 2,
  },
  reviewTitle: {
    marginBottom: 14,
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
  },
  questionRow: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEF1F4",
  },
  questionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  questionNumber: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 14,
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontFamily: "Urbanist-SemiBold",
    fontSize: 11,
  },
  correctBadge: {
    backgroundColor: "#EAF8F1",
    color: "#1FA973",
  },
  incorrectBadge: {
    backgroundColor: "#FFF0F0",
    color: "#E05656",
  },
  questionText: {
    marginTop: 10,
    color: "#1F2430",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 15,
    lineHeight: 22,
  },
  answerText: {
    marginTop: 8,
    color: "#5E6470",
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
    marginBottom: 12,
    paddingVertical: 0,
  },
  secondaryButton: {
    backgroundColor: "#0D3A4B",
  },
});
