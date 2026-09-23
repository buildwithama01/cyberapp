import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { BellIcon } from "phosphor-react-native";
import React from "react";
import {
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { CURRENT_USER } from "@/constants/mockData";

interface HomeHeaderProps {
  name?: string;
  avatarSource?: ImageSourcePropType;
  onNotificationsPress?: () => void;
  onBookmarksPress?: () => void;
}

const onNotificationsPress = () => {
  router.push("/notification");
};
const onBookmarksPress = () => {
  router.push("/bookmark");
};

const HomeHeader = ({
  name = CURRENT_USER.fullName,
  avatarSource = require("@/assets/images/avatar.png"),
}: HomeHeaderProps) => {
    return (

        <View style={styles.container}>
            <TouchableOpacity>

                <Image source={avatarSource} style={styles.avatar} />
            </TouchableOpacity>

            <View style={styles.copy}>
                <Text style={styles.greeting}>
                    Good Morning <Text style={styles.wave}>👋</Text>
                </Text>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity
                    accessibilityLabel="Notifications"
                    onPress={onNotificationsPress}
                    style={styles.actionButton}
                >
                    <BellIcon size={24} color="#181725" weight="regular" />
                </TouchableOpacity>
                <TouchableOpacity
                    accessibilityLabel="Bookmarks"
                    onPress={onBookmarksPress}
                    style={styles.actionButton}
                >
                    <Ionicons name="bookmark-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>

    );
};

export default HomeHeader;

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: "center",
        minHeight: 96,
        backgroundColor: "#FFFFFF",
        marginBottom: 15,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 36,
    },
    copy: {
        flex: 1,
        marginLeft: 24,
        justifyContent: "center",
    },
    greeting: {
        color: "#7C7C7C",
        fontFamily: "Urbanist-Regular",
        fontSize: 20,
        lineHeight: 28,
    },
    wave: {
        fontSize: 20,
    },
    name: {
        marginTop: 1,
        color: "#181725",
        fontFamily: "Urbanist-Bold",
        fontSize: 24,
        lineHeight: 35,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 12,
    },
    actionButton: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 15,
    },
});
