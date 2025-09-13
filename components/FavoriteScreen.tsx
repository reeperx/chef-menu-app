import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { create } from "zustand";
import { Colors } from "../utils/Colors";
import { Meal } from "../utils/data";
import { MealCard } from "./Meal";
import SadMealSVG from "./SadMealSVG";

interface FavoriteState {
  favorites: Meal[];
  setFavorites: (meals: Meal[]) => void;
  addToFavorites: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
  getFavoriteCount: () => number;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  
  setFavorites: (meals: Meal[]) => {
    set({ favorites: meals });
  },
  
  addToFavorites: (meal: Meal) => {
    const { favorites } = get();
    const exists = favorites.some((m) => m.id === meal.id);
    if (!exists) {
      set({ favorites: [...favorites, meal] });
    }
  },
  
  removeFromFavorites: (mealId: string) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((m) => m.id !== mealId) });
  },
  
  isFavorite: (mealId: string) => {
    return get().favorites.some((m) => m.id === mealId);
  },
  
  getFavoriteCount: () => {
    return get().favorites.length;
  },
}));

// Legacy compatibility - keep for components that still use the old pattern
export const favoriteStore = {
  get favorites() {
    return useFavoriteStore.getState().favorites;
  },
  setFavorites: (meals: Meal[]) => useFavoriteStore.getState().setFavorites(meals),
};

export default function FavoriteScreen() {
  const { favorites, setFavorites } = useFavoriteStore();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter(
    (meal) =>
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Ionicons name="heart" size={28} color={Colors.primary} />
        <Text style={styles.header}>My Favorites</Text>
        {favorites.length > 0 && (
          <View style={styles.favoriteBadge}>
            <Text style={styles.favoriteBadgeText}>{favorites.length}</Text>
          </View>
        )}
      </View>

      {/* Search Bar */}
      {favorites.length > 0 && (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search your favorites..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      )}

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite meals yet</Text>
          <SadMealSVG size={160} />
          <Text style={styles.emptySubtext}>
            Tap the heart icon on any meal to save it here
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.browseButtonText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No matches found</Text>
          <SadMealSVG size={120} />
          <Text style={styles.emptySubtext}>
            Try a different search term or browse all favorites
          </Text>
          <TouchableOpacity
            style={styles.browseButton}
            onPress={() => setSearchQuery("")}
          >
            <Text style={styles.browseButtonText}>Clear Search</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredFavorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <MealCard meal={item} />
            </View>
          )}
          contentContainerStyle={styles.listContent}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  favoriteBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  favoriteBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    marginLeft: 8,
    color: "#333",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    color: Colors.primary,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  emptySubtext: {
    color: "#666",
    fontSize: 16,
    textAlign: "center",
    marginTop: 24,
    marginHorizontal: 20,
    lineHeight: 22,
  },
  browseButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 32,
  },
  browseButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
    gap: 12,
  },
  cardContainer: {
    flex: 1,
    maxWidth: "48%",
  },
});
