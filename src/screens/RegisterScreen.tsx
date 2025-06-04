import React from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import Header from '../components/Header';
import RegisterForm from '../components/RegisterForm';

const RegisterScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.screen}>
      {/* Header fijo en la parte superior */}

      {/* Contenedor principal fijo */}
      <View style={styles.container}>
        <RegisterForm />
      </View>
      <Header title="Registrarse" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8',
    width: '100%'
    
  },
  container: {
    flex: 1,
    paddingBottom:100,
    justifyContent: 'center',
    paddingHorizontal: 20,
    
    
  },
});

export default RegisterScreen;