/**
 * ReviewCard.tsx
 * Reusable card for a single course review — matches the design image.
 */
import { Review } from "@/constants/mockData";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(review.likes);

  const handleLike = () => {
    setLiked((prev) => {
      const next = !prev;
      setLocalLikes(review.likes + (next ? 1 : 0));
      return next;
    });
  };

  return (
    <View style={styles.card}>
      {/* ── Top Row: Avatar, Name, Rating, Menu ── */}
      <View style={styles.topRow}>
        <Image source={{ uri: review.avatarUri }} style={styles.avatar} />

        <View style={styles.nameBlock}>
          <Text style={styles.name}>{review.name}</Text>
        </View>

        {/* Star rating pill */}
        <View style={styles.ratingPill}>
          <FontAwesome name="star" size={12} color="#0D3A4B" />
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
      </View>

      {/* ── Comment ── */}
      <Text style={styles.comment}>{review.comment}</Text>

      {/* ── Bottom Row: Like, Count, Time ── */}
      <View style={styles.bottomRow}>
        <TouchableOpacity onPress={handleLike} style={styles.likeBtn}>
          <FontAwesome
            name={liked ? "heart" : "heart-o"}
            size={18}
            color={liked ? "#FF4D6D" : "#7C7C7C"}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{localLikes}</Text>
        <Text style={styles.timeAgo}>
          {new Date(review.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EEF2FF",
  },
  nameBlock: {
    flex: 1,
  },
  name: {
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
    color: "#181725",
  },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    borderWidth: 1.5,
    borderColor: "#0D3A4B",
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  ratingText: {
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
    color: "#0D3A4B",
  },
  comment: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: "#35343D",
    lineHeight: 21,
    marginBottom: 10,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  likeBtn: {
    padding: 2,
  },
  likeCount: {
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
    color: "#7C7C7C",
  },
  timeAgo: {
    fontFamily: "Urbanist-Regular",
    fontSize: 13,
    color: "#B0B0C3",
    marginLeft: 4,
  },
});

export default ReviewCard;
