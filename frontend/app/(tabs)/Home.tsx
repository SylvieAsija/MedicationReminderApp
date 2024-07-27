import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, useWindowDimensions, Animated } from 'react-native';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { images } from '@/constants';
import MedicationCard from '@/components/medicationCard';
import AnimatedHeader from '@/components/animatedHeader';

const Home: React.FC = () => {
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const offset = useRef(new Animated.Value(0)).current;

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
    <View style={{ flex: 1, backgroundColor: 'red', alignItems: 'center' }}>
      <AnimatedHeader animatedValue={offset}/>
    </View>
  );
};

//   return (
//     <View style={styles.container}>
//         <View style={{
//           justifyContent: 'center',
//           alignItems: 'center',
//           width: useWindowDimensions().width,
//           paddingVertical: 40
//         }}>
//           <Text style={styles.title}>Welcome {firstName} {lastName}!</Text>
//           <Image
//           source={images.cat}
//           />
//         </View>


//           <ScrollView contentContainerStyle={{ height: useWindowDimensions().height, width: useWindowDimensions().width }}>

//         <View style={{
//           width: useWindowDimensions().width,
//           backgroundColor: '#46d6cf',
//           paddingTop: 70,
//           alignItems: 'center',
//           borderTopStartRadius: 50,
//           borderTopEndRadius: 50
//         }}>
//           <MedicationCard
//             time="08:00 AM"
//             dose="2 Pills (10 mg)"
//             note="Take before eating"
//             name="Vitamin B12"
//           />
//           <MedicationCard
//             time="12:00 AM"
//             dose="1 Puff of inhaler"
//             note=""
//             name="Albuterol"
//           />
//         </View>
//       </ScrollView>
//       </View>
        
//   );
// };

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
