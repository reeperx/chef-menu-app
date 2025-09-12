import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { cartStore } from "../../components/CartScreen";
import { favoriteStore } from "../../components/FavoriteScreen";
import { Colors } from "../../utils/Colors";

function FavoriteTabIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const [count, setCount] = React.useState(favoriteStore.favorites.length);
  React.useEffect(() => {
    favoriteStore.setFavorites = (meals) => {
      favoriteStore.favorites = meals;
      setCount(meals.length);
    };
  }, []);
  return (
    <View>
      <Ionicons
        name={focused ? "heart" : "heart-outline"}
        size={size}
        color={color}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    zIndex: 10,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

function CartTabIcon({
  color,
  size,
  focused,
}: {
  color: string;
  size: number;
  focused: boolean;
}) {
  const [count, setCount] = React.useState(cartStore.cart.length);
  React.useEffect(() => {
    cartStore.setCart = (meals) => {
      cartStore.cart = meals;
      setCount(meals.length);
    };
    cartStore.clearCart = () => {
      cartStore.cart = [];
      setCount(0);
    };
  }, []);
  return (
    <View>
      <Ionicons
        name={focused ? "cart" : "cart-outline"}
        size={size}
        color={color}
      />
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count}</Text>
        </View>
      )}
    </View>
  );
}
export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size, focused }) => {
          if (route.name === "favorite") {
            return (
              <FavoriteTabIcon color={color} size={size} focused={focused} />
            );
          }
          let iconName = "home-outline";
          if (route.name === "index")
            iconName = focused ? "home" : "home-outline";
          else if (route.name === "cart")
            iconName = focused ? "cart" : "cart-outline";
          else if (route.name === "profile")
            iconName = focused ? "person" : "person-outline";
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Favorite",
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
        }}
      />
    </Tabs>
  );
}
