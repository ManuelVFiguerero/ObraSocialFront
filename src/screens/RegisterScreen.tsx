import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import RegisterForm from '../components/RegisterForm';
import BackgroundLayout from './BackgroundLayout';

const RegisterScreen = () => {
  return (
    <BackgroundLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Registrarse</Text>
          <RegisterForm />
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
    title: {
    fontSize: 28,
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold'
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default RegisterScreen;