import { CURRENT_USER } from "@/constants/mockData";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ProfileHeaderProps {
  name?: string;
  email?: string;
  imageUri?: string;
  onEditPress?: () => void;
}

const ProfileHeader = ({
  name = CURRENT_USER.fullName,
  email = CURRENT_USER.email,
  imageUri = CURRENT_USER.avatarUrl,
  onEditPress,
}: ProfileHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          source={
            imageUri ? { uri: imageUri } : require("@/assets/images/avatar.png") // Fallback avatar image path
          }
          style={styles.avatar}
        />
        <TouchableOpacity onPress={onEditPress} style={styles.editButton}>
          <Feather name="edit-2" size={14} color="#ffffff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.emailText}>{email}</Text>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0d3a4b", // Adjust color if necessary to perfectly match the blue
    width: 28,
    height: 28,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  nameText: {
    fontSize: 22,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
    marginBottom: 5,
  },
  emailText: {
    fontSize: 14,
    fontFamily: "Urbanist-Regular",
    color: "#181725",
  },
});
