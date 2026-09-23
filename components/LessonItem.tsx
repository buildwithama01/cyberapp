import { Lesson } from "@/constants/mockData";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LessonItemProps {
  lesson: Lesson;
  onPress?: () => void;
}

export const LessonItem: React.FC<LessonItemProps> = ({ lesson, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.row}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={!lesson.isUnlocked}
    >
      {/* Number bubble */}
      <View style={styles.numberBubble}>
        <Text style={styles.numberText}>{lesson.number}</Text>
      </View>

      {/* Title + duration */}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {lesson.title}
        </Text>
        <Text style={styles.duration}>{lesson.duration}</Text>
      </View>

      {/* Lock / Play icon */}
      {lesson.isUnlocked ? (
        // <FontAwesome name="play-circle" size={30} color="#0D3A4B" />
        <FontAwesome6 name="play" size={20} color="#0D3A4B" />
      ) : (
        <FontAwesome6 name="lock" size={20} color="#0D3A4B" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    gap: 14,
  },
  numberBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
    color: "#0D3A4B",
  },
  info: {
    flex: 1,
  },
  title: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 16,
    color: "#181725",
    marginBottom: 3,
  },
  duration: {
    fontFamily: "Urbanist-Regular",
    fontSize: 13,
    color: "#7C7C7C",
  },
});

export default LessonItem;
