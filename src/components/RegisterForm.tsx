import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';


//TODO: La contraseña tendría que tener un botón para poder verla, al igual que como pasa en el Login
const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.formContainer}>
      
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeText}>¡Hola!</Text>
        <Text style={styles.subtitle}>Te damos la bienvenida</Text>
        <Text style={styles.instructions}>
        Para registrarte, es necesario que completes los campos solicitados.
        </Text>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Usuario*"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email*"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Contraseña*"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>¿Ya tenés cuenta? Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    padding: 28,
    width: '90%',
    maxWidth: 350,
    maxHeight: '70%',
    flex: 1,  
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 6,
    marginTop: 40,
    flexDirection: 'column'
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
    width: '100%',
  },
  welcomeText: {
    fontSize: 28,  
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
  },
  subtitle: {
    fontSize: 18,  
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
    marginBottom: 15
  },
  instructionsContainer: {
    width: '100%',
    marginBottom: 25,
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1226A9',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  registerButton: {
    backgroundColor: '#1226A9',
    padding: 18,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  loginLink: {
    color: '#2D43B3',
    fontFamily: 'Inter_400Regular',
    marginTop: 5,
    fontSize: 16,
  },
});

export default RegisterForm;
