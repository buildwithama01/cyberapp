import ForgottenPasswordImg from "@/assets/images/forgottenpassword.svg";
import OnboardingInput from "@/components/OnboardingInput";
import PrimaryButton from "@/components/PrimaryButton";
import { FontAwesome } from "@expo/vector-icons";
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

const ForgotPassword = () => {
  const [email, setEmail] = React.useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
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
              <ForgottenPasswordImg width={350} height={350} />
            </View>
            <Text style={styles.heading}>Forgot Password?</Text>
            <Text style={styles.subheading}>
              Enter your email to reset your password
            </Text>
            <OnboardingInput
              key="email"
              icon={<FontAwesome name="envelope" size={24} />}
              placeholder="name@example.com"
              value={email}
              onChangeText={setEmail}
            />
            <PrimaryButton
              title="Send Code"
              onPress={() => router.push("/verification")}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;

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
});
