import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/Colors";
import { Meal } from "../utils/data";
import { MealCard } from "./Meal";

// Simple in-memory favorite store (replace with context or redux for real app)
export const favoriteStore: {
  favorites: Meal[];
  setFavorites: (meals: Meal[]) => void;
} = {
  favorites: [],
  setFavorites: () => {},
};

export default function FavoriteScreen() {
  const [favorites, setFavorites] = useState<Meal[]>(favoriteStore.favorites);

  // Keep store in sync for other components
  useEffect(() => {
    favoriteStore.favorites = favorites;
    favoriteStore.setFavorites = setFavorites;
  }, [favorites]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Favorites</Text>
      {favorites.length === 0 ? (
        <Text style={styles.empty}>
          No favorite meals yet. Tap the heart icon on any meal to add it here!
        </Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <MealCard meal={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 16,
    alignSelf: "center",
  },
  empty: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
