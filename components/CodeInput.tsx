import { Backspace } from "phosphor-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

interface CodeInputProps {
  length?: number;
  onComplete?: (code: string) => void;
  showKeyboard?: boolean;
  children?: React.ReactNode;
}

const CodeInput = ({
  length = 4,
  onComplete,
  showKeyboard = true,
  children,
}: CodeInputProps) => {
  const [code, setCode] = useState<string[]>(Array(length).fill(""));
  const inputRefs = useRef<TextInput[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [isCustomKeyboardVisible, setIsCustomKeyboardVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(400)).current;

  useEffect(() => {
    if (showKeyboard) {
      openKeyboard();
    }
  }, [showKeyboard]);

  const openKeyboard = () => {
    setIsCustomKeyboardVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeKeyboard = () => {
    Animated.timing(slideAnim, {
      toValue: 400,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setIsCustomKeyboardVisible(false));
  };

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus to next input
    if (text && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    } else if (text === "" && index > 0) {
      // Check if backspace cleared the field natively
      inputRefs.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    } else {
      setFocusedIndex(index);
    }

    // Call onComplete when all digits are entered
    if (newCode.every((digit) => digit !== "")) {
      onComplete?.(newCode.join(""));
      Keyboard.dismiss();
      if (showKeyboard) {
        closeKeyboard();
      }
    }
  };

  const handleKeyPress = (value: string) => {
    if (value === "backspace") {
      if (code[focusedIndex] !== "") {
        // Clear current focused box
        const newCode = [...code];
        newCode[focusedIndex] = "";
        setCode(newCode);
      } else if (focusedIndex > 0) {
        // Move to previous box and clear it
        const newCode = [...code];
        newCode[focusedIndex - 1] = "";
        setCode(newCode);
        setFocusedIndex(focusedIndex - 1);
        if (!showKeyboard) {
          inputRefs.current[focusedIndex - 1]?.focus();
        }
      }
    } else {
      // Find the first empty spot starting from the focused index
      let emptyIndex = focusedIndex;
      if (code[focusedIndex] !== "") {
         emptyIndex = code.findIndex((v) => v === "");
      }
      if (emptyIndex !== -1) {
        handleInputChange(value, emptyIndex);
      }
    }
  };

  const keyboardRows = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "backspace"],
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        activeOpacity={1} 
        onPress={() => {
          if (showKeyboard) {
            openKeyboard();
          }
        }}
      >
        <View pointerEvents={showKeyboard ? "none" : "auto"} style={styles.inputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputRefs.current[index] = ref;
              }}
              style={[styles.codeInput, focusedIndex === index && styles.codeInputActive]}
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="numeric"
              secureTextEntry={false}
              editable={!showKeyboard}
              onFocus={() => {
                setFocusedIndex(index);
                if (showKeyboard) {
                   Keyboard.dismiss();
                   openKeyboard();
                }
              }}
            />
          ))}
        </View>
      </TouchableOpacity>

      {children}

      {showKeyboard && isCustomKeyboardVisible && (
        <Animated.View style={[styles.keyboard, { transform: [{ translateY: slideAnim }] }]}>
          {keyboardRows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.keyboardRow}>
              {row.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.key}
                  onPress={() => handleKeyPress(key)}
                >
                  {key === "backspace" ? (
                    <Backspace size={28} color="#202A44" weight="regular" />
                  ) : (
                    <Text style={styles.keyText}>{key}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </Animated.View>
      )}
    </View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 30,
  },
  codeInput: {
    width: 65,
    height: 65,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    textAlign: "center",
    justifyContent: "center",
    fontFamily: "Urbanist-Bold",
    fontSize: 28,
    color: "#000000",
  },
  codeInputActive: {
    borderColor: "#4A90E2",
    backgroundColor: "#EFF6FF",
  },
  keyboard: {
    position: "absolute",
    bottom: 0,
    left: -20,
    right: -20,
    backgroundColor: "#FAFAFA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    paddingBottom: 40,
  },
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  key: {
    width: "30%",
    height: 60,
    borderRadius: 12,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 28,
    fontFamily: "Urbanist-Medium",
    color: "#111827",
  },
});
