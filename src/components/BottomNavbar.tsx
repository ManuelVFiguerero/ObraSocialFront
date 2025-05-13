import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const BottomNavBar = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Inicio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Mi perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Credenciales</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navText}>Notificaciones</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#4D6EC5',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  navItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default BottomNavBar;
