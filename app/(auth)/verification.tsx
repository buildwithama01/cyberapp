import CodeInput from "@/components/CodeInput";
import PrimaryButton from "@/components/PrimaryButton";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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

interface VerificationProps {
  userEmail?: string;
}

const Verification = ({
  userEmail = "user@example.com",
}: VerificationProps) => {
  const [code, setCode] = useState("");
  const [resendCounter, setResendCounter] = useState(55);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setResendCounter((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeComplete = (completedCode: string) => {
    setCode(completedCode);
  };

  const handleResend = () => {
    if (canResend) {
      setResendCounter(55);
      setCanResend(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            <Text style={styles.heading}>Verification</Text>
            <Text style={styles.subheading}>
              We have sent a code to your email {userEmail}
            </Text>

            <CodeInput
              length={4}
              showKeyboard={true}
              onComplete={handleCodeComplete}
            >
              <View style={styles.resendContainer}>
                <Text style={styles.resendText}>
                  {canResend ? (
                    <Text style={styles.resendLink} onPress={handleResend}>
                      Resend code
                    </Text>
                  ) : (
                    <>
                      Resend code in{" "}
                      <Text style={styles.timer}>{resendCounter}s</Text>
                    </>
                  )}
                </Text>
              </View>

              <PrimaryButton
                title="Verify"
                onPress={() => router.replace("/createpassword")}
              />
            </CodeInput>
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Verification;

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
    paddingTop: 40,
    flex: 1,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 50,
    fontFamily: "Urbanist-ExtraBold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    marginBottom: 40,
    color: "#7c7c7c",
    fontFamily: "Urbanist-Regular",
  },
  resendContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  resendText: {
    fontSize: 14,
    color: "#7C7C7C",
    fontFamily: "Urbanist-Regular",
  },
  resendLink: {
    color: "#4A90E2",
    fontFamily: "Urbanist-Bold",
  },
  timer: {
    color: "#4A90E2",
    fontFamily: "Urbanist-Bold",
  },
});
