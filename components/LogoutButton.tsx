import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface LogoutButtonProps {
  onPress?: () => void;
}

const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Feather name="log-out" size={20} color="#d32323" />
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LogoutButton;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    marginVertical: 25,
  },
  button: {
    backgroundColor: "#F2F3F2",
    borderRadius: 18,
    height: 65,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: "#d32323",
    marginLeft: 12,
  },
});
