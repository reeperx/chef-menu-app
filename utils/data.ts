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
  // Breakfast
  {
    id: "breakfast-1",
    name: "Classic Pancakes",
    category: "Breakfast",
    price: 49,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Fluffy pancakes served with maple syrup and fresh berries.",
    rating: 4.5,
  },
  {
    id: "breakfast-2",
    name: "Avocado Toast",
    category: "Breakfast",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1516685018646-5499d0a7d42f?auto=format&fit=crop&w=400&q=80",
    description:
      "Sourdough toast topped with smashed avocado and poached eggs.",
    rating: 4.7,
  },
  {
    id: "breakfast-3",
    name: "Omelette Supreme",
    category: "Breakfast",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=400&q=80",
    description: "Three-egg omelette with cheese, ham, mushrooms, and peppers.",
    rating: 4.6,
  },
  {
    id: "breakfast-4",
    name: "Berry Parfait",
    category: "Breakfast",
    price: 48,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    description: "Layers of Greek yogurt, granola, and mixed berries.",
    rating: 4.3,
  },
  {
    id: "breakfast-5",
    name: "French Toast",
    category: "Breakfast",
    price: 54,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80",
    description: "Brioche bread dipped in egg and fried, served with syrup.",
    rating: 4.4,
  },
  // Lunch
  {
    id: "lunch-1",
    name: "Chicken Caesar Salad",
    category: "Lunch",
    price: 72,
    image:
      "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80",
    description:
      "Grilled chicken breast on romaine lettuce with Caesar dressing.",
    rating: 4.2,
  },
  {
    id: "lunch-2",
    name: "Beef Burger Deluxe",
    category: "Lunch",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
    description: "Juicy beef patty with cheese, lettuce, tomato, and fries.",
    rating: 4.6,
  },
  {
    id: "lunch-3",
    name: "Margherita Pizza",
    category: "Lunch",
    price: 90,
    image:
      "https://images.unsplash.com/photo-1542281286-9e0a16bb7366?auto=format&fit=crop&w=400&q=80",
    description: "Classic pizza with tomato, mozzarella, and fresh basil.",
    rating: 4.8,
  },
  {
    id: "lunch-4",
    name: "Grilled Veggie Wrap",
    category: "Lunch",
    price: 68,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Whole wheat wrap filled with grilled vegetables and hummus.",
    rating: 4.1,
  },
  {
    id: "lunch-5",
    name: "Fish & Chips",
    category: "Lunch",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Crispy battered fish served with fries and tartar sauce.",
    rating: 4.5,
  },
  // Dinner
  {
    id: "dinner-1",
    name: "Steak & Mash",
    category: "Dinner",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1514512364185-4c2b678557dd?auto=format&fit=crop&w=400&q=80",
    description: "Grilled sirloin steak with creamy mashed potatoes.",
    rating: 4.9,
  },
  {
    id: "dinner-2",
    name: "Spaghetti Bolognese",
    category: "Dinner",
    price: 98,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Classic Italian pasta with rich beef and tomato sauce.",
    rating: 4.7,
  },
  {
    id: "dinner-3",
    name: "Butter Chicken Curry",
    category: "Dinner",
    price: 110,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Creamy butter chicken served with basmati rice.",
    rating: 4.8,
  },
  {
    id: "dinner-4",
    name: "Grilled Salmon",
    category: "Dinner",
    price: 130,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Salmon fillet grilled to perfection with lemon butter.",
    rating: 4.6,
  },
  {
    id: "dinner-5",
    name: "Vegetable Stir Fry",
    category: "Dinner",
    price: 88,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    description: "Mixed vegetables stir-fried in a savory sauce.",
    rating: 4.3,
  },
];

export const filterOptions = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];
