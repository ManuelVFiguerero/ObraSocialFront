// src/screens/LoginScreen.tsx
import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';

const LoginScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Header title="Iniciar sesión" />

      {/* Contenedor centrado para el formulario */}
      <View style={styles.formWrapper}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  formWrapper: {
    flex: 1,                   // ocupa todo el espacio restante
    justifyContent: 'center',  // centra verticalmente
    alignItems: 'center',      // centra horizontalmente
    paddingHorizontal: 20,     // un poco de padding lateral
  },
});

export default LoginScreen;





