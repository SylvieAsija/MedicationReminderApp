// App.tsx
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/screens/LoginScreen';
import SignupScreen from '@/screens/SignupScreen';
import HomePage from '@/screens/HomePage';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
            <Stack.Screen name='Home' component={HomePage} />
        </Stack.Navigator>
    );
};

export default App;