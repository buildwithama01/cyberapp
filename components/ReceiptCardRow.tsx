import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TextStyle } from 'react-native';

interface InfoRowProps {
  label: string;
  value: string;
  isBold?: boolean; // Optional prop to make the value bold
  rightElement?: ReactNode; // Optional prop to add something else like a badge
}

const InfoRow: React.FC<InfoRowProps> = ({ label, value, isBold = true, rightElement }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueContainer}>
        {rightElement ? (
          rightElement
        ) : (
          <Text style={[styles.value, isBold && styles.boldValue]}>{value}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 14,
    color: '#6B7280', 
    fontFamily: "Urbanist-Medium",
  },
  valueContainer: {
    alignItems: 'flex-end',
  },
  value: {
    fontSize: 14,
    color: '#111827', 
  },
  boldValue: {
    fontFamily: "Urbanist-SemiBold",
  },
});

export default InfoRow;