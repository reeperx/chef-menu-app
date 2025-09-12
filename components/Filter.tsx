import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "../utils/Colors";
import type { Meal } from "../utils/data";
import { filterOptions } from "../utils/data";

const styles = StyleSheet.create({
  horizontalScroll: {
    maxHeight: 60,
  },
  horizontalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  chip: {
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  chipSelected: {
    backgroundColor: "#f16e03ff",
    borderColor: "#f16e03ff",
  },
  chipText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 16,
  },
  chipTextSelected: {
    color: "#fff",
  },
});

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
    color: "#f16e03ff",
    marginBottom: 2,
  },
  rating: {
    color: "#888",
    fontSize: 13,
  },
});

interface FilterChipProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.chipSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function FilterChips({
  selected,
  setSelected,
  onFilterChange,
}: {
  selected: string;
  setSelected: (key: string) => void;
  onFilterChange?: (key: string) => void;
}) {
  return (
    <ScrollView
      style={styles.horizontalScroll}
      contentContainerStyle={styles.horizontalContainer}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {filterOptions.map((opt) => (
        <TouchableOpacity
          key={opt.key}
          style={[styles.chip, selected === opt.key && styles.chipSelected]}
          onPress={() => {
            setSelected(opt.key);
            onFilterChange?.(opt.key);
          }}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.chipText,
              selected === opt.key && styles.chipTextSelected,
            ]}
          >
            {opt.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

export default function Filter({
  onFilterChange,
}: { onFilterChange?: (key: string) => void } = {}) {
  const [selected, setSelected] = useState("all");
  return (
    <FilterChips
      selected={selected}
      setSelected={setSelected}
      onFilterChange={onFilterChange}
    />
  );
}

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
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

// VerticalMealList: renders a vertical scrollable list of MealCards (up to down)
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

// Only export VerticalMealList once
