import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UserDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hola, Manuel!</Text>
      <View style={styles.infoBox}>
        <Text style={styles.name}>MANUEL VICENTE FIGUEROERO</Text>
        <Text style={styles.dni}>20 448123 9 21</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4D6EC5',
    padding: 20,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    marginBottom: 30,
    alignItems: 'center',
  },
  greeting: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoBox: {
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 18,
  },
  dni: {
    color: '#fff',
    fontSize: 16,
  },
});

export default UserDetails;
