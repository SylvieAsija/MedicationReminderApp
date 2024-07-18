// LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginButtonToggle from '@/components/loginSignupToggle';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
    const [showPassword, setShowPassword] = useState(false);
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

    const handleButtonToggle = (isLogin: boolean) => {
        setIsLogin(isLogin);
        if (!isLogin)
            navigation.navigate('Signup');
    }

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    if (!fonts) 
        return <View></View>
    else {
        return (
            <View style={styles.container}>
                    <Text style={styles.title}>Get Started Now</Text>
                    <Text style={styles.description}>Create an account or log in to use DoseUp</Text>
                    <View style={styles.buttonContainer}>
                        <LoginButtonToggle isLogin={isLogin} setIsLogin={handleButtonToggle} /> 
                    </View>
                <View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter Email'
                            value={email}
                            onChangeText={setEmail}
                            keyboardType='email-address'
                            autoCapitalize='none'
                        />
                        <View style={styles.passwordContainer}>
                            <TextInput 
                                secureTextEntry={!showPassword}  
                                value={password}
                                onChangeText={setPassword}
                                style={styles.input}
                                placeholder='Enter Password'
                            />
                            <TouchableOpacity onPress={handlePasswordToggle} style={styles.iconContainer}>
                                <MaterialCommunityIcons
                                    name={showPassword ? 'eye' : 'eye-off'}
                                    size={20}
                                    color='#AAAAAA'
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

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
    inputContainer: {
        width: '100%',
        flexDirection: 'column',
        alignSelf: 'center',
        alignItems: 'baseline',
        paddingHorizontal: 10
        
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        height: 40,
        width: '100%',
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        borderRadius: 10,
        fontSize: 16,
        alignSelf: 'center',
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 10
    },
    button: {
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#46D6CF',
        width: '100%',
        height: '20%',
        marginTop: 10,
    },
    buttonText: {
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: '#FFFFFF'
    },
    icon: {
        paddingBottom: 5
    }
});

export default LoginScreen;