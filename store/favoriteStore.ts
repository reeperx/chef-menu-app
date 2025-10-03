import { create } from "zustand";
import { Meal } from "../utils/data";

interface FavoriteState {
  favorites: Meal[];
  setFavorites: (meals: Meal[]) => void;
  addToFavorites: (meal: Meal) => void;
  removeFromFavorites: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
  getFavoriteCount: () => number;
}

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  favorites: [],
  
  setFavorites: (meals: Meal[]) => {
    set({ favorites: meals });
  },
  
  addToFavorites: (meal: Meal) => {
    const { favorites } = get();
    const exists = favorites.some((m) => m.id === meal.id);
    if (!exists) {
      set({ favorites: [...favorites, meal] });
    }
  },
  
  removeFromFavorites: (mealId: string) => {
    const { favorites } = get();
    set({ favorites: favorites.filter((m) => m.id !== mealId) });
  },
  
  isFavorite: (mealId: string) => {
    return get().favorites.some((m) => m.id === mealId);
  },
  
  getFavoriteCount: () => {
    return get().favorites.length;
  },
}));

// Legacy compatibility - keep for components that still use the old pattern
export const favoriteStore = {
  get favorites() {
    return useFavoriteStore.getState().favorites;
  },
  setFavorites: (meals: Meal[]) => useFavoriteStore.getState().setFavorites(meals),
};