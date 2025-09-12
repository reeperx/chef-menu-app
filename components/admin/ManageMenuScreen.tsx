import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAdminStore } from "../../store/adminStore";
import { Colors } from "../../utils/Colors";
import Toast from "../Toast";
import AddMenuItemModal from "./AddMenuItemModal";

export default function ManageMenuScreen() {
  const router = useRouter();
  const { menu: menuItems, deleteMenuItem } = useAdminStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const filteredItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteItem = (mealId: string) => {
    // Show confirmation dialog
    if (confirm("Are you sure you want to delete this item?")) {
      deleteMenuItem(mealId);
      Toast.show({
        type: "success",
        text1: "Item deleted",
        text2: "Menu item has been deleted successfully.",
      });
    }
  };

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
        <Text style={styles.headerTitle}>Manage Menu</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAddModalVisible(true)}
        >
          <Ionicons name="add" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Add Menu Item Modal */}
      {isAddModalVisible && (
        <View style={StyleSheet.absoluteFill}>
          <AddMenuItemModal
            visible={isAddModalVisible}
            onClose={() => setIsAddModalVisible(false)}
          />
        </View>
      )}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Menu Items List */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image
              source={{ uri: item.image }}
              style={styles.itemImage}
              defaultSource={require("../../assets/images/logo.png")}
            />
            <View style={styles.itemContent}>
              <View style={styles.itemHeader}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>
                    R {item.price.toFixed(2)}
                  </Text>
                </View>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>{item.category}</Text>
                </View>
              </View>
              <Text style={styles.itemDescription} numberOfLines={2}>
                {item.description}
              </Text>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color={Colors.primary} />
                <Text style={styles.ratingText}>{item.rating.toFixed(1)}</Text>
              </View>
              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: Colors.primary },
                  ]}
                  onPress={() => {
                    Toast.show({
                      type: "info",
                      text1: "Coming Soon",
                      text2: "Edit functionality will be available soon.",
                    });
                  }}
                >
                  <Ionicons name="create" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.actionButton, { backgroundColor: "#ff3b30" }]}
                  onPress={() => handleDeleteItem(item.id)}
                >
                  <Ionicons name="trash" size={20} color="#fff" />
                  <Text style={styles.actionButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
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
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.primary,
  },
  backButton: {
    padding: 8,
  },
  addButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  menuItem: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemContent: {
    flex: 1,
    padding: 12,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    marginRight: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "600",
  },
  categoryBadge: {
    backgroundColor: Colors.primary + "20",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "500",
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: "500",
  },
  itemActions: {
    flexDirection: "row",
    gap: 8,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
});
