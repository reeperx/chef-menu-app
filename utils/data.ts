// utils/data.ts
export interface Meal {
  id: string;
  name: string;
  subtitle?: string;
  category: "Breakfast" | "Lunch" | "Dinner";
  price: number; // in ZAR
  discountedPrice?: number;
  image: string;
  description: string;
  rating: number; // 1-5
  isSpicy: boolean;
  ingredients?: string[];
  nutritionalInfo?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };
  isAvailable?: boolean;
}

export const meals: Meal[] = [
  // Breakfast
  {
    id: "breakfast-1",
    name: "Classic Pancakes",
    category: "Breakfast",
    price: 49,
    image:
      "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fluffy pancakes served with maple syrup and fresh berries.",
    rating: 4.5,
    isSpicy: false,
    subtitle: "Our Signature Breakfast",
    ingredients: ["Flour", "Eggs", "Milk", "Butter", "Maple Syrup", "Fresh Berries"],
    nutritionalInfo: { calories: 450, protein: 8, carbs: 65, fats: 12 },
    isAvailable: true,
  },
  {
    id: "breakfast-2",
    name: "Avocado Toast",
    category: "Breakfast",
    price: 55,
    image:
      "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Sourdough toast topped with smashed avocado and poached eggs.",
    rating: 4.7,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "breakfast-3",
    name: "Omelette Supreme",
    category: "Breakfast",
    price: 52,
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Three-egg omelette with cheese, ham, mushrooms, and peppers.",
    rating: 4.6,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "breakfast-4",
    name: "Berry Parfait",
    category: "Breakfast",
    price: 48,
    image:
      "https://images.pexels.com/photos/3764643/pexels-photo-3764643.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Layers of Greek yogurt, granola, and mixed berries.",
    rating: 4.3,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "breakfast-5",
    name: "French Toast",
    category: "Breakfast",
    price: 54,
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Brioche bread dipped in egg and fried, served with syrup.",
    rating: 4.4,
    isSpicy: false,
    isAvailable: true,
  },

  // Lunch
  {
    id: "lunch-1",
    name: "Chicken Caesar Salad",
    category: "Lunch",
    price: 72,
    image:
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Grilled chicken breast on romaine lettuce with Caesar dressing.",
    rating: 4.2,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "lunch-2",
    name: "Beef Burger Deluxe",
    category: "Lunch",
    price: 85,
    image:
      "https://images.pexels.com/photos/1639567/pexels-photo-1639567.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Juicy beef patty with cheese, lettuce, tomato, and fries.",
    rating: 4.6,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "lunch-3",
    name: "Margherita Pizza",
    category: "Lunch",
    price: 90,
    image:
      "https://images.pexels.com/photos/2619967/pexels-photo-2619967.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Classic pizza with tomato, mozzarella, and fresh basil.",
    rating: 4.8,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "lunch-4",
    name: "Grilled Veggie Wrap",
    category: "Lunch",
    price: 68,
    image:
      "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Whole wheat wrap filled with grilled vegetables and hummus.",
    rating: 4.1,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "lunch-5",
    name: "Fish & Chips",
    category: "Lunch",
    price: 95,
    image:
      "https://images.pexels.com/photos/1860200/pexels-photo-1860200.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Crispy battered fish served with fries and tartar sauce.",
    rating: 4.5,
    isSpicy: false,
    isAvailable: true,
  },

  // Dinner
  {
    id: "dinner-1",
    name: "Steak & Mash",
    category: "Dinner",
    price: 120,
    image:
      "https://images.pexels.com/photos/675951/pexels-photo-675951.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Grilled sirloin steak with creamy mashed potatoes.",
    rating: 4.9,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "dinner-2",
    name: "Spaghetti Bolognese",
    category: "Dinner",
    price: 98,
    image:
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Classic Italian pasta with rich beef and tomato sauce.",
    rating: 4.7,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "dinner-3",
    name: "Butter Chicken Curry",
    category: "Dinner",
    price: 110,
    image:
      "https://images.pexels.com/photos/128408/pexels-photo-128408.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Creamy butter chicken served with basmati rice.",
    rating: 4.8,
    isSpicy: true,
    isAvailable: true,
  },
  {
    id: "dinner-4",
    name: "Grilled Salmon",
    category: "Dinner",
    price: 130,
    image:
      "https://images.pexels.com/photos/3296275/pexels-photo-3296275.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Salmon fillet grilled to perfection with lemon butter.",
    rating: 4.6,
    isSpicy: false,
    isAvailable: true,
  },
  {
    id: "dinner-5",
    name: "Vegetable Stir Fry",
    category: "Dinner",
    price: 88,
    image:
      "https://images.pexels.com/photos/3026800/pexels-photo-3026800.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Mixed vegetables stir-fried in a savory sauce.",
    rating: 4.3,
    isSpicy: true,
    isAvailable: true,
  },
];

export const filterOptions = [
  { key: "all", label: "All" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "dinner", label: "Dinner" },
];
