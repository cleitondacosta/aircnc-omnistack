import React, { useState } from 'react';
import { 
  SafeAreaView, 
  Text,
  TextInput,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';

import api from '../../services/api';

export default function Book({ navigation }) {
  const [bookDate, setBookDate] = useState('');
  const id = navigation.getParam('id');

  async function handleBooking() {
    const user_id = await AsyncStorage.getItem('user');

    await api.post(`/spot/${id}/booking`, 
      { date: bookDate }, { headers: { user_id }
    });

    Alert.alert('Book request sended.');
    navigation.navigate('Spot');
  }

  function handleCancel() {
    navigation.navigate('Spot');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Date: *</Text>
      <TextInput 
        style={styles.input}
        placeholder="Which date you want to book?"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={bookDate}
        onChangeText={text => setBookDate(text)}
      />

      <TouchableOpacity 
        style={styles.button}
        onPress={handleBooking}
      >
        <Text style={styles.buttonText}>
          Request book
        </Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[ styles.button, styles.cancelButton ]}
        onPress={handleCancel}
      >
        <Text style={styles.buttonText}>
          Cancel
        </Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
    marginTop: 30,
  },
  form: {
    alignSelf: 'stretch',
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#444',
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
