import { Stack } from "expo-router";
import React from "react";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        // Hide headers globally for auth screens (most modern apps handle headers inline)
        headerShown: false,
        // Optional: Custom styling for the transitions
        animation: "slide_from_right",
      }}
    >
      {/* Explicitly defining screens lets you customize individual options if needed */}
      <Stack.Screen name="splash" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      <Stack.Screen name="forgot-password" />
      <Stack.Screen name="createpassword" />
      <Stack.Screen name="verification" />
    </Stack>
  );
}
