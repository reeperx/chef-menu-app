// utils/data.ts
export interface Meal {
  id: string;
  name: string;
  category: "Breakfast" | "Lunch" | "Dinner";
  price: number; // in ZAR
  image: string;
  description: string;
  rating: number; // 1-5
}

export const meals: Meal[] = [
  // Breakfast (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `breakfast-${i + 1}`,
    name: `Breakfast Meal ${i + 1}`,
    category: "Breakfast" as const,
    price: 45 + i * 2,
    image: `https://source.unsplash.com/400x300/?breakfast,meal,${i + 1}`,
    description: `A delicious breakfast meal number ${
      i + 1
    } to start your day right.`,
    rating: 4 + (i % 2 ? 0.5 : 0),
  })),
  // Lunch (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `lunch-${i + 1}`,
    name: `Lunch Meal ${i + 1}`,
    category: "Lunch" as const,
    price: 65 + i * 3,
    image: `https://source.unsplash.com/400x300/?lunch,meal,${i + 1}`,
    description: `A hearty lunch meal number ${i + 1} to keep you going.`,
    rating: 3.5 + (i % 3 ? 0.5 : 0),
  })),
  // Dinner (20)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: `dinner-${i + 1}`,
    name: `Dinner Meal ${i + 1}`,
    category: "Dinner" as const,
    price: 80 + i * 4,
    image: `https://source.unsplash.com/400x300/?dinner,meal,${i + 1}`,
    description: `A tasty dinner meal number ${i + 1} to end your day.`,
    rating: 4 + (i % 4 ? 0.5 : 0),
  })),
];

export const filterOptions = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];
