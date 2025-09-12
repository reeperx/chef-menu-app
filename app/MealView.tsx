import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ActionSheetIOS,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "../components/Toast";
import { Colors } from "../utils/Colors";

export default function MealView({ route }: any) {
  const [favorite, setFavorite] = React.useState(false);
  const meal = route?.params?.meal;
  const router = useRouter();
  const handleMenu = () => {
    if (Platform.OS === "ios") {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ["Cancel", "Share", "Report"],
          cancelButtonIndex: 0,
          destructiveButtonIndex: 2,
        },
        (buttonIndex) => {
          if (buttonIndex === 1) handleShare();
          if (buttonIndex === 2) handleReport();
        }
      );
    } else {
      // For Android, use Toast instead of alert
      Toast.show({
        type: "info",
        text1: "Share or Report coming soon!",
      });
    }
  };
  const handleShare = () => {
    Share.share({
      message: meal
        ? `Check out this meal: ${meal.name}`
        : "Check out this meal!",
    });
  };
  const handleReport = () => {
    Toast.show({
      type: "success",
      text1: "Reported. Thank you!",
    });
  };
  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.replace("/(tabs)")}
          style={styles.iconBtn}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.primary} />
        </TouchableOpacity>
        <View style={styles.rightIcons}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => setFavorite((f) => !f)}
          >
            <Ionicons
              name={favorite ? "heart" : "heart-outline"}
              size={22}
              color={Colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={handleMenu}>
            <Ionicons
              name="ellipsis-vertical"
              size={22}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* Content placeholder */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: Colors.primary }}>
          {meal ? meal.name : "Meal details coming soon..."}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconBtn: {
    padding: 6,
    marginLeft: 8,
  },
  rightIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
});
