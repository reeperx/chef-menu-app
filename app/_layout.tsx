import { Stack } from "expo-router";
import Toast from "../components/Toast";

export default function RootLayout() {
  return (
    <>
      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Splash, Login, Signup, Home screens */}
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="home" />
      </Stack>
      <Toast />
    </>
  );
}
