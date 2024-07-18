import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

const LoginButtonToggle: React.FC<Props> = ({ isLogin, setIsLogin }) => {

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={[styles.button, isLogin && styles.active]}
                onPress={() => setIsLogin(true)}
                >
                <Text style={[styles.buttonText, isLogin && styles.activeButtonText]}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, !isLogin && styles.active]}
                onPress={() => setIsLogin(false)}
                >
                <Text style={[styles.buttonText, !isLogin && styles.activeButtonText]}>Signup</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create ({
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F6F9'
    },
    button: {
        textAlign: 'center',
        backgroundColor: '#F5F6F9',
        flex: 2,
        marginBottom: 5,
        marginTop: 5,
        marginLeft: 5,
    },
    active: {
        backgroundColor: '#FFFFFF',
    },
    buttonText: {
        color: '#989898',
        alignSelf: 'center'
    },
    activeButtonText: {
        color: '#333333',
    },
})

export default LoginButtonToggle;