import React from 'react';
import { View, StyleSheet } from 'react-native';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.formContainer}>
        <LoginForm />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    marginTop: -40, 
  },
});

export default LoginScreen;