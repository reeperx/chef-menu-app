import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { responsiveHeight } from "react-native-responsive-dimensions" 
import { Feather } from '@expo/vector-icons'

export default function Searchbar() {
  return (
    <View
    style={{
        backgroundColor: "#f2f3f2",
        height: responsiveHeight(5),
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        gap: 10
    }}
    >
        <Feather name='search' size={20} color={"black"} />
      <TextInput 
      style={{
        flex: 1
      }}
      placeholder='search for a meal'
      />
      <Feather name='mic' size={20} color={"black"} />
    </View>
  )
}