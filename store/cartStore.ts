import { create } from "zustand";
import { Meal } from "../utils/data";

interface CartState {
  cart: Meal[];
  setCart: (meals: Meal[]) => void;
  clearCart: () => void;
  addToCart: (meal: Meal) => void;
  removeFromCart: (mealId: string) => void;
  getCartCount: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  
  setCart: (meals: Meal[]) => {
    set({ cart: meals });
  },
  
  clearCart: () => {
    set({ cart: [] });
  },
  
  addToCart: (meal: Meal) => {
    const { cart } = get();
    const exists = cart.some((m) => m.id === meal.id);
    if (!exists) {
      set({ cart: [...cart, meal] });
    }
  },
  
  removeFromCart: (mealId: string) => {
    const { cart } = get();
    set({ cart: cart.filter((m) => m.id !== mealId) });
  },
  
  getCartCount: () => {
    return get().cart.length;
  },
  
  getCartTotal: () => {
    const { cart } = get();
    const categoryDiscounts: Record<string, number> = {
      Breakfast: 0.1,
      Lunch: 0.15,
      Dinner: 0.2,
    };
    
    return cart.reduce((sum, meal) => {
      const categoryDiscount = categoryDiscounts[meal.category] || 0;
      const discountedPrice = meal.price * (1 - categoryDiscount);
      return sum + discountedPrice;
    }, 0);
  },
}));

// Legacy compatibility - keep for components that still use the old pattern
export const cartStore = {
  get cart() {
    return useCartStore.getState().cart;
  },
  setCart: (meals: Meal[]) => useCartStore.getState().setCart(meals),
  clearCart: () => useCartStore.getState().clearCart(),
};
