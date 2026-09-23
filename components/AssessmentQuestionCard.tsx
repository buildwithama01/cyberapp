import AssessmentOption from "@/components/AssessmentOption";
import { AssessmentQuestion } from "@/constants/assessmentData";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AssessmentQuestionCardProps {
  question: AssessmentQuestion;
  questionNumber: number;
  selectedAnswer?: number;
  showResult?: boolean;
  onSelect: (answer: number) => void;
}

const AssessmentQuestionCard = ({
  question,
  questionNumber,
  selectedAnswer,
  showResult = false,
  onSelect,
}: AssessmentQuestionCardProps) => (
  <View style={styles.container}>
    <Text style={styles.questionNumber}>Question {questionNumber}</Text>
    <Text style={styles.question}>{question.question}</Text>
    <View style={styles.options}>
      {question.options.map((option, index) => (
        <AssessmentOption
          key={option}
          label={option}
          selected={selectedAnswer === index}
          correct={showResult && index === question.correctAnswer}
          incorrect={
            showResult &&
            selectedAnswer === index &&
            index !== question.correctAnswer
          }
          disabled={showResult}
          onPress={() => onSelect(index)}
        />
      ))}
    </View>
  </View>
);

export default AssessmentQuestionCard;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    shadowColor: "#D9DCE8",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 2,
  },
  questionNumber: {
    marginBottom: 10,
    color: "#0d3a4b",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
  question: {
    marginBottom: 22,
    color: "#181725",
    fontFamily: "Urbanist-Bold",
    fontSize: 20,
    lineHeight: 27,
  },
  options: {
    gap: 12,
  },
});
