import { Header } from "@/components/Header";
import PrimaryButton from "@/components/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";
import { SafeAreaView } from "react-native-safe-area-context";

import { CURRENT_USER } from "@/constants/mockData";

const EditProfile = () => {
  const [fullName, setFullName] = useState(CURRENT_USER.fullName);
  const [username, setUsername] = useState(CURRENT_USER.username);
  const [dateOfBirth] = useState(CURRENT_USER.dateOfBirth);
  const [email, setEmail] = useState(CURRENT_USER.email);
  const [phoneNumber, setPhoneNumber] = useState(CURRENT_USER.phoneNumber);
  const [countryCode, setCountryCode] = useState<CountryCode>(
    CURRENT_USER.countryCode as CountryCode,
  );
  const [callingCode, setCallingCode] = useState(CURRENT_USER.callingCode);
  const [gender] = useState(CURRENT_USER.gender);

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] || "1");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.safeArea}>
          <Header title="Edit Profile" showMore={false} />

          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.form}>
              <ProfileField
                placeholder="Full Name"
                value={fullName}
                onChangeText={setFullName}
              />
              <ProfileField
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <ProfileField
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChangeText={() => {}}
                editable={false}
                icon={
                  <Ionicons name="calendar-outline" size={20} color="#292929" />
                }
              />

              <ProfileField
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                icon={
                  <Ionicons name="mail-outline" size={20} color="#292929" />
                }
              />

              <View style={styles.phoneField}>
                <CountryPicker
                  withFlag
                  withCallingCode
                  countryCode={countryCode}
                  onSelect={handleCountrySelect}
                  containerButtonStyle={styles.countryButton}
                />
                <Ionicons name="chevron-down" size={16} color="#292929" />
                <TextInput
                  style={styles.phoneInput}
                  value={phoneNumber}
                  placeholder={`+${callingCode} Phone Number`}
                  placeholderTextColor="#999999"
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />
              </View>

              <ProfileField
                placeholder="Gender"
                value={gender}
                onChangeText={() => {}}
                editable={false}
                icon={<Ionicons name="caret-down" size={16} color="#292929" />}
              />
            </View>
          </ScrollView>

          <PrimaryButton
            title="Update"
            onPress={() => router.back()}
            style={styles.updateButton}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

interface ProfileFieldProps {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  icon?: React.ReactNode;
  keyboardType?: "default" | "email-address";
  editable?: boolean;
}

const ProfileField = ({
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
  editable = true,
}: ProfileFieldProps) => (
  <View style={styles.field}>
    <TextInput
      style={styles.fieldInput}
      placeholder={placeholder}
      placeholderTextColor="#999999"
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoCorrect={false}
    />
    {icon}
  </View>
);

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 18,
    paddingBottom: 20,
  },
  form: {
    gap: 16,
  },
  field: {
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
  },
  fieldInput: {
    flex: 1,
    padding: 0,
    color: "#292929",
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
  phoneField: {
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "#FAFAFA",
    flexDirection: "row",
    alignItems: "center",
  },
  countryButton: {
    padding: 0,
    marginRight: 5,
  },
  phoneInput: {
    flex: 1,
    padding: 0,
    marginLeft: 10,
    color: "#292929",
    fontFamily: "Urbanist-Medium",
    fontSize: 16,
  },
  updateButton: {
    marginHorizontal: 22,
    marginBottom: 10,
    width: "auto",
    height: 49,
    paddingVertical: 0,
    borderRadius: 19,
    backgroundColor: "#0d3a4b",
    shadowColor: "#0d3a4b",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 5,
  },
});
