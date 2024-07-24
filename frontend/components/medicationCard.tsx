import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const MedicationCard = () => {
  return (
    <View>
        <TouchableOpacity style={styles.card}>
            <Text>Button</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#BFBFBF',
        borderRadius: 5,
        minHeight: 62,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default MedicationCard