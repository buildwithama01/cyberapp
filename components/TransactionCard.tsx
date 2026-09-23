import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBadge } from './StatusBadge';

export interface TransactionCardProps {
  id: string;
  title: string;
  status: string;
  imageUri: string;
  onPress?: () => void;
  onEReceiptPress?: () => void;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  status,
  imageUri,
  onPress,
  onEReceiptPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={styles.card}
    >
      <Image source={{ uri: imageUri }} style={styles.thumbnail} />

      <View style={styles.detailsContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <StatusBadge label={status} />
      </View>

      <TouchableOpacity
        style={styles.receiptButton}
        onPress={onEReceiptPress}
        activeOpacity={0.8}
      >
        <Text style={styles.receiptButtonText}>E-Receipt</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: "#B9BDC7",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 22,
    marginRight: 14,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    paddingRight: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: '#111827',
  },
  receiptButton: {
    backgroundColor: '#0D3A4B',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 7,
  },
  receiptButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
  },
});