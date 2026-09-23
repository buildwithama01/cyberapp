import { Header } from '@/components/Header';
import { NotificationCard, NotificationCardProps } from '@/components/NotificationCard';
import { SectionHeader } from '@/components/SectionHeader';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AppNotification, NOTIFICATIONS_DATA } from '@/constants/mockData';

function groupNotificationsByDate(notifications: AppNotification[]) {
    const groups: { title: string, data: AppNotification[] }[] = [];
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    notifications.forEach(notification => {
        const date = new Date(notification.createdAt);
        let label = "";
        if (date.toDateString() === today.toDateString()) {
            label = "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            label = "Yesterday";
        } else {
            label = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
        }

        let group = groups.find(g => g.title === label);
        if (!group) {
            group = { title: label, data: [] };
            groups.push(group);
        }
        group.data.push(notification);
    });

    return groups;
}

export default function NotificationScreen() {
    const groupedNotifications = React.useMemo(() => groupNotificationsByDate(NOTIFICATIONS_DATA), []);
    return (
        <SafeAreaView style={styles.safeArea}>
            <Header
                title="Notification"
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {groupedNotifications.map((section) => (
                    <View key={section.title}>
                        <SectionHeader title={section.title} />
                        {section.data.map((item) => (
                            <NotificationCard
                                key={item.id}
                                {...item as any}
                                onPress={() => console.log(`Card ${item.id} pressed`)}
                            />
                        ))}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 24,
    },
});