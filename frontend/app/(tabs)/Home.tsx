import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants'
import MedicationCard from '@/components/medicationCard';

const Home: React.FC = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    const getName = async () => {
      try {
        const token = await SecureStore.getItemAsync('access_token');
        if (!token) {
          setFirstName('Unknown');
          setLastName('User');
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
        setFirstName('Unknown');
        setLastName(' ');
        console.log('Error fetching name data: ', error)
      }
    };

    getName();
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View style={styles.view}>
          <Text style={styles.title}>Welcome {firstName} {lastName}!</Text>
          <Image
          source={images.cat}
          />
        </View>
        <MedicationCard></MedicationCard>
      </ScrollView>
    </SafeAreaView>
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
  view: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4
  }
});

export default Home;
