import { EyeIcon, EyeSlashIcon } from "phosphor-react-native";
import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

interface OnboardingInputProps {
  icon?: React.ReactNode | React.ComponentType<any>;
  placeholder: string;
  value: TextInputProps["value"];
  onChangeText: TextInputProps["onChangeText"];
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  iconSize?: number;
  iconColor?: string;
  iconWeight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
}

const OnboardingInput = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType,
  iconSize = 20,
  iconColor,
  iconWeight = "regular",
}: OnboardingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const currentIconColor = iconColor || (isFocused ? "#0D3A4B" : "#7C7C7C");

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        {icon && (
          <View style={styles.icon}>
            {React.isValidElement(icon)
              ? React.cloneElement(icon as React.ReactElement<any>, {
                  size: iconSize || (icon.props as any).size || 20,
                  color: currentIconColor,
                  weight: iconWeight || (icon.props as any).weight || "regular",
                })
              : typeof icon === "function"
                ? React.createElement(icon as React.ComponentType<any>, {
                    size: iconSize,
                    color: currentIconColor,
                    weight: iconWeight,
                  })
                : icon}
          </View>
        )}
        <TextInput
          style={[styles.input, icon ? styles.inputWithIcon : null]}
          placeholder={placeholder}
          placeholderTextColor="#B0B0B0"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry && !showPassword}
          autoCapitalize="none"
          keyboardType={keyboardType}
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            {showPassword ? (
              <EyeIcon size={20} color={currentIconColor} weight="fill" />
            ) : (
              <EyeSlashIcon size={20} color={currentIconColor} weight="fill" />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default OnboardingInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#ebebeb",
    paddingHorizontal: 12,
    height: 56,
  },
  inputContainerFocused: {
    borderColor: "#0D3A4B",
    backgroundColor: "#ffffff",
    borderWidth: 2,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#000000",
    padding: 0,
  },
  inputWithIcon: {
    marginLeft: 8,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 8,
  },
});
