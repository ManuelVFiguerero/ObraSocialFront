import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import LoginForm from '../components/LoginForm';
import Header from '../components/Header';
import BackgroundLayout from './BackgroundLayout';


const LoginScreen = () => {
  return (
      <BackgroundLayout>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Iniciar sesión</Text>
          <LoginForm />
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
  formContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoginScreen;



