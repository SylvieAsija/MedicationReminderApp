import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { images } from '@/constants';
import MedicationCard from '@/components/medicationCard';
import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import MedicationProgress from '@/components/medicationProgress';
import { LinearGradient } from 'expo-linear-gradient';

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

  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <LinearGradient
      colors={['#46D6CF', '#4CA3E2', '#46D6CF', '#4CA3E2']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
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

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', '90%']}
        handleIndicatorStyle={{display: 'none'}}
        backgroundComponent={null}
        >
        <BottomSheetView
          style={{
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50
          }}
        >
          <MedicationProgress xp={2} maxExp={3} />
        </BottomSheetView>
        <BottomSheetScrollView
          style= {{
            backgroundColor: '#F5F5F5',
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
        </BottomSheetScrollView>
      </BottomSheet>
    </LinearGradient> 
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
