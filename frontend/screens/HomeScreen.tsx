import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const HomeScreen = () => {
  return (
    <View>
          <Text>HomeScreen</Text>
          <Link href="/Home">Go To Home</Link>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})