// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://192.168.2.14:8000/api/token/', { 
                username: email,
                password: password,
            });
            console.log(response.data);

            const { access, refresh } = response.data;
            try {
                await SecureStore.setItem('accessToken', access);
                await SecureStore.setItem('refreshToken', refresh);
    
                navigation.navigate('Home');
            } catch (error) {
                console.error('Error setting tokens: ', error);
                Alert.alert('Storage error');
            }

        } catch (error) {
            console.error('Error handling response: ', error);
            Alert.alert('Login Failed', 'Invalid email or password');
        }
    };

    const navSignup = () => {
        navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Get Started Now</Text>
            <Button title='Signup' onPress={navSignup} />
            <TextInput 
                style={styles.input}
                placeholder='email'
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                autoCapitalize='none'
            />
            <TextInput 
                style={styles.input}
                placeholder='password'
                value={password}
                onChangeText={setPassword}
                secureTextEntry            
            />
            <Button title='Login' onPress={handleLogin} />
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
    button: {
        alignSelf: 'center',
    }
});

export default LoginScreen;