import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const GoogleLogo = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <Path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    />
    <Path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    />
    <Path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    />
    <Path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    />
  </Svg>
);

interface ContinueWithGoogleProps {
  onPress?: () => void;
  text?: string;
}

const ContinueWithGoogle = ({
  onPress,
  text = "Continue with",
}: ContinueWithGoogleProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>{text}</Text>
        <View style={styles.line} />
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <GoogleLogo size={24} />
        <Text style={styles.googleButtonText}>Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContinueWithGoogle;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 20,
    marginTop: 50,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    marginHorizontal: 10,
    color: "#7C7C7C",
    fontSize: 14,
    fontFamily: "Urbanist-Regular",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    height: 56,
    width: "100%",
  },
  googleButtonText: {
    marginLeft: 12,
    fontSize: 16,
    fontFamily: "Urbanist-SemiBold",
    color: "#000000",
  },
});
