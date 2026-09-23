import { BookmarkSimple, Star } from "phosphor-react-native";
import React from "react";
import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface RemoveBookmarkProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  imageUri: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  totalStudents?: string | number;
}

const RemoveBookmark = ({
  isVisible,
  onClose,
  onConfirm,
  imageUri,
  name,
  category,
  price,
  originalPrice,
  rating,
  totalStudents,
}: RemoveBookmarkProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={styles.sheetContainer}
          onPress={(event) => event.stopPropagation()}
        >
          <View style={styles.handle} />
          <Text style={styles.title}>Remove from Bookmark?</Text>
          <View style={styles.divider} />

          <View style={styles.courseCard}>
            <Image source={{ uri: imageUri }} style={styles.courseImage} />
            <View style={styles.courseDetails}>
              <View style={styles.courseTopRow}>
                <Text style={styles.category}>{category}</Text>
                <BookmarkSimple size={19} color="#0D3A4B" weight="fill" />
              </View>
              <Text style={styles.courseName} numberOfLines={1}>
                {name}
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>₦{price}</Text>
                {originalPrice !== undefined && (
                  <Text style={styles.originalPrice}>₦{originalPrice}</Text>
                )}
              </View>
              <View style={styles.metaRow}>
                <Star size={14} color="#FF9F1C" weight="fill" />
                <Text style={styles.metaText}>{rating}</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.metaText}>{totalStudents} students</Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Yes, Remove</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default RemoveBookmark;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 25,
    paddingBottom: 40,
    width: "100%",
  },
  handle: {
    alignSelf: "center",
    width: 34,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E0E0E0",
    marginBottom: 24,
  },
  title: {
    textAlign: "center",
    fontSize: 21,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
  },
  divider: {
    height: 1,
    backgroundColor: "#EEEEEE",
    marginTop: 20,
    marginBottom: 22,
  },
  courseCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 10,
    shadowColor: "#A8AFBF",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 3,
  },
  courseImage: { width: 108, height: 108, borderRadius: 18 },
  courseDetails: { flex: 1, minWidth: 0, marginLeft: 14, paddingTop: 3 },
  courseTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  category: {
    color: "#0D3A4B",
    backgroundColor: "#EEF2FF",
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontFamily: "Urbanist-Regular",
  },
  courseName: {
    color: "#181725",
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    marginTop: 9,
  },
  priceRow: { flexDirection: "row", alignItems: "center", marginTop: 7 },
  price: { color: "#0D3A4B", fontSize: 19, fontFamily: "Urbanist-Bold" },
  originalPrice: {
    color: "#7C7C7C",
    fontSize: 12,
    marginLeft: 10,
    textDecorationLine: "line-through",
    fontFamily: "Urbanist-Regular",
  },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 9 },
  metaText: {
    color: "#7C7C7C",
    fontSize: 11,
    marginLeft: 5,
    fontFamily: "Urbanist-Regular",
  },
  separator: { color: "#B8B8B8", fontSize: 12, marginHorizontal: 7 },
  actions: { flexDirection: "row", gap: 10, marginTop: 22 },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EEF2FF",
    borderRadius: 28,
    paddingVertical: 17,
  },
  confirmButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0D3A4B",
    borderRadius: 28,
    paddingVertical: 17,
  },
  cancelText: { color: "#0D3A4B", fontSize: 15, fontFamily: "Urbanist-Bold" },
  confirmText: { color: "#FFFFFF", fontSize: 15, fontFamily: "Urbanist-Bold" },
});
