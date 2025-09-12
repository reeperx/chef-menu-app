import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import UserProfile from "../../components/profile/UserProfile";
import { useAuthStore } from "../../store/authStore";

export default function ProfileTab() {
  const { isAdmin } = useAuthStore();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <UserProfile isAdmin={isAdmin()} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
