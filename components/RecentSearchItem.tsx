import { X } from "phosphor-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface RecentSearchItemProps {
  search: string;
  onRemove?: () => void;
  onPress?: () => void;
}

const RecentSearchItem = ({
  onPress,
  onRemove,
  search,
}: RecentSearchItemProps) => {
  return (
    <View style={styles.row}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={onPress}
        style={styles.searchButton}
      >
        <Text style={styles.searchText}>{search}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityLabel={`Remove ${search} from recent searches`}
        hitSlop={8}
        onPress={onRemove}
        style={styles.removeButton}
      >
        <X size={14} color="#7C7C7C" weight="regular" />
      </TouchableOpacity>
    </View>
  );
};

export default RecentSearchItem;

const styles = StyleSheet.create({
  row: {
    minHeight: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchButton: {
    flex: 1,
    justifyContent: "center",
  },
  searchText: {
    color: "#7C7C7C",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
  },
  removeButton: {
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#7C7C7C",
    borderRadius: 12,
  },
});
