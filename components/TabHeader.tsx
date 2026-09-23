import SearchBar from "@/components/SearchBar";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface TabHeaderProps {
  title?: string;
  onSearchPress?: () => void;
  showSearch?: boolean;
  showInlineSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}

export const TabHeader: React.FC<TabHeaderProps> = ({
  title,
  onSearchPress,
  showSearch = true,
  showInlineSearch = false,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleSearchPress = () => {
    if (showInlineSearch) {
      setIsSearchOpen((isOpen) => !isOpen);
    }
    onSearchPress?.();
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>e</Text>
        </View>
        {!isSearchOpen && <Text style={styles.title}>{title}</Text>}
        {isSearchOpen && (
          <SearchBar
            onChangeText={onSearchChange}
            placeholder={searchPlaceholder}
            showFilter={false}
            style={styles.inlineSearch}
            value={searchValue}
          />
        )}
      </View>

      <View style={styles.rightSection}>
        {showSearch && (
          <TouchableOpacity
            accessibilityLabel="Search"
            accessibilityRole="button"
            onPress={handleSearchPress}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name={isSearchOpen ? "close-outline" : "search-outline"}
              size={30}
              color="#111827"
            />
          </TouchableOpacity>
        )}
      </View>
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
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0D3A4B",
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
    fontStyle: "italic",
    marginTop: -2,
  },
  title: {
    fontSize: 30,
    fontFamily: "Urbanist-Bold",
    color: "#111827",
  },
  inlineSearch: {
    flex: 1,
    height: 44,
    marginBottom: 0,
  },
});
