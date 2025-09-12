import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../utils/Colors";
import type { Meal } from "../utils/data";

const mealCardStyles = StyleSheet.create({
  card: {
    flex: 0.48,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 18,
    marginHorizontal: 0,
    borderWidth: 1.5,
    borderColor: Colors.primary,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: "hidden",
    alignSelf: "stretch",
  },
  image: {
    width: "100%",
    height: 120,
  },
  info: {
    padding: 12,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
    color: "#222",
  },
  desc: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  price: {
    fontWeight: "600",
    color: Colors.primary,
    marginRight: 8,
  },
  rating: {
    color: "#888",
    fontSize: 13,
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
});

export function MealCard({ meal }: { meal: Meal }) {
  const [inCart, setInCart] = React.useState(false);
  let imageSource;
  if (typeof meal.image === "string" && meal.image.startsWith("http")) {
    imageSource = { uri: meal.image };
  } else if (typeof meal.image === "number") {
    imageSource = meal.image;
  } else {
    imageSource = undefined;
  }
  return (
    <View style={mealCardStyles.card}>
      <Image
        source={imageSource}
        style={mealCardStyles.image}
        resizeMode="cover"
      />
      <View style={mealCardStyles.info}>
        <Text style={mealCardStyles.name}>{meal.name}</Text>
        <Text style={mealCardStyles.desc} numberOfLines={2}>
          {meal.description}
        </Text>
        <View style={mealCardStyles.row}>
          <Text style={mealCardStyles.price}>ZAR {meal.price.toFixed(2)}</Text>
          <Text style={mealCardStyles.rating}>⭐ {meal.rating.toFixed(1)}</Text>
          <TouchableOpacity
            style={{
              marginLeft: 8,
              backgroundColor: inCart ? Colors.primary : "#fff",
              borderRadius: 20,
              padding: 6,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
            onPress={() => setInCart((prev) => !prev)}
          >
            <Ionicons
              name={inCart ? "cart" : "cart-outline"}
              size={22}
              color={inCart ? "#fff" : Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
