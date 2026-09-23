import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ProgressBar } from "./ProgressBar";

export const isCourseCompleted = (
  currentLesson: number,
  totalLessons: number,
) => totalLessons > 0 && currentLesson === totalLessons;

export const getProgressColor = (
  currentLesson: number,
  totalLessons: number,
) => {
  if (isCourseCompleted(currentLesson, totalLessons)) {
    return "#0D3A4B";
  }

  const progress = totalLessons > 0 ? currentLesson / totalLessons : 0;

  if (progress >= 0.75) {
    return "#22C55E";
  }

  if (progress >= 0.5) {
    return "#F59E0B";
  }

  return "#FF4D6D";
};

export interface CourseCardProps {
  id: string;
  name: string;
  durationHours: number;
  currentLesson: number;
  totalLessons: number;
  imageUri: string;
  onPress?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  name,
  durationHours,
  currentLesson,
  totalLessons,
  imageUri,
  onPress,
}) => {
  const progress = totalLessons > 0 ? currentLesson / totalLessons : 0;
  const progressColor = getProgressColor(currentLesson, totalLessons);

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.thumbnail} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.duration}>{durationHours} Hour(s)</Text>

        <View style={styles.progressRow}>
          <ProgressBar progress={progress} color={progressColor} />
          <Text style={styles.progressText}>
            {currentLesson} / {totalLessons}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#B9BDC7",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 22,
    marginRight: 14,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontFamily: "Urbanist-Bold",
    color: "#111827",
  },
  duration: {
    fontSize: 14,
    fontFamily: "Urbanist-Medium",
    color: "#9CA3AF",
    marginTop: 4,
    marginBottom: 12,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    fontFamily: "Urbanist-SemiBold",
  },
});
