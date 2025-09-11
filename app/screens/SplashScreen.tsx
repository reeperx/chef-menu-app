import { Colors } from "@/utils/Colors";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        // make the whole section take the entire color
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="light" />
      <View>
        {/* <View style={{
        backgroundColor: 'red',
        height: 100
      }}> */}
        <Image
          style={{
            tintColor: "white",
            width: "80%",
            // The height is set to undefined so that React Native can automatically calculate the image's height based on the width and the aspectRatio you provided. This ensures the image scales proportionally and is not distorted, making it responsive across different screen sizes.

            // With width set (e.g., "80%") and aspectRatio specified, React Native will maintain the correct proportions for the image, and height will be determined automatically. This is a common pattern for responsive images in React Native.
            height: undefined,
            aspectRatio: 450 / 130,
            alignSelf: "center",
            maxWidth: 450,
            maxHeight: 130,
          }}
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}
