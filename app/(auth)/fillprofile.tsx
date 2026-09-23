import OnboardingInput from "@/components/OnboardingInput";
import PrimaryButton from "@/components/PrimaryButton";
import { FontAwesome } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { PencilSimpleIcon } from "phosphor-react-native";
import CountryPicker, {
  Country,
  CountryCode,
} from "react-native-country-picker-modal";

import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FillProfile = () => {
  const [fullName, setFullName] = useState("");
  const [nickname, setNickname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [callingCode, setCallingCode] = useState("1");

  const [gender, setGender] = useState("");
  const [showGenderPicker, setShowGenderPicker] = useState(false);

  const [profileImage, setProfileImage] = useState<string | null>(null);

  const genderOptions = ["Male", "Female", "Other"];

  const handleProfileImagePress = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
      setDateOfBirth(selectedDate.toLocaleDateString());
    }
  };

  const handleCountrySelect = (country: Country) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0] || "1");
  };

  const handleContinue = () => {
    // Validate and proceed
    router.push("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <SafeAreaView style={styles.safeArea}>
            {/* Top block: header + avatar + form */}
            <View>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Fill Your Profile</Text>
                <View style={{ width: 24 }} />
              </View>

              {/* Profile Picture Section */}
              <TouchableOpacity
                style={styles.profilePictureContainer}
                onPress={handleProfileImagePress}
                activeOpacity={0.85}
              >
                <View style={styles.profilePlaceholder}>
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <FontAwesome
                      name="user-circle-o"
                      size={100}
                      color="#A0A0A0"
                    />
                  )}
                </View>
                <View style={styles.editButton}>
                  <PencilSimpleIcon size={15} color="#FFFFFF" weight="bold" />
                </View>
              </TouchableOpacity>

              {/* Form Fields */}
              <View style={styles.formContainer}>
                {/* Full Name */}
                <OnboardingInput
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={setFullName}
                />

                {/* Date of Birth */}
                <TouchableOpacity
                  onPress={() => setShowDatePicker(true)}
                  activeOpacity={0.8}
                >
                  <View pointerEvents="none">
                    <OnboardingInput
                      icon={
                        <Ionicons name="calendar" size={24} color="#7C7C7C" />
                      }
                      placeholder="Date of Birth"
                      value={dateOfBirth}
                      onChangeText={() => {}}
                    />
                  </View>
                </TouchableOpacity>

                {/* Email */}
                <OnboardingInput
                  icon={
                    <FontAwesome name="envelope" size={24} color="#7C7C7C" />
                  }
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                />

                {/* Phone Number */}
                <View style={styles.unifiedInputContainer}>
                  <View style={styles.countryPickerSection}>
                    <CountryPicker
                      withFilter
                      withFlag
                      withCallingCode
                      withEmoji
                      withAlphaFilter
                      countryCode={countryCode}
                      onSelect={handleCountrySelect}
                      containerButtonStyle={{ padding: 0, margin: 0 }}
                    />
                    <Ionicons
                      name="chevron-down"
                      size={16}
                      color="#7C7C7C"
                      style={{ marginLeft: 4, marginRight: 8 }}
                    />
                  </View>
                  <TextInput
                    style={styles.unifiedInput}
                    placeholder="Phone Number"
                    placeholderTextColor="#B0B0B0"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>

                {/* Gender Dropdown */}
                <TouchableOpacity
                  style={[
                    styles.unifiedInputContainer,
                    { justifyContent: "space-between", marginBottom: 0 },
                  ]}
                  onPress={() => setShowGenderPicker(true)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.unifiedInputText,
                      !gender && { color: "#B0B0B0" },
                    ]}
                  >
                    {gender || "Gender"}
                  </Text>
                  <Ionicons name="caret-down" size={16} color="#7C7C7C" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Continue Button pinned to bottom */}
            <PrimaryButton
              title="Continue"
              onPress={handleContinue}
              style={styles.continueButton}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </ScrollView>

      {/* DatePicker Modal for iOS */}
      {Platform.OS === "ios" && showDatePicker && (
        <Modal visible={true} transparent={true} animationType="slide">
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowDatePicker(false)}
          >
            <View
              style={styles.pickerContainer}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.pickerHeader}>
                <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                  <Text style={styles.pickerDone}>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                value={date}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* DatePicker for Android */}
      {Platform.OS === "android" && showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}

      {/* Gender Picker Modal */}
      <Modal visible={showGenderPicker} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlayCenter}
          onPress={() => setShowGenderPicker(false)}
          activeOpacity={1}
        >
          <View style={styles.dropdownMenu}>
            {genderOptions.map((g) => (
              <TouchableOpacity
                key={g}
                style={styles.dropdownItem}
                onPress={() => {
                  setGender(g);
                  setShowGenderPicker(false);
                }}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    gender === g && styles.dropdownItemTextSelected,
                  ]}
                >
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default FillProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 30,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 28,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 50,
  },
  headerTitle: {
    fontSize: 50,
    fontFamily: "Urbanist-Bold",
    color: "#000000",
    flex: 1,
    textAlign: "left",
  },
  profilePictureContainer: {
    alignSelf: "center",
    marginBottom: 36,
    position: "relative",
    width: 120,
    height: 120,
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#EBEBEB",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editButton: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: "#0D3A4B",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    // subtle shadow so it pops against the avatar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 4,
    elevation: 4,
  },
  formContainer: {
    width: "100%",
  },
  unifiedInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#ebebeb", // Lighter background matching the image
    paddingHorizontal: 16,
    height: 56,
    marginBottom: 20,
  },
  countryPickerSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  unifiedInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#000000",
    padding: 0,
  },
  unifiedInputText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#000000",
  },
  continueButton: {
    marginTop: 24,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  pickerContainer: {
    backgroundColor: "#fff",
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  pickerHeader: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  pickerDone: {
    color: "#0D3A4B",
    fontSize: 16,
    fontFamily: "Urbanist-Bold",
  },
  modalOverlayCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  dropdownMenu: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 12,
    padding: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dropdownItem: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "#F0F0F0",
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#333",
  },
  dropdownItemTextSelected: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
  },
});
