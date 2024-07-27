import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

type medProps = {
    time: String;
    dose: String;
    note: String;
    name: String;
};

const MedicationCard = (props: medProps) => {
    return (
        <View style={{shadowColor: '#000000',
            shadowOffset: {
                height: 10,
                width: 10
            },
            shadowRadius: 30}}>
            <TouchableOpacity
                style={styles.card}
                onPress={() => { }}>
                <View style={styles.header}>
                    <View style={{ backgroundColor: '#F5F5F5', padding: 4, borderRadius: 10 }}><Text>{props.time}</Text></View>
                    <Text>{props.dose}</Text>
                    {props.note == "" ? "" : <Text> * {props.note}</Text>}
                </View>
                <Text style={styles.name}>{props.name}</Text>

            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        minHeight: 90,
        width: 350,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 15,
        margin: 10
    },
    header: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        gap: 3,
    },
    name: {
        flex: 1,
        fontSize: 22
    }
})

export default MedicationCard