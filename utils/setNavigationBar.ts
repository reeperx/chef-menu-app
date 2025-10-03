
import * as SystemUI from "expo-system-ui";
import { Platform } from "react-native";

export function setNavigationBarColor(color: string) {
  if (Platform.OS === "android") {
    SystemUI.setBackgroundColorAsync(color);
  }
}
