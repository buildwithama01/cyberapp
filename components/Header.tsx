import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";

interface HeaderProps {
  title: string;
  onBackPress?: () => void;
  onMorePress?: () => void;
  showMore?: boolean;
  compact?: boolean;
  titleStyle?: StyleProp<TextStyle>;
}
const onBackPress = () => {
  router.back();
};
const onMorePress = () => {
  router.back();
};
export const Header: React.FC<HeaderProps> = ({
  title,
  onBackPress: handleBackPress = onBackPress,
  onMorePress: handleMorePress = onMorePress,
  showMore = true,
}) => {
  return (
    <View style={[styles.container]}>
      <TouchableOpacity
        onPress={handleBackPress}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Ionicons name="arrow-back" size={24} color="#111827" />
      </TouchableOpacity>

      <Text style={[styles.title]}>{title}</Text>

      {showMore ? (
        <TouchableOpacity
          onPress={handleMorePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons
            name="ellipsis-horizontal-circle"
            size={26}
            color="#111827"
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.trailingSpacer} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 25,
    color: "#111827",
    fontFamily: "Urbanist-Bold",
  },
  trailingSpacer: {
    width: 26,
  },
});
