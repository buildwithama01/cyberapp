import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CheckoutOptionsProps {
  title: string;
  options: any;
}

const CheckoutOptions = ({ title, options }: CheckoutOptionsProps) => {
  return (
    <TouchableOpacity style={styles.rowItem}>
      <Text style={styles.rowLabel}>{title}</Text>
      <View style={styles.rowRightSide}>
        <Text style={styles.rowValueText}>{options}</Text>
        <Ionicons name="chevron-forward" size={18} color="#181725" />
      </View>
    </TouchableOpacity>
  );
};

export default CheckoutOptions;

const styles = StyleSheet.create({
  rowItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  rowLabel: {
    fontSize: 18,
    fontFamily: "Urbanist-SemiBold",
    color: "#7C7C7C",
  },
  rowRightSide: {
    flexDirection: "row",
    alignItems: "center",
  },
  rowValueText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#181725",
    fontWeight: "600",
    marginRight: 10,
  },
});
