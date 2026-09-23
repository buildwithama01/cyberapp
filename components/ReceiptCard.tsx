import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface ReceiptCardProps {
    children: ReactNode;
}

export const ReceiptCard: React.FC<ReceiptCardProps> = ({ children }) => {
    return <View style={styles.card}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F9FAFB', // Light grey background
        borderRadius: 20,
        padding: 20,
        marginVertical: 10,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        shadowColor: "#B9BDC7",
        shadowOffset: { width: 0, height: 7 },
        shadowOpacity: 0.12,
        shadowRadius: 18,
        elevation: 3,
    },
});

export default ReceiptCard;