import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0D3A4B",
        tabBarInactiveTintColor: "#888888",
        headerShown: false,
        tabBarLabelStyle: styles.tabBarText,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Octicons name="home-fill" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="course"
        options={{
          title: "My Course",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="graduation-cap" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="purchases"
        options={{
          title: "Purchases",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="payments" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
      
    </Tabs>
  );
};

export default _layout;

const styles = StyleSheet.create({
  tabBarText: {
    fontSize: 12,
    fontFamily: "Urbanist-Bold",
  },
  tabBar: {
    position: "absolute",
    left: 20,
    right: 20,
    borderRadius: 20,
    height: 70,
    backgroundColor: "#FFFFFF",
    paddingTop: 10,
    paddingBottom: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderTopWidth: 0,
  },
});
