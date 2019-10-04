import React, { useState, useEffect } from 'react';
import { 
  Text, 
  TextInput,
  StyleSheet, 
  View, 
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import api from '../../services/api';

import logo from '../../assets/logo.png';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [techs, setTechs] = useState('');

  async function handleSubmit() {
    const response = await api.post('/user', { email });
    const { _id: id } = response.data;

    await AsyncStorage.setItem('user', id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('Spot');
  }

  return (
    <KeyboardAvoidingView 
      enabled={Platform.OS === 'ios'} 
      behavior="padding" 
      style={styles.container}
    >
      <Image source={logo} />

      <View style={styles.form}>
        <Text style={styles.label}>Your E-MAIL: *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Your best e-mail"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={text => setEmail(text)}
        />

        <Text style={styles.label}>Technologies: *</Text>
        <TextInput 
          style={styles.input}
          placeholder="Technologies of interest"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={text => setTechs(text)}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
