import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header fijo con título */}
      <Header title="Registrarse" />

      {/* Contenedor principal fijo */}
      <View style={styles.container}>
        <RegisterForm />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});

export default RegisterScreen;