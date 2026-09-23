import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  label: string;
  backgroundColor?: string;
  textColor?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  backgroundColor = '#EFF6FF',
  textColor = '#0D3A4B',
}) => {
  return (
    <View style={[styles.badge, { backgroundColor }]}>
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontFamily: "Urbanist-SemiBold",
  },
});