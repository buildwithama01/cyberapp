import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ChatMessageProps {
  text: string;
  sentAt: string;
  isUser: boolean;
}

const ChatMessage = ({ text, sentAt, isUser }: ChatMessageProps) => (
  <View style={[styles.row, isUser ? styles.userRow : styles.supportRow]}>
    <View
      style={[styles.bubble, isUser ? styles.userBubble : styles.supportBubble]}
    >
      <Text style={[styles.messageText, isUser && styles.userMessageText]}>
        {text}
      </Text>
      <Text style={[styles.timeText, isUser && styles.userTimeText]}>
        {sentAt}
      </Text>
    </View>
  </View>
);

export default ChatMessage;

const styles = StyleSheet.create({
  row: {
    width: "100%",
    marginBottom: 12,
  },
  supportRow: {
    alignItems: "flex-start",
  },
  userRow: {
    alignItems: "flex-end",
  },
  bubble: {
    minWidth: 104,
    maxWidth: "76%",
    minHeight: 45,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
  },
  supportBubble: {
    backgroundColor: "#F4F4F4",
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: "#0d3a4b",
    borderTopRightRadius: 0,
  },
  messageText: {
    flexShrink: 1,
    color: "#303030",
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
    lineHeight: 23,
  },
  userMessageText: {
    color: "#FFFFFF",
  },
  timeText: {
    flexShrink: 0,
    color: "#999999",
    fontFamily: "Urbanist-Regular",
    fontSize: 12,
    lineHeight: 20,
  },
  userTimeText: {
    color: "#FFFFFF",
  },
});
