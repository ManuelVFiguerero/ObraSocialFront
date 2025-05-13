import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import RecoveryForm from '../components/RecoveryForm';
import Header from '../components/Header';  // Importamos el Header

const RecoveryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Recuperación de datos" />  {/* Usamos el Header con un título personalizado */}
      <View style={styles.formContainer}>
        <RecoveryForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',  // Esto permite que el header se superponga
  },
  formContainer: {
    flex: 1,
    marginTop: 150,  // Mueve el formulario hacia abajo, debajo del header
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default RecoveryScreen;


