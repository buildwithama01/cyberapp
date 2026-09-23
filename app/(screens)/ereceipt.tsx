import BarcodeDisplay from "@/components/BarcodeDisplay";
import { Header } from "@/components/Header";
import Badge from "@/components/ReceiptBadge";
import ReceiptCard from "@/components/ReceiptCard";
import InfoRow from "@/components/ReceiptCardRow";
import { TRANSACTIONS_DATA, CURRENT_USER, MOCK_COURSES } from "@/constants/mockData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const EReceiptScreen: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const receipt = TRANSACTIONS_DATA.find(t => t.id === id) || TRANSACTIONS_DATA[0];
  const course = MOCK_COURSES.find(c => c.id === receipt.courseId);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="E-Receipt"
        onBackPress={() => router.replace("/purchases")}
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.barcodeContainer}>
          <BarcodeDisplay
            value={receipt.id}
            barWidth={2}
            height={72}
            displayValue={true}
            lineColor="#0D3A4B"
            background="#EEF2FF"
            margin={16}
          />
        </View>

        {/* Course Info Card */}
        <ReceiptCard>
          <InfoRow label="Course" value={receipt.courseName} isBold={true} />
          <InfoRow label="Category" value={course?.category || "Unknown"} isBold={true} />
        </ReceiptCard>

        {/* Student Info Card */}
        <ReceiptCard>
          <InfoRow label="Name" value={CURRENT_USER.fullName} isBold={true} />
          <InfoRow label="Phone" value={CURRENT_USER.phoneNumber} isBold={true} />
          <InfoRow label="Email" value={CURRENT_USER.email} isBold={true} />
          <InfoRow label="Country" value={CURRENT_USER.countryCode} isBold={true} />
        </ReceiptCard>

        {/* Payment Info Card */}
        <ReceiptCard>
          <InfoRow label="Price" value={`${receipt.amount} ${receipt.currency}`} isBold={true} />
          <InfoRow
            label="Payment Methods"
            value={receipt.paymentMethod}
            isBold={true}
          />
          <InfoRow label="Date" value={new Date(receipt.createdAt).toLocaleDateString()} isBold={true} />

          <InfoRow
            label="Transaction ID"
            value={receipt.id}
            isBold={true}
            rightElement={
              <View style={styles.transactionValue}>
                <InfoRow label="" value={receipt.id} isBold={true} />
                <TouchableOpacity style={styles.copyButton}>
                  <Ionicons name="copy-outline" size={16} color="#0D3A4B" />
                </TouchableOpacity>
              </View>
            }
          />

          <InfoRow
            label="Status"
            value={receipt.status}
            isBold={false} // Default value style is off when badge is used
            rightElement={<Badge text={receipt.status} />}
          />
        </ReceiptCard>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 30, // Space at the bottom of the scroll view
  },
  barcodeContainer: {
    alignItems: "center",
    paddingVertical: 8,
  },
  transactionValue: {
    flexDirection: "row",
    alignItems: "center",
  },
  copyButton: {
    marginLeft: 8,
  },
});

export default EReceiptScreen;
