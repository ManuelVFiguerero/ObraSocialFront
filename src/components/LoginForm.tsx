import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Switch, Image
} from 'react-native';
import Logo from '../assets/MainLogo.png'
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();
  return (
    <View style={styles.formContainer}>
      <View style={styles.logoRow}>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.instructionText}>
          Completa los campos solicitados para iniciar sesión
        </Text>
      </View>

      <TextInput
  style={styles.input}
  placeholder="Usuario*"
  placeholderTextColor="#666"
/>

<View style={styles.passwordContainer}>
  <TextInput
    style={[styles.input, { flex: 1 }]}
    placeholder="Contraseña*"
    placeholderTextColor="#666"
    secureTextEntry={!isPasswordVisible}
  />
  <Switch
    value={isPasswordVisible}
    onValueChange={() => setIsPasswordVisible(!isPasswordVisible)}
  />
</View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.recoveryLink}
        onPress={() => navigation.navigate('Recovery')}
      >
        <Text style={styles.recoveryText}>🔑 Recuperar usuario/contraseña</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('Register')} 
      >
        <Text style={styles.secondaryText}>👤 Crear nuevo usuario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 28,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    marginTop: -40,
    zIndex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 15,
  },
  logo: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  instructionText: {
    color: '#1A237E',
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
  },
  label: {
    alignSelf: 'flex-start',
    color: '#444',
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1.5,
    borderColor: '#aaa',
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1A237E',
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  secondaryButton: {
    marginTop: 12,
    backgroundColor: '#5C6BC0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  secondaryText: {
    color: 'white',
    fontSize: 15,
  },
    recoveryLink: {
    marginTop: 20,
  },
  recoveryText: {
    color: '#5C6BC0',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default LoginForm;

