import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, Button } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { images, icons } from '@/constants';
import MedicationCard from '@/components/medicationCard';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
const Home: React.FC = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [boxHeight, setBoxHeight] = useState(400)

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <View style={styles.container}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: useWindowDimensions().width,
        paddingVertical: 40,
        zIndex: -1
      }}>
        <Text style={styles.title}>Welcome {firstName} {lastName}!</Text>
        <Image
        source={images.cat}
        />
      </View>


      {/* <ScrollView contentContainerStyle={{ width: useWindowDimensions().width }}> */}
      <BottomSheet ref={bottomSheetRef} snapPoints={['50%', '90%']} handleStyle={{backgroundColor: '#46d6cf', borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
        <BottomSheetScrollView
          style= {{
            backgroundColor: '#46d6cf',
          }}
          
          contentContainerStyle={{
            alignItems: 'center'
          }}
        >
            <MedicationCard
              time="08:00 AM"
              dose="2 Pills (10 mg)"
              note="Take before eating"
              name="Vitamin B12"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
            <MedicationCard
              time="12:00 AM"
              dose="1 Puff of inhaler"
              note=""
              name="Albuterol"
            />
        </BottomSheetScrollView>
      </BottomSheet>

      {/*  */}
      {/* </ScrollView> */}
      </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
  },

  cardContainer: {
    
  }
});

export default Home;
