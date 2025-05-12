import React from 'react';
import { View, StyleSheet } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import Header from '../components/Header';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Header title="Registrarse" />
      <View style={styles.formWrapper}>
        <RegisterForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  formWrapper: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;