import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminStore } from "../../store/adminStore";
import { Colors } from "../../utils/Colors";
import Toast from "../Toast";

export default function ManageUsersScreen() {
  const router = useRouter();
  const { users } = useAdminStore();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Manage Users</Text>
      </View>

      {/* Users List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <View style={styles.userInfo}>
              <View style={styles.userHeader}>
                <Text style={styles.username}>{item.username}</Text>
                <View style={styles.roleContainer}>
                  <Ionicons
                    name={item.role === "admin" ? "shield-checkmark" : "person"}
                    size={14}
                    color={Colors.primary}
                  />
                  <Text style={styles.roleText}>{item.role}</Text>
                </View>
              </View>
              <Text style={styles.email}>{item.email}</Text>
            </View>
            <View style={styles.userActions}>
              <TouchableOpacity
                style={[
                  styles.actionButton,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={() => {
                  Toast.show({
                    type: "info",
                    text1: "Coming Soon",
                    text2: "Edit user functionality will be available soon.",
                  });
                }}
              >
                <Ionicons name="create" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
    marginLeft: 16,
  },
  backButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
  },
  userItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 12,
  },
  userInfo: {
    flex: 1,
  },
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
  },
  roleContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 4,
  },
  roleText: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: "500",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  userActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 6,
  },
});
