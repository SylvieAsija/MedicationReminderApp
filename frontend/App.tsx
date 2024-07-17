import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

const app = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='LoginPage' component={LoginScreen} />
                <Stack.Screen name='HomePage' component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};