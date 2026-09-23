import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#EEF2FF', // Very light blue
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#0D3A4B', 
    fontFamily: "Urbanist-SemiBold",
  },
});

export default Badge;