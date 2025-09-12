import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../utils/Colors";
import { Meal } from "../utils/data";
import QuantitySlider from "./QuantitySlider";
import SadCartSVG from "./SadCartSVG";
import Sticker from "./Sticker";

export const cartStore: {
  cart: Meal[];
  setCart: (meals: Meal[]) => void;
  clearCart: () => void;
} = {
  cart: [],
  setCart: () => {},
  clearCart: () => {},
};

export default function CartScreen() {
  const [cart, setCart] = useState<Meal[]>(cartStore.cart);
  const navigation = useNavigation();

  useEffect(() => {
    cartStore.cart = cart;
    cartStore.setCart = setCart;
    cartStore.clearCart = () => setCart([]);
  }, [cart]);

  // Track quantity for each meal in cart
  const [quantities, setQuantities] = useState<{ [id: string]: number }>(() => {
    const q: { [id: string]: number } = {};
    cart.forEach((m) => (q[m.id] = 1));
    return q;
  });
  // Assign a stable sticker type per meal
  const STICKERS = ["Hot", "Spicy", "Mild", "Special"];
  const [stickers] = useState<{ [id: string]: string }>(() => {
    const s: { [id: string]: string } = {};
    cart.forEach((m, i) => {
      s[m.id] = STICKERS[i % STICKERS.length];
    });
    return s;
  });
  const [discount, setDiscount] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountValue, setDiscountValue] = useState(0);

  // Dummy discount: code "SAVE10" gives 10% off
  const handleApplyDiscount = () => {
    if (discount.trim().toUpperCase() === "SAVE10") {
      setDiscountApplied(true);
      setDiscountValue(0.1);
    } else {
      setDiscountApplied(false);
      setDiscountValue(0);
    }
  };

  const total = cart.reduce(
    (sum, meal) => sum + meal.price * (quantities[meal.id] || 1),
    0
  );
  const discountedTotal = discountApplied ? total * (1 - discountValue) : total;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty.</Text>
          <SadCartSVG size={160} />
          <Text style={styles.emptySubtext}>
            Add meals to your cart by tapping the cart icon on any meal.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cartRow}>
                {/* Image left */}
                <Image
                  source={
                    typeof item.image === "string"
                      ? { uri: item.image }
                      : item.image
                  }
                  style={styles.mealImage}
                  resizeMode="cover"
                />
                {/* Meal info and controls right */}
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={styles.mealInfoRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.mealName}>{item.name}</Text>
                      <Text style={styles.mealDesc} numberOfLines={2}>
                        {item.description}
                      </Text>
                      <Text style={styles.mealPrice}>
                        R {item.price.toFixed(2)}
                      </Text>
                    </View>
                    {/* Quantity slider right */}
                    <QuantitySlider
                      value={quantities[item.id] || 1}
                      setValue={(v) =>
                        setQuantities((q) => ({ ...q, [item.id]: v }))
                      }
                      min={1}
                      max={10}
                    />
                  </View>
                  {/* Sticker below, stable */}
                  <Sticker type={stickers[item.id]} />
                </View>
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
          {/* Discount code section */}
          <View style={styles.discountSection}>
            <Text style={styles.discountLabel}>Discount Code</Text>
            <View style={styles.discountRow}>
              <TextInput
                style={styles.discountInput}
                value={discount}
                onChangeText={setDiscount}
                placeholder="Enter code"
                autoCapitalize="characters"
              />
              <TouchableOpacity
                style={styles.discountBtn}
                onPress={handleApplyDiscount}
              >
                <Text style={styles.discountBtnText}>Apply</Text>
              </TouchableOpacity>
            </View>
            {discountApplied && (
              <Text style={styles.discountApplied}>10% discount applied!</Text>
            )}
            {!discountApplied && discount.length > 0 && (
              <Text style={styles.discountInvalid}>Invalid code</Text>
            )}
          </View>
          <View style={styles.checkoutBar}>
            <Text style={styles.totalText}>
              Total: R {discountedTotal.toFixed(2)}
              {discountApplied && (
                <Text style={styles.discountedOldTotal}>
                  {" "}
                  (R {total.toFixed(2)})
                </Text>
              )}
            </Text>
            <TouchableOpacity
              style={styles.checkoutBtn}
              onPress={() => (navigation as any).navigate("Checkout")}
            >
              <Text style={styles.checkoutBtnText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
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
  cartRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fafafa",
    borderRadius: 14,
    marginBottom: 16,
    padding: 12,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  mealImage: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#eee",
  },
  mealInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  mealName: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 2,
  },
  mealDesc: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  mealPrice: {
    fontSize: 15,
    color: Colors.primary,
    fontWeight: "600",
    marginBottom: 2,
  },
  discountSection: {
    backgroundColor: "#f2f3f2",
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    marginTop: 2,
  },
  discountLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 6,
  },
  discountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  discountInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 15,
  },
  discountBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  discountBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  discountApplied: {
    color: "#34c759",
    fontWeight: "bold",
    marginTop: 6,
  },
  discountInvalid: {
    color: "#ff3b30",
    fontWeight: "bold",
    marginTop: 6,
  },
  checkoutBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    marginTop: 8,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  discountedOldTotal: {
    color: "#888",
    fontSize: 14,
    textDecorationLine: "line-through",
    marginLeft: 6,
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  checkoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
