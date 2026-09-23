import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

interface ChatComposerProps {
  value: string;
  onChangeText: (value: string) => void;
  onSend: () => void;
  disabled?: boolean;
}

const ChatComposer = ({
  value,
  onChangeText,
  onSend,
  disabled = false,
}: ChatComposerProps) => (
  <View style={styles.container}>
    <TextInput
      accessibilityLabel="Message"
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder="Message..."
      placeholderTextColor="#A8A8A8"
      multiline
      maxLength={1000}
      returnKeyType="send"
      blurOnSubmit={false}
      onSubmitEditing={onSend}
    />
    <TouchableOpacity
      accessibilityLabel="Send message"
      accessibilityRole="button"
      activeOpacity={0.8}
      disabled={disabled}
      onPress={onSend}
      style={[styles.sendButton, disabled && styles.sendButtonDisabled]}
    >
      <Ionicons name="arrow-up" size={23} color="#FFFFFF" />
    </TouchableOpacity>
  </View>
);

export default ChatComposer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#FFFFFF",
    minHeight: 74,
  },
  input: {
    flex: 1,
    minHeight: 54,
    maxHeight: 120,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlignVertical: "top",
    borderRadius: 14,
    backgroundColor: "#FAFAFA",
    color: "#292929",
    fontFamily: "Urbanist-Regular",
    fontSize: 15,
  },
  sendButton: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0d3a4b",
  },
  sendButtonDisabled: {
    opacity: 0.45,
  },
});
