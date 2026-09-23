import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CheckoutOptions from "./CheckoutOptions";
import PrimaryButton from "./PrimaryButton";

interface CheckoutBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  totalCost: number;
  onPlaceOrder: () => void;
}

const CheckoutBottomSheet = ({
  isVisible,
  onClose,
  totalCost,
  onPlaceOrder,
}: CheckoutBottomSheetProps) => {
  const CheckoutOptionsList = [
    { title: "Delivery", option: "Select Method" },
    { title: "Payment", option: "Mastercard" },
    { title: "Promo Code", option: "Pick Discount" },
    { title: "Total Cost", option: 13.97 },
  ];
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
          onPress={(e) => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Checkout</Text>
            <TouchableOpacity
              onPress={onClose}
              accessibilityLabel="Close checkout"
            >
              <Ionicons name="close" size={24} color="#181725" />
            </TouchableOpacity>
          </View>
          <View style={styles.optionsList}>
            {CheckoutOptionsList.map((options, index) => (
              <CheckoutOptions
                key={index}
                title={options.title}
                options={options.option}
              />
            ))}
          </View>
          <Text style={styles.termsText}>
            By placing an order you agree to our{" "}
            <Text style={styles.termsLink}>Terms And Conditions</Text>
          </Text>
          <PrimaryButton
            title="Place Order"
            onPress={() => {
              onPlaceOrder();
              router.push("/order-accepted");
            }}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CheckoutBottomSheet;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "flex-end",
  },
  sheetContainer: {
    backgroundColor: "#F2F3F2",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 40,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
  },
  optionsList: {
    marginBottom: 20,
  },
  termsText: {
    fontSize: 14,
    fontFamily: "Urbanist-Regular",
    color: "#7C7C7C",
    lineHeight: 20,
    marginBottom: 25,
  },
  termsLink: {
    fontFamily: "Urbanist-Bold",
    color: "#0D3A4B",
  },
});
