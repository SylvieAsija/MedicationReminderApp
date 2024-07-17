// App.tsx
import * as React from 'react';
//import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Signup from '../screens/SignUp';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
        //<NavigationContainer>
            <Stack.Navigator initialRouteName='Login'>
                <Stack.Screen name='Login' component={LoginScreen} />
                <Stack.Screen name='Signup' component={Signup} />
                <Stack.Screen name='Home' component={HomeScreen} />
            </Stack.Navigator>
        //</NavigationContainer>
    );
};

export default App;