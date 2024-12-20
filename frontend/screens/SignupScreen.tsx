// SignupScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginButtonToggle from '@/components/loginSignupToggle';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Extra: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const LoginScreen: React.FC<Props> = ({ navigation }) => {

    let [fonts] = useFonts({Inter_500Medium, Inter_600SemiBold, Inter_700Bold, PlusJakartaSans_500Medium});

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const handleSignUp = async () => {
        try {
            const response = await axios.post('http://192.168.2.14:8000/signup/', { 
                email: email,
                password: password,
                passwordConfirm: passwordConfirm,
            });
            console.log(response.data);

            const { access, refresh, moreInfo } = response.data;
            console.log(access, response);
            try {
                await SecureStore.setItem('accessToken', access);
                await SecureStore.setItem('refreshToken', refresh);

                if (moreInfo == 'true') {
                    navigation.navigate('Extra');
                } else {
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.error('Error setting tokens: ', error);
                Alert.alert('Storage error');
            }

        } catch (error) {
            console.error('Error handling response: ', error);
            Alert.alert('Login Failed', 'Invalid email or password or password confirm');
        }
    };

    const handleButtonToggle = (isLogin: boolean) => {
        if (isLogin)
          navigation.navigate('Login');
        if (!isLogin)
          navigation.navigate('Signup')
    }

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
    };

    const handlePasswordConfirmToggle = () => {
      setShowPasswordConfirm(!showPasswordConfirm);
  };

    if (!fonts) 
        return <View></View>
    else {
        return (
            <View style={styles.container}>
                <Image source={require('@/assets/images/pill_logo.png')} 
                style={{width: 100, height: 100, alignSelf: 'center'}}/>
                <Text style={styles.title}>Signup Placeholder</Text>
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
                        <View style={styles.passwordContainer}>
                        <TextInput 
                                secureTextEntry={!showPasswordConfirm}  
                                value={passwordConfirm}
                                onChangeText={setPasswordConfirm}
                                style={styles.input}
                                placeholder='Confirm Password'
                            />                            
                            <TouchableOpacity onPress={handlePasswordConfirmToggle} style={styles.iconContainer}>
                                <MaterialCommunityIcons
                                    name={showPasswordConfirm ? 'eye' : 'eye-off'}
                                    size={20}
                                    color='#AAAAAA'
                                    style={styles.icon}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <LinearGradient colors={['#50E3C2', '#46D6CF']} style={styles.button}>
                        <TouchableOpacity onPress={handleSignUp} >
                                <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>                        
                    </LinearGradient>
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
        color: '#333333'
    },
    description: {
        fontSize: 12,
        textAlign: 'center',
        fontFamily: 'Inter_500Medium',
        marginBottom: 10,
        color: '#333333'
    },
    buttonContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 6,
        marginBottom: 50,
        width: '100%',
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
        borderRadius: 10,
        width: '95%',
        height: '20%',
        marginTop: 10,
        shadowColor: '#782EEE',
        shadowOpacity: 48,
        shadowRadius: 1,
        borderColor: '#FFFFFF',
        borderWidth: 1,
    },
    buttonText: {
        alignSelf: 'center',
        fontFamily: 'Inter_600SemiBold',
        fontSize: 14,
        color: '#FFFFFF',
    },
    icon: {
        paddingBottom: 5
    },
});

export default LoginScreen;