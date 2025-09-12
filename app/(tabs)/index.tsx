import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 10,
    alignSelf: "center",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#eee",
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
  },
  userRole: {
    fontSize: 16,
    color: "#f16e03ff",
    fontWeight: "600",
    marginRight: 8,
  },
  userJob: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  fab: {
    position: "absolute",
    bottom: 40,
    right: 30,
    backgroundColor: "#f16e03ff",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});

export default function HomeTab() {
  const user = {
    name: "Reeper",
    role: "Admin",
    job: "Chef",
    avatar: require("../../assets/images/logo.png"),
  };
  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      {/* Logo */}
      <Image
        tintColor={"#f16e03ff"}
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* User Info Row */}
      <View style={styles.userRow}>
        <Image source={user.avatar} style={styles.avatar} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.userRole}>{user.role}</Text>
            <Text style={styles.userJob}>{user.job}</Text>
          </View>
        </View>
      </View>

      {/* searchbar */}
      <View>
        <Text>Search</Text>
      </View>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          // Add your add-item logic here
        }}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// Remove duplicate styles definition above
