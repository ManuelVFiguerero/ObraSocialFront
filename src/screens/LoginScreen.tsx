import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const LoginScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    position: 'relative',  // Esto permite que los elementos se superpongan
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 60, // Usamos un valor negativo para hacer que el formulario "pise" el header
    zIndex: 1, // Asegura que el formulario quede sobre el header
  },
});

export default LoginScreen;



