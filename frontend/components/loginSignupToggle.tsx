import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFonts, Inter_500Medium } from "@expo-google-fonts/inter";

interface Props {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const LoginButtonToggle: React.FC<Props> = ({ isLogin, setIsLogin }) => {

    let [fonts] = useFonts({Inter_500Medium});

    if (!fonts) 
        return <View></View>
    else {
        return (
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, styles.left, isLogin && styles.active]}
                    onPress={() => setIsLogin(true)}
                    >
                    <Text style={[styles.buttonText, isLogin && styles.activeButtonText]}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.right, !isLogin && styles.active]}
                    onPress={() => setIsLogin(false)}
                    >
                    <Text style={[styles.buttonText, !isLogin && styles.activeButtonText]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
};

const styles = StyleSheet.create ({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 5,
    },
    button: {
        textAlign: 'center',
        backgroundColor: '#F5F5F5',
        flex: 2,
        marginBottom: 5,
        marginTop: 5,
        borderRadius: 5,
    },
    left: {
        marginLeft: 5,
    },
    right: {
        marginRight: 5,
    },
    active: {
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        color: '#989898',
        alignSelf: 'center',
        fontFamily: 'Inter_500Medium'
    },
    activeButtonText: {
        color: '#333333',
    },
})

export default LoginButtonToggle;