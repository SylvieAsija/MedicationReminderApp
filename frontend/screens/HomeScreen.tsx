import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const HomeScreen: React.FC = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const getName = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        if (!token) {
          console.error('No access token found');
          return;
        }
        console.log('token exists: ', token)
        const response = await axios.get('http://192.168.2.14:8000/user/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const { first_name, last_name } = response.data;
  
        setFirstName(first_name);
        setLastName(last_name);
        console.log(`Welcome ${first_name} ${last_name}`);
      } catch (error) {
        console.log('Error fetching name data: ', error)
      }
    };

    getName();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {firstName} {lastName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
  },
});

export default HomeScreen;
