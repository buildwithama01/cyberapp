import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface SectionHeaderProps {
    title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
    return <Text style={styles.title}>{title}</Text>;
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: '#111827',
        marginTop: 12,
        marginBottom: 16,
        fontFamily: "Urbanist-Bold",
    },
});