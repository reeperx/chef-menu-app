import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { cartStore } from "../store/cartStore";
import { Colors } from "../utils/Colors";
import type { Meal } from "../utils/data";
import { favoriteStore } from "./FavoriteScreen";
import Toast from "./Toast";

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
  const [inCart, setInCart] = React.useState(() =>
    cartStore.cart.some((m) => m.id === meal.id)
  );

  // Listen for cart clear
  React.useEffect(() => {
    const origClearCart = cartStore.clearCart;
    cartStore.clearCart = () => {
      setInCart(false);
      if (typeof origClearCart === "function") {
        origClearCart();
      }
    };
    return () => {
      cartStore.clearCart = origClearCart;
    };
  }, []);
  React.useEffect(() => {
    // Patch cartStore.setCart to update badge and inCart
    const origSetCart = cartStore.setCart;
    cartStore.setCart = (meals) => {
      cartStore.cart = meals;
      setInCart(meals.some((m) => m.id === meal.id));
      if (
        typeof origSetCart === "function" &&
        origSetCart !== cartStore.setCart
      )
        origSetCart(meals);
    };

    // Add interval to check cart state regularly
    const interval = setInterval(() => {
      const isItemInCart = cartStore.cart.some((m) => m.id === meal.id);
      if (isItemInCart !== inCart) {
        setInCart(isItemInCart);
      }
    }, 300);

    return () => {
      cartStore.setCart = origSetCart;
      clearInterval(interval);
    };
  }, [meal.id, inCart]);
  // Discount logic: match MealViewScreen
  const categoryDiscounts: Record<string, number> = {
    Breakfast: 0.1,
    Lunch: 0.15,
    Dinner: 0.2,
  };
  const discount = categoryDiscounts[meal.category] || 0;
  const discountValue = meal.price * discount;
  const discountedPrice = meal.price - discountValue;

  const toggleCart = () => {
    let updated;
    if (inCart) {
      updated = cartStore.cart.filter((m) => m.id !== meal.id);
    } else {
      // Check if meal already exists in cart
      const exists = cartStore.cart.some((m) => m.id === meal.id);
      if (!exists) {
        updated = [...cartStore.cart, meal];
        Toast?.show?.({
          type: "success",
          text1: "Order added to cart!",
          text2: `R ${discountedPrice.toFixed(2)}${
            discount > 0 ? ` (Discount: -R ${discountValue.toFixed(2)})` : ""
          }`,
        });
      } else {
        updated = cartStore.cart; // No change needed
      }
    }
    cartStore.setCart(updated);
    setInCart(updated.some((m) => m.id === meal.id));
  };
  const [imgError, setImgError] = React.useState(false);
  const navigation = useNavigation();
  const fallbackImage = require("../assets/images/partial-react-logo.png");
  let imageSource;
  if (
    !imgError &&
    typeof meal.image === "string" &&
    meal.image.startsWith("http")
  ) {
    imageSource = { uri: meal.image };
  } else if (typeof meal.image === "number") {
    imageSource = meal.image;
  } else {
    imageSource = fallbackImage;
  }
  // Favorite logic: check if meal is in global favorites
  const [favorite, setFavorite] = React.useState(() =>
    favoriteStore.favorites.some((m) => m.id === meal.id)
  );
  React.useEffect(() => {
    // Patch setFavorites to update badge and local state
    const origSetFavorites = favoriteStore.setFavorites;
    favoriteStore.setFavorites = (meals) => {
      favoriteStore.favorites = meals;
      setFavorite(meals.some((m) => m.id === meal.id));
      if (
        typeof origSetFavorites === "function" &&
        origSetFavorites !== favoriteStore.setFavorites
      )
        origSetFavorites(meals);
    };
    return () => {
      favoriteStore.setFavorites = origSetFavorites;
    };
  }, [meal.id]);
  const toggleFavorite = () => {
    let updated;
    if (favorite) {
      updated = favoriteStore.favorites.filter((m) => m.id !== meal.id);
    } else {
      updated = [...favoriteStore.favorites, meal];
    }
    favoriteStore.setFavorites(updated);
  };
  return (
    <View style={mealCardStyles.card}>
      {/* Favorite icon top right */}
      <TouchableOpacity
        style={{ position: "absolute", top: 10, right: 10, zIndex: 2 }}
        onPress={toggleFavorite}
        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
      >
        <Ionicons
          name={favorite ? "heart" : "heart-outline"}
          size={22}
          color={favorite ? Colors.primary : "#bbb"}
        />
      </TouchableOpacity>
      {/* Image with always-visible centered eye icon, no opacity */}
      <View style={{ position: "relative" }}>
        <Image
          source={imageSource}
          style={mealCardStyles.image}
          resizeMode="cover"
          onError={() => setImgError(true)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: [{ translateX: -18 }, { translateY: -18 }],
            backgroundColor: "#fff",
            borderRadius: 20,
            padding: 8,
            zIndex: 3,
            opacity: 0.6,
          }}
          onPress={() => (navigation as any).navigate("mealview", { meal })}
        >
          <Ionicons name="eye-outline" size={28} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={mealCardStyles.info}>
        <Text style={mealCardStyles.name}>{meal.name}</Text>
        <Text style={mealCardStyles.desc} numberOfLines={2}>
          {meal.description}
        </Text>
        <View style={[mealCardStyles.row, { gap: 0 }]}>
          <Text style={mealCardStyles.price}>R {meal.price.toFixed(2)}</Text>
          <Text style={mealCardStyles.rating}>⭐ {meal.rating.toFixed(1)}</Text>
          {/* Cart icon */}
          <TouchableOpacity
            style={{
              marginLeft: 6,
              marginRight: 4,
              backgroundColor: inCart ? Colors.primary : "#fff",
              borderRadius: 20,
              padding: 6,
              borderWidth: 1,
              borderColor: Colors.primary,
            }}
            onPress={toggleCart}
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

export function VerticalMealList({ meals }: { meals: Meal[] }) {
  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <MealCard meal={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 4 }}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between", gap: 8 }}
    />
  );
}
