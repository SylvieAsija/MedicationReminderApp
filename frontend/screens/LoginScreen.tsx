// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginButtonToggle from '@/components/loginSignupToggle';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);

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

    const handleToggle = (isLogin: boolean) => {
        setIsLogin(isLogin);
        if (!isLogin)
            navigation.navigate('Signup');
    }

    return (
        <View style={styles.container}>
                <Text style={styles.title}>Get Started Now</Text>
                <Text style={styles.description}>Create an account or log in to use DoseUp</Text>
                <View style={styles.buttonContainer}>
                    <LoginButtonToggle isLogin={isLogin} setIsLogin={handleToggle} /> 
                </View>
            <View>
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
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 24,
        marginBottom: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 50,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    button: {
        alignSelf: 'center',
        borderRadius: 6,
    }
});

export default LoginScreen;