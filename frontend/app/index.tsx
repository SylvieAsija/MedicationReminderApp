// index.tsx
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@/app/(tabs)/LoginScreen';
import SignupScreen from '@/app/(tabs)/SignupScreen';
import HomeScreen from '@/app/(tabs)/HomeScreen';
import ExtraInfoScreen from '@/app/(tabs)/ExtraInfoScreen';
import { store } from '@/store';
import { Provider } from 'react-redux';

type RootStackParamList = {
    Login: undefined;
    Signup: undefined;
    Home: undefined;
    Extra: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
    return (
    <Provider store={store}>
        <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Signup' component={SignupScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Extra' component={ExtraInfoScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </Provider>
    );
};

export default App;