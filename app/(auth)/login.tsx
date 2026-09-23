import ContinueWithGoogle from "@/components/ContinueWithGoogle";
import OnboardingInput from "@/components/OnboardingInput";
import PrimaryButton from "@/components/PrimaryButton";
import { FontAwesome6 } from "@expo/vector-icons";
import FontAwesome from '@expo/vector-icons/FontAwesome';
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
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const InputDetails = [
    {
      label: "Email",
      icon: <FontAwesome name="envelope" size={24} />,
      placeholder: "name@example.com",
      value: email,
      onChangeText: setEmail,
    },
    {
      label: "Password",
      icon: <FontAwesome6 name="lock" size={24} />,
      placeholder: "••••••••",
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

            <Text style={styles.heading}>Login to Your {"\n"}Account</Text>
            <Text style={styles.subheading}>
              Enter your details to log in to your account
            </Text>
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
            <Text
              style={styles.forgotPassword}
              onPress={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </Text>
            <PrimaryButton title="Log In" onPress={() => router.push("/fillprofile")} />
            <ContinueWithGoogle />
            <Text style={styles.signupText}>
              Don't have an account?{" "}
              <Text
                style={styles.linkText}
                onPress={() => router.push("/signup")}
              >
                Sign Up
              </Text>
            </Text>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  safeArea: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  heading: {
    fontSize: 50,
    fontFamily: "Urbanist-ExtraBold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 50,
    color: "#7c7c7c",
    fontFamily: "Urbanist-Regular",
  },
  linkText: {
    fontFamily: "Urbanist-Bold",
    color: "#0D3A4B",
  },
  forgotPassword: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 50,
    color: "#7c7c7c",
    fontFamily: "Urbanist-Bold",
  },
  signupText: {
    fontSize: 16,
    textAlign: "center",
    color: "#7c7c7c",
    fontFamily: "Urbanist-Regular",
    marginTop: 20,
  },
});
