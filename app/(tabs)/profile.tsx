import ConfirmLogout from "@/components/ConfirmLogout";
import LogoutButton from "@/components/LogoutButton";
import ProfileHeader from "@/components/ProfileHeader";
import ProfileMenuItem from "@/components/ProfileMenuItem";
import { TabHeader } from "@/components/TabHeader";
import { Feather, Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CURRENT_USER,
  PROFILE_MENU_ITEMS,
} from "@/constants/mockData";

type ProfileMenuItemData = {
  id: string;
  title: string;
  iconFamily: string;
  iconName: string;
  route?: string;
  value?: string;
  isToggle?: boolean;
};

const renderMenuIcon = (item: ProfileMenuItemData) => {
  switch (item.iconFamily) {
    case "Feather":
      return <Feather name={item.iconName as any} size={22} color="#181725" />;
    case "Ionicons":
      return <Ionicons name={item.iconName as any} size={22} color="#181725" />;
    case "FontAwesome5":
      return (
        <FontAwesome5 name={item.iconName as any} size={22} color="#181725" />
      );
    case "Octicons":
      return <Octicons name={item.iconName as any} size={22} color="#181725" />;
    default:
      return null;
  }
};

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const handleItemPress = (item: ProfileMenuItemData) => {
    if (item.route) {
      router.push(item.route as any);
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <TabHeader title="Profile" showSearch={false} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* User Header */}
        <ProfileHeader
          name={CURRENT_USER.fullName}
          email={CURRENT_USER.email}
          imageUri={CURRENT_USER.avatarUrl}
          onEditPress={() => {
            router.push("/editprofile");
          }}
        />

        {/* Menu Items List */}
        <View style={styles.menuContainer}>
          {PROFILE_MENU_ITEMS.map((item: ProfileMenuItemData, index) => (
            <ProfileMenuItem
              key={item.id}
              icon={renderMenuIcon(item)}
              title={item.title}
              value={item.value}
              isToggle={item.isToggle}
              toggleValue={isDarkMode}
              onToggle={item.isToggle ? setIsDarkMode : undefined}
              showDivider={index !== PROFILE_MENU_ITEMS.length - 1}
              onPress={item.isToggle ? undefined : () => handleItemPress(item)}
            />
          ))}
        </View>

        {/* Log Out Button */}
        <LogoutButton onPress={() => setIsLogoutVisible(true)} />
      </ScrollView>
      <ConfirmLogout
        visible={isLogoutVisible}
        onCancel={() => setIsLogoutVisible(false)}
        onConfirm={() => {
          setIsLogoutVisible(false);
          router.replace("/login");
        }}
      />
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  menuContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E2E2E2",
    marginTop: 10,
  },
});
