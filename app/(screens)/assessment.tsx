import AssessmentQuestionCard from "@/components/AssessmentQuestionCard";
import { Header } from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { ProgressBar } from "@/components/ProgressBar";
import { getAssessment } from "@/constants/assessmentData";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Assessment = () => {
  const router = useRouter();
  const { sectionId } = useLocalSearchParams<{ sectionId?: string }>();
  const assessment = getAssessment(sectionId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const question = assessment.questions[currentIndex];
  const selectedAnswer = answers[currentIndex];
  const isLastQuestion = currentIndex === assessment.questions.length - 1;

  const selectAnswer = (answer: number) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentIndex]: answer,
    }));
  };

  const handleContinue = () => {
    if (selectedAnswer === undefined) return;
    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    const completedAnswers = { ...answers, [currentIndex]: selectedAnswer };
    const score = assessment.questions.reduce(
      (total, item, index) =>
        total + (completedAnswers[index] === item.correctAnswer ? 1 : 0),
      0,
    );

    router.replace({
      pathname: "/assessment-score",
      params: {
        sectionId: assessment.sectionId,
        score: String(score),
        answers: JSON.stringify(completedAnswers),
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Assessment" showMore={false} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{assessment.title}</Text>
        <Text style={styles.subtitle}>
          Answer each question to complete this section.
        </Text>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {currentIndex + 1} of {assessment.questions.length}
          </Text>
          <Text style={styles.progressText}>Multiple choice</Text>
        </View>
        <ProgressBar
          progress={(currentIndex + 1) / assessment.questions.length}
          color="#0d3a4b"
          height={7}
        />
        <View style={styles.questionContainer}>
          <AssessmentQuestionCard
            question={question}
            questionNumber={currentIndex + 1}
            selectedAnswer={selectedAnswer}
            onSelect={selectAnswer}
          />
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <PrimaryButton
          title={isLastQuestion ? "Submit Assessment" : "Next Question"}
          onPress={handleContinue}
          style={[
            styles.button,
            selectedAnswer === undefined && styles.disabledButton,
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default Assessment;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#FFFFFF" },
  content: { paddingHorizontal: 20, paddingBottom: 120 },
  title: {
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 25,
  },
  subtitle: {
    marginTop: 8,
    color: "#686770",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 26,
    marginBottom: 9,
  },
  progressText: {
    color: "#686770",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
  questionContainer: { marginTop: 24 },
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
  button: { height: 54, paddingVertical: 0 },
  disabledButton: { opacity: 0.45 },
});
