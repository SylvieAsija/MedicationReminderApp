// ExtraInfoScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Button } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoginButtonToggle from '@/components/loginSignupToggle';
import { useFonts, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Extra: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Extra'>;

const ExtraInfoScreen: React.FC<Props> = ({ navigation }) => {

    let [fonts] = useFonts({Inter_500Medium, Inter_600SemiBold, Inter_700Bold, PlusJakartaSans_500Medium});

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [birthdayShow, setBirthdayShow] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleAddedInfo = async () => {
        try {
            const token = await SecureStore.getItemAsync('access_token');
            if (!token) {
              console.error('No access token found');
              return;
            }
            console.log('token exists: ', token)
            const response = await axios.post('http://192.168.68.81:8000/user/extra/', { 
                first_name: firstName,
                last_name: lastName,
                birthday: birthday,
                phone_number: phoneNumber,

                headers: {
                    Authorization: `Bearer ${token}`
                  }
            });
            const valid = response.data
            console.log(valid);

            try {
                navigation.navigate('Home');
            } catch (error) {
                console.error('Error setting tokens: ', error);
                Alert.alert('Storage error');
            }

        } catch (error) {
            console.error('Error handling response: ', error);
            Alert.alert('Login Failed', 'Invalid email or password or password confirm');
        }
    };

    const handleDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate;
        setBirthdayShow(false)
        setBirthday(currentDate);
    }

    const handleShowBirthday = () => {
        setBirthdayShow(true)
    }


    if (!fonts) 
        return <View></View>
    else {
        return (
            <View style={styles.container}>
                <Image source={require('@/assets/images/pill_logo.png')} 
                style={{width: 100, height: 100, alignSelf: 'center'}}/>
                <Text style={styles.title}>Get Started</Text>
                <Text style={styles.description}>We just need some additional info</Text>
                <View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter First name'
                            value={firstName}
                            onChangeText={setFirstName}
                            autoCapitalize='none'
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter Last name'
                            value={lastName}
                            onChangeText={setLastName}
                            autoCapitalize='none'
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter Birthday YYYY-MM-DD'
                            value={birthday}
                            onChangeText={setBirthday}
                            autoCapitalize='none'
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder='Enter Phone Number'
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType='phone-pad'
                            />
                      </View>
                    <LinearGradient colors={['#50E3C2', '#46D6CF']} style={styles.button}>
                        <TouchableOpacity onPress={handleAddedInfo} >
                                <Text style={styles.buttonText}>Submit</Text>
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
        paddingHorizontal: 10,       
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

export default ExtraInfoScreen;