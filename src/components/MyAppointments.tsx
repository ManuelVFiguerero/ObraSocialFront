import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyAppointments = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis turnos</Text>
      <Text style={styles.subtitle}>No hay turnos próximos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A237E',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyAppointments;
