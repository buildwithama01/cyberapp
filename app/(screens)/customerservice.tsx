import ChatComposer from "@/components/ChatComposer";
import ChatMessage from "@/components/ChatMessage";
import { Header } from "@/components/Header";
import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { INITIAL_SUPPORT_MESSAGES, SupportMessage } from "@/constants/mockData";

const CustomerService = () => {
  const [messages, setMessages] = useState<SupportMessage[]>(
    INITIAL_SUPPORT_MESSAGES,
  );
  const [draft, setDraft] = useState("");

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: `${Date.now()}`,
        text,
        sentAt: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        isUser: true,
        userId: "u_1",
      },
    ]);
    setDraft("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
        <Header title="Customer Service" />
        <View style={styles.todayBadge}>
          <Text style={styles.todayText}>Today</Text>
        </View>
        <FlatList
          data={messages}
          keyExtractor={(message) => message.id}
          renderItem={({ item }) => <ChatMessage {...item} />}
          contentContainerStyle={styles.messageList}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
        <ChatComposer
          value={draft}
          onChangeText={setDraft}
          onSend={handleSend}
          disabled={!draft.trim()}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CustomerService;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
  },
  todayBadge: {
    alignSelf: "center",
    marginTop: 16,
    marginBottom: 22,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 6,
    backgroundColor: "#F1F1F1",
  },
  todayText: {
    color: "#858585",
    fontFamily: "Urbanist-Medium",
    fontSize: 11,
  },
  messageList: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
});
