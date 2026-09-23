import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TabSelectorProps {
  tabs: string[];
  activeTab: string;
  onSelectTab: (tab: string) => void;
  activeColor?: string;
}

export const TabSelector: React.FC<TabSelectorProps> = ({
  tabs,
  activeTab,
  onSelectTab,
  activeColor = "#0D3A4B",
}) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab === activeTab;
        return (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              isActive && { borderBottomColor: activeColor },
            ]}
            onPress={() => onSelectTab(tab)}
          >
            <Text style={[styles.tabText, isActive && { color: activeColor }]}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 18,
    fontFamily: "Urbanist-Bold",
    color: "#9CA3AF",
  },
});
