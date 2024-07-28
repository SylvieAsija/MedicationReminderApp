import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import ProgressBar from '@/edited_packages/progressBar';

type progressProps = {
    xp: number;
    maxExp: number;
};

const MedicationProgress = (props: progressProps) => {
    const percentage =  props.xp/props.maxExp;

    return (
        <View style={styles.container}>
            
            <ProgressBar maxVal={props.maxExp} userVal={props.xp}>

            </ProgressBar>
        </View>
    )
}

export default MedicationProgress

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    
})