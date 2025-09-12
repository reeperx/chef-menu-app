# Project Requirements & Guidelines

This project is a beginner-friendly Expo React Native app for meal browsing, favorites, and cart management. It is designed to be easy to understand, extend, and maintain. Please follow these requirements and logic guidelines to keep the project accessible for new developers.

## General Principles

- **Keep all code beginner-friendly:** Use clear variable names, add comments for non-obvious logic, and avoid unnecessary abstractions.
- **No page or screen removals:** All existing screens (Home, Cart, Favorite, Profile, Meal View, Splash, Login, Signup, Checkout) must remain in the project.
- **Consistent navigation:** Use Expo Router for navigation. All navigation actions must use route names as defined in the tab/stack navigators.
- **State management:** Use simple in-memory stores (like cartStore, favoriteStore) for global state. Avoid Redux or complex state libraries.
- **Notification bubbles:** Cart and favorite icons in the bottom navigation must always show correct notification bubbles. Cart icon on meal cards and MealViewScreen must also show a bubble if items are in the cart.
- **No require cycles:** Refactor code to avoid import cycles (e.g., between FavoriteScreen and Meal).
- **Component reusability:** Extract common UI (like header bars, notification bubbles) into reusable components if used in more than one place.
- **Styling:** Use StyleSheet and inline styles. Keep styles readable and grouped by component.
- **Navigation bar and StatusBar:** Always match the navigation bar color to the StatusBar style for a polished look.

## Functionality

- **Home:** Shows meals, filter, search, and banner. Allows navigation to meal details.
- **Meal View:** Shows meal details, allows adding to cart, and shows notification bubble on cart button. Navigates to cart after adding.
- **Cart:** Lists all meals in cart, allows quantity adjustment, and shows total. Notification bubble on tab icon.
- **Favorite:** Lists favorite meals. Notification bubble on tab icon.
- **Profile:** Placeholder for user info/settings.
- **Splash, Login, Signup:** Standard onboarding flow.
- **Checkout:** Simple checkout screen.

## Logic

- **Cart logic:** Adding a meal to cart updates all cart bubbles. Removing from cart updates everywhere.
- **Favorite logic:** Adding/removing favorites updates all favorite bubbles.
- **Navigation:** Use correct navigation context (tab for tab screens, stack for stack screens).
- **No unhandled navigation actions:** Always check that the route exists in the navigator.

## Documentation

- **README.md:** Keep instructions up to date for setup, running, and adding dependencies (use npm).
- **Requirements:** Update this file if new features or screens are added.

---

This file is a living document. Please update it as the project evolves to help future contributors and beginners.
