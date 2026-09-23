import { router } from "expo-router";
import { BookmarkSimple, Star } from "phosphor-react-native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CourseCardProps {
  id?: string | number;
  imageUri: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  totalStudents?: string | number;
  onBookmarkPress?: () => void;
  isBookmarked?: boolean;
}

const CourseCard = ({
  id,
  imageUri,
  name,
  category,
  price,
  originalPrice,
  rating,
  totalStudents,
  onBookmarkPress,
  isBookmarked = true,
}: CourseCardProps) => {
  const [bookmarked, setBookmarked] = useState(isBookmarked);

  const handlePress = () => {
    router.push({
      pathname: "/(screens)/course-details",
      params: {
        id: id?.toString(),
        courseId: id?.toString(),
      },
    });
  };
  return (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imageUri }} style={styles.courseImage} />

      <View style={styles.details}>
        <View style={styles.topRow}>
          <Text style={styles.courseInfo} numberOfLines={1}>
            {category}
          </Text>
          <TouchableOpacity
            accessibilityLabel="Bookmark course"
            onPress={(event) => {
              event.stopPropagation();
              if (onBookmarkPress) {
                onBookmarkPress();
              } else {
                setBookmarked((value) => !value);
              }
            }}
            style={styles.bookmarkButton}
          >
            <BookmarkSimple
              size={22}
              color="#0D3A4B"
              weight={bookmarked ? "fill" : "regular"}
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.courseName} numberOfLines={2}>
          {name}
        </Text>

        <View style={styles.priceRow}>
          <Text style={styles.coursePrice}>₦{price}</Text>
          {originalPrice !== undefined && (
            <Text style={styles.originalPrice}>₦{originalPrice}</Text>
          )}
        </View>

        <View style={styles.metaRow}>
          <Star size={17} color="#FF9F1C" weight="fill" />
          <Text style={styles.rating}>{rating}</Text>
          <Text style={styles.separator}>|</Text>
          <Text style={styles.students}>{totalStudents} students</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    width: "94%",
    minHeight: 184,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#B9BDC7",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  courseImage: {
    width: 150,
    height: 150,
    borderRadius: 22,
    resizeMode: "cover",
    backgroundColor: "#EAF0FF",
  },
  details: {
    flex: 1,
    minWidth: 0,
    marginLeft: 20,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 28,
  },
  bookmarkButton: {
    marginLeft: 8,
    padding: 4,
  },
  courseName: {
    color: "#181725",
    fontSize: 20,
    lineHeight: 26,
    marginTop: 10,
    fontFamily: "Urbanist-Bold",
  },
  courseInfo: {
    alignSelf: "flex-start",
    color: "#0D3A4B",
    backgroundColor: "#EEF2FF",
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 13,
    fontFamily: "Urbanist-Regular",
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 9,
  },
  coursePrice: {
    color: "#0D3A4B",
    fontSize: 22,
    fontFamily: "Urbanist-Bold",
  },
  originalPrice: {
    color: "#7C7C7C",
    fontSize: 14,
    marginLeft: 12,
    textDecorationLine: "line-through",
    fontFamily: "Urbanist-Regular",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  rating: {
    color: "#7C7C7C",
    fontSize: 14,
    marginLeft: 8,
    fontFamily: "Urbanist-Regular",
  },
  separator: {
    color: "#B8B8B8",
    fontSize: 14,
    marginHorizontal: 10,
  },
  students: {
    color: "#7C7C7C",
    flexShrink: 1,
    fontSize: 14,
    fontFamily: "Urbanist-Regular",
  },
});
