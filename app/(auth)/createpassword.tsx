import CreatePasswordImg from "@/assets/images/createpassword.svg";
import OnboardingInput from "@/components/OnboardingInput";
import PrimaryButton from "@/components/PrimaryButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CreatePassword = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const InputDetails = [
    {
      label: "NewPassword",
      icon: <FontAwesome6 name="lock" size={24} />,
      placeholder: "Create New Password",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    },
    {
      label: "RepeatPassword",
      icon: <FontAwesome6 name="lock" size={24} />,
      placeholder: "Repeat New Password",
      value: password,
      onChangeText: setPassword,
      secureTextEntry: true,
    },
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <CreatePasswordImg width={350} height={350} />
            </View>
            <Text style={styles.heading}>Create New Password?</Text>
            <Text style={styles.subheading}>Enter your new password</Text>
            <View>
              {InputDetails.map((input) => (
                <OnboardingInput
                  key={input.label}
                  icon={input.icon}
                  placeholder={input.placeholder}
                  value={input.value}
                  onChangeText={input.onChangeText}
                  secureTextEntry={input.secureTextEntry}
                />
              ))}
            </View>
            <PrimaryButton
              title="Continue"
              style={styles.primaryButton}
              onPress={() => router.push("/fillprofile")}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreatePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
  },

  safeArea: {
    padding: 20,
    paddingTop: 60,
  },
  logoContainer: {
    alignSelf: "center",
    marginBottom: 80,
  },
  heading: {
    fontSize: 45,
    fontFamily: "Urbanist-ExtraBold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 50,
    color: "#7c7c7c",
    fontFamily: "Urbanist-Regular",
  },
  primaryButton: {
    marginTop: 30,
  },
});
