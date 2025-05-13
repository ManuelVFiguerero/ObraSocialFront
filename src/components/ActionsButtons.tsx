import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ActionButtons = () => {
  const buttons = [
    'Cargar obra social',
    'Historial médico',
    'Acerca de nosotros',
    'Reservar turnos',
    'Buscar por ubicación',
    'Contactanos',
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity key={index} style={styles.button}>
          <Text style={styles.buttonText}>{button}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#1A237E',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default ActionButtons;

