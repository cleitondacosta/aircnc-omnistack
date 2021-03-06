import React, { useState, useEffect } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get('/spot', {
        params: { tech }
      });

      setSpots(response.data);
    }

    loadSpots();
  }, []);

  function handlePress(id) {
    navigation.navigate('Book', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Companies that uses
        <Text style={styles.bold}> {tech}</Text>
      </Text>

      <FlatList
        style={styles.list}
        data={spots}
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image 
              style={styles.thumbnail}
              source={{ uri: item.thumbnail_url }}
            />

            <Text style={styles.company}>
              {item.company}
            </Text>

            <Text style={styles.price}>
              {
                item.price
                ? `R$${item.price}/day`
                : 'FREE'
              }
            </Text>

            <TouchableOpacity 
              style={styles.button}
              onPress={() => handlePress(item._id)}
            >
              <Text style={styles.buttonText}>
                Request a book
              </Text>
            </TouchableOpacity>

          </View>
        )}
      />
    </View>
  );
}

export default withNavigation(SpotList);

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  title: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
  },
  list: {
    paddingHorizontal: 20,
  },
  listItem: {
    marginRight: 15,
  },
  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  company: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  price: {
    fontSize: 24,
    color: '#999',
    marginTop: 5,
  },
  button: {
    height: 32,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
