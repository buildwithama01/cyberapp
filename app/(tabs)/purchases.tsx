import { TabHeader } from "@/components/TabHeader";
import { TransactionCard } from "@/components/TransactionCard";
import { TRANSACTIONS_DATA } from "@/constants/mockData";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TransactionsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return (
    <SafeAreaView style={styles.safeArea}>
      <TabHeader
        title="Purchases"
        showInlineSearch
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {TRANSACTIONS_DATA.filter((item) =>
          item.courseName.toLowerCase().includes(normalizedQuery),
        ).map((item) => (
          <TransactionCard
            key={item.id}
            {...item}
            title={item.courseName}
            imageUri={item.courseImageUri}
            onPress={() => console.log(`Selected transaction: ${item.courseName}`)}
            onEReceiptPress={() => router.push("/ereceipt")}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 24,
  },
});
