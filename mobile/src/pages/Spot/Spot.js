import React, { useState, useEffect } from 'react';
import { 
  SafeAreaView, 
  Alert,
  ScrollView,
  Text, 
  AsyncStorage,
  Image,
  StyleSheet
} from 'react-native';
import socketIOClient from 'socket.io-client';

import logo from '../../assets/logo.png';

import SpotList from '../../components/SpotList';

export default function Spot() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketIOClient(
        'http://10.0.0.14:3333',
        { query: { user_id } }
      );

      socket.on('booking response', booking => {
        Alert.alert(
          `${booking.spot.company}`,
          `${booking.approved ? "Accepted" : "Rejected"}`
        );
      });
    });

  }, []);

  useEffect(() => {
    async function initTechs() {
      const storageTechs = await AsyncStorage.getItem('techs');

      if(storageTechs) {
        const techsArray = storageTechs.split(',').map(
          tech => tech.trim()
        );

        setTechs(techsArray);
      }
    }

    initTechs();
  }, []);

  function renderSpots() {
    return techs.map(tech => {
      return (
        <SpotList tech={tech} />
      );
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <ScrollView>
        {renderSpots()}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    height: 32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  }
});
