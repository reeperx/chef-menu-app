import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/utils/Colors";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

export default function SignupScreen() {
  const [isVisible, setisVisible] = useState(true);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.secondary,
      }}
    >
      <StatusBar style="dark" />
      <ScrollView
        style={{
          flex: 1,
          paddingTop: 30,
        }}
      >
        {/* logo */}
        <Image
          tintColor={"#f16e03ff"}
          style={{
            width: "50%",
            height: undefined,
            aspectRatio: 250 / 80,
            alignSelf: "center",
            maxWidth: 250,
            maxHeight: 80,
          }}
          source={require("../../assets/images/logo.png")}
          resizeMode="contain"
        />
        {/* form */}
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 50,
          }}
        >
          {/* header text */}
          <Text
            style={{
              color: Colors.default,
              fontSize: 24,
              fontWeight: "500",
            }}
          >
            Register
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "400",
              color: "gray",
              marginTop: 10,
            }}
          >
            Enter your credentials to continue
          </Text>

          {/* username */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "gray",
              marginTop: 40,
            }}
          >
            Username
          </Text>
          <TextInput
            keyboardType="name-phone-pad"
            maxLength={12}
            style={{
              borderColor: Colors.primary,
              borderBottomWidth: 2,
              borderRadius: 5,
              fontSize: 16,
              marginTop: 8,
            }}
          />

          {/* email */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "gray",
              marginTop: 30,
            }}
          >
            Email
          </Text>
          <TextInput
            keyboardType="email-address"
            style={{
              borderColor: Colors.primary,
              borderBottomWidth: 2,
              borderRadius: 5,
              fontSize: 16,
              marginTop: 8,
            }}
          />

          {/* password */}
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: "gray",
              marginTop: 30,
            }}
          >
            Password
          </Text>
          <View
            style={{
              borderColor: Colors.primary,
              borderBottomWidth: 2,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TextInput
              maxLength={12}
              keyboardType="ascii-capable"
              style={{
                borderRadius: 5,
                fontSize: 16,
                marginTop: 15,
                flex: 1,
              }}
              secureTextEntry={isVisible}
            />
            <Ionicons
              onPress={() => {
                setisVisible(!isVisible);
              }}
              name={isVisible === true ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#f16e03ff"
            />
          </View>
          <Text
            numberOfLines={2}
            style={{
              fontSize: 15,
              fontWeight: "400",
              color: Colors.default,
              marginTop: 15,
              letterSpacing: 0.7,
              lineHeight: 25,
              width: "85%",
              opacity: 0.7,
            }}
          >
            By continuing you agree to our Terms of Service and Privacy Policy.
          </Text>

          {/* button */}
          <TouchableOpacity
            onPress={() => {
              console.log("press");
            }}
            style={{
              backgroundColor: Colors.primary,
              marginTop: 30,
              height: 70,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 19,
                fontWeight: "500",
                color: Colors.secondary,
              }}
            >
              Register
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 15,
              gap: 6
            }}
          >
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Already have an account?
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "800",
                color: Colors.primary,
                letterSpacing: 1
              }}
            >
              Login
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
