import { Header } from "@/components/Header";
import VideoPlayerControls from "@/components/VideoPlayerControls";
import { ENROLLMENTS, MOCK_COURSES, CURRENT_USER } from "@/constants/mockData";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const formatTime = (value: number) => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

const CoursePlayer = () => {
  const { courseId } = useLocalSearchParams<{ courseId?: string }>();
  const enrollment = ENROLLMENTS.find(e => e.userId === CURRENT_USER.id && e.courseId === courseId) || ENROLLMENTS[0];
  const course = MOCK_COURSES.find(c => c.id === enrollment.courseId)!;

  const totalSeconds = 1472;
  const [currentTime, setCurrentTime] = useState(684);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((previous) => {
        if (previous >= totalSeconds) {
          return totalSeconds;
        }
        return previous + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, totalSeconds]);

  const progress = useMemo(
    () => (currentTime / totalSeconds) * 100,
    [currentTime, totalSeconds],
  );

  const handleRewind = () => {
    setCurrentTime((previous) => Math.max(previous - 10, 0));
  };

  const handleToggleFullscreen = () => {
    // Intentionally left as a visual-only control for the prototype flow.
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Course Player" showMore={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.videoContainer}>
          <Image source={{ uri: course.imageUri }} style={styles.videoImage} />
          <View style={styles.videoOverlay} />

          <View style={styles.badgeRow}>
            <Text style={styles.badge}>Lesson 08</Text>
          </View>

          <View style={styles.playButtonWrap}>
            <View style={styles.playButton}>
              <Ionicons
                name={isPlaying ? "pause" : "play"}
                size={34}
                color="#FFFFFF"
              />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.lessonTitle}>Design systems for smoother UX</Text>
          <Text style={styles.lessonMeta}>
            This lesson is part of your {course.name} course.
          </Text>

          <VideoPlayerControls
            isPlaying={isPlaying}
            isMuted={isMuted}
            progress={progress}
            currentTimeLabel={formatTime(currentTime)}
            durationLabel={formatTime(totalSeconds)}
            onPlayPause={() => setIsPlaying((previous) => !previous)}
            onRewind={handleRewind}
            onMuteToggle={() => setIsMuted((previous) => !previous)}
            onToggleFullscreen={handleToggleFullscreen}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CoursePlayer;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 28,
    gap: 18,
  },
  videoContainer: {
    height: 240,
    borderRadius: 28,
    overflow: "hidden",
    backgroundColor: "#D7E2F1",
  },
  videoImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  videoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(14, 31, 45, 0.24)",
  },
  badgeRow: {
    position: "absolute",
    top: 18,
    left: 18,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 12,
  },
  playButtonWrap: {
    position: "absolute",
    inset: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  playButton: {
    width: 74,
    height: 74,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 37,
    backgroundColor: "rgba(13, 58, 75, 0.72)",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
  },
  card: {
    gap: 20,
    padding: 20,
    borderRadius: 26,
    backgroundColor: "#F8FAFC",
  },
  lessonTitle: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
  },
  lessonMeta: {
    color: "#5D6470",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    lineHeight: 20,
  },
});
