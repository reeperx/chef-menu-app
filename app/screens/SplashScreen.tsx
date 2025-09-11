import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/utils/Colors'
import { StatusBar } from 'expo-status-bar'

export default function SplashScreen() {
  return (
    <View 
    style={{
        backgroundColor:Colors.primary,
        // make the whole section take the entire color
        flex: 1
    }}
    >
      <StatusBar style='light' />
    </View>
  )
}

