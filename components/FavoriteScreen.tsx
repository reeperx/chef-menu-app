import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Colors } from "../utils/Colors";
import { Meal } from "../utils/data";
import { MealCard } from "./Meal";
import SadMealSVG from "./SadMealSVG";

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
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorite meals yet.</Text>
          <SadMealSVG size={160} />
          <Text style={styles.emptySubtext}>
            Tap the heart icon on any meal to add it here!
          </Text>
        </View>
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  emptyText: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 18,
  },
  emptySubtext: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    marginTop: 18,
    marginHorizontal: 10,
  },
});
