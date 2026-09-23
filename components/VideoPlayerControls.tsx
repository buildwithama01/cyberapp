import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface VideoPlayerControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  progress: number;
  currentTimeLabel: string;
  durationLabel: string;
  onPlayPause: () => void;
  onRewind: () => void;
  onMuteToggle: () => void;
  onToggleFullscreen: () => void;
}

const VideoPlayerControls = ({
  isPlaying,
  isMuted,
  progress,
  currentTimeLabel,
  durationLabel,
  onPlayPause,
  onRewind,
  onMuteToggle,
  onToggleFullscreen,
}: VideoPlayerControlsProps) => {
  const safeProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.container}>
      <View style={styles.progressRow}>
        <Text style={styles.timeText}>{currentTimeLabel}</Text>
        <View style={styles.track}>
          <View style={[styles.fill, { width: `${safeProgress}%` }]} />
        </View>
        <Text style={styles.timeText}>{durationLabel}</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity style={styles.controlButton} onPress={onRewind}>
          <Ionicons name="play-back" size={20} color="#0D3A4B" />
          <Text style={styles.controlLabel}>10s</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryControl} onPress={onPlayPause}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={24}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.controlButton} onPress={onMuteToggle}>
          <Ionicons
            name={isMuted ? "volume-mute" : "volume-high"}
            size={20}
            color="#0D3A4B"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.controlButton}
          onPress={onToggleFullscreen}
        >
          <Ionicons name="expand" size={22} color="#0D3A4B" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoPlayerControls;

const styles = StyleSheet.create({
  container: {
    gap: 18,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  track: {
    flex: 1,
    height: 7,
    borderRadius: 999,
    backgroundColor: "#E7ECF3",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: 999,
    backgroundColor: "#0D3A4B",
  },
  timeText: {
    minWidth: 52,
    color: "#5D6470",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 12,
    textAlign: "center",
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    minWidth: 66,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "#F4F7FB",
  },
  controlLabel: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 12,
  },
  primaryControl: {
    width: 62,
    height: 62,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 31,
    backgroundColor: "#0D3A4B",
    shadowColor: "#0D3A4B",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 18,
    elevation: 4,
  },
});
