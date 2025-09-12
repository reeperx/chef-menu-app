import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { responsiveHeight } from "react-native-responsive-dimensions";

export default function Banner() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.bannerImage}
        source={require("../assets/images/banner.png")}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20, 
    overflow: "hidden",
  },
  bannerImage: {
    width: "100%",
    height: responsiveHeight(15),
    borderRadius: 10,
  },
});
