import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Switch } from "react-native";

interface ProfileMenuItemProps {
  icon?: React.ReactNode;
  iconName?: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
  isToggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (value: boolean) => void;
  onPress?: () => void;
  showDivider?: boolean;
}

const ProfileMenuItem = ({
  icon,
  iconName,
  title,
  value,
  isToggle,
  toggleValue,
  onToggle,
  onPress,
  showDivider = true,
}: ProfileMenuItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, showDivider && styles.divider]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={isToggle}
    >
      <View style={styles.leftContent}>
        {icon ? icon : iconName ? <Ionicons name={iconName} size={22} color="#181725" /> : null}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.rightContent}>
        {value && <Text style={styles.valueText}>{value}</Text>}
        {isToggle ? (
          <Switch value={toggleValue} onValueChange={onToggle} />
        ) : (
          <Ionicons name="chevron-forward" size={20} color="#181725" />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ProfileMenuItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 23,
    paddingHorizontal: 25,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#E2E2E2",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: "#181725",
    marginLeft: 15,
  },
  valueText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#7C7C7C",
    marginRight: 10,
  },
});
