import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyAppointments = () => {
  return (
    <View style={styles.container}>
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
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default MyAppointments;
