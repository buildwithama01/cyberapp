import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CartCardProps {
  imageUri: string;
  productName: string;
  productInfo: string;
  productPrice: number;
  initialQuantity?: number;
}

const CartCard = ({
  imageUri,
  productName,
  productInfo,
  productPrice,
  initialQuantity = 1,
}: CartCardProps) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const totalPrice = (quantity * productPrice).toFixed(2);

  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: imageUri }}
        style={styles.productImage}
        resizeMode="contain"
      />
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.productTitle}>{productName}</Text>
            <Text style={styles.subtitleText}>1kg, {productInfo}</Text>
          </View>
          <TouchableOpacity accessibilityLabel="Remove item from cart">
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <View style={styles.quantitySelector}>
            <TouchableOpacity
              style={styles.counterButton}
              onPress={handleDecrement}
              disabled={quantity <= 1}
            >
              <FontAwesome5
                name="minus"
                size={14}
                color={quantity > 1 ? "#333" : "#C4C4C4"}
              />
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              style={styles.counterButton}
              onPress={handleIncrement}
            >
              <FontAwesome5 name="plus" size={14} color="#0D3A4B" />
            </TouchableOpacity>
          </View>
          <Text style={styles.priceText}>${totalPrice}</Text>
        </View>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingVertical: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
    width: "100%",
  },
  productImage: {
    width: 70,
    height: 70,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: "space-between",
    height: 75,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    fontFamily: "Urbanist-Regular",
    color: "#7C7C7C",
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
  },
  quantitySelector: {
    flexDirection: "row",
    alignItems: "center",
  },
  counterButton: {
    width: 40,
    height: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E2E2E2",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  quantityText: {
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
    marginHorizontal: 15,
    minWidth: 15,
    textAlign: "center",
  },
  priceText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
  },
});
