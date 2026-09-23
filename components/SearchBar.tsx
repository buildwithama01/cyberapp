import {
  MagnifyingGlassIcon,
  SlidersHorizontalIcon,
} from "phosphor-react-native";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

interface SearchBarProps extends Pick<
  TextInputProps,
  "onChangeText" | "value" | "placeholder"
> {
  onPress?: () => void;
  onFilterPress?: () => void;
  showFilter?: boolean;
  style?: StyleProp<ViewStyle>;
}

const SearchBar = ({
  onChangeText,
  onFilterPress,
  onPress,
  placeholder = "Search",
  showFilter = true,
  style,
  value,
}: SearchBarProps) => {
  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.8 : 1}
      onPress={onPress}
      style={[styles.searchContainer, style]}
    >
      <MagnifyingGlassIcon size={24} color="gray" weight="light" />
      <TextInput
        editable={!onPress}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#7C7C7C"
        style={styles.textInput}
        value={value}
      />
      {showFilter && (
        <TouchableOpacity
          accessibilityLabel="Filter search"
          onPress={onFilterPress}
        >
          <SlidersHorizontalIcon size={24} color="#0D3A4B" weight="light" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: "#F2F3F2",
    paddingHorizontal: 10,
    borderWidth: 0,
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    marginBottom: 30,
  },
  textInput: {
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
    flex: 1,
    marginLeft: 5,
    color: "#181725",
  },
});
