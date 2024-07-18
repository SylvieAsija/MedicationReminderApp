// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginButtonToggle from '@/components/loginSignupToggle';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans'

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    let [fonts] = useFonts({Inter_500Medium, Inter_600SemiBold, Inter_700Bold, PlusJakartaSans_500Medium});

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

    if (!fonts) 
        return <View></View>
    else {
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
                    <TouchableOpacity style={styles.button} onPress={handleLogin} >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#FFFFFF'
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
        marginTop: 20,
        fontFamily: 'Inter_700Bold',
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
        marginBottom: 10,
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
        borderRadius: 5
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#46D6CF',
        width: '100%',
        height: '20%'
    },
    buttonText: {
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: '#FFFFFF'
    },
    label: {
        alignSelf: 'baseline',
        fontFamily: 'PlusJakartaSans_500Medium',
        fontSize: 12
    }
});

export default LoginScreen;