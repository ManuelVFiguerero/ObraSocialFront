import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Switch, Image
} from 'react-native';
import Logo from '../assets/MainLogo.png';  // Asegúrate de que esta imagen esté optimizada para un tamaño mayor
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types'; 

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const LoginForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = () => {
    // Aquí se navega a la pantalla "Home" al presionar el botón
    navigation.navigate('Home');
  };

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

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Iniciar sesión</Text>
      </TouchableOpacity>

      {/* Botón de recuperación de contraseña */}
      <TouchableOpacity 
        style={styles.recoveryButton}
        onPress={() => navigation.navigate('RecoveryPassword')}
      >
        <Text style={styles.recoveryText}>🔑 Recuperar usuario</Text>
      </TouchableOpacity>

      {/* Botón para crear un nuevo usuario */}
      <TouchableOpacity 
        style={styles.recoveryButton}
        onPress={() => navigation.navigate('Register')} 
      >
        <Text style={styles.recoveryText}>👤 Crear nuevo usuario</Text>
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
    maxWidth: 350,
    flex: 1,  // Esto hará que el formulario ocupe más espacio en la pantalla
    justifyContent: 'center', // Asegura que el contenido esté centrado verticalmente
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 6,
    marginTop: 40,  // Asegura que el formulario no esté pegado al top
    zIndex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    gap: 20,  // Se incrementó el espacio entre el logo y el texto
  },
  logo: {
    width: 120,  // Aumenté el tamaño de la imagen
    height: 120,
    borderRadius: 60,
  },
  instructionText: {
    color: '#1A237E',
    fontWeight: 'bold',
    fontSize: 22,  // Aumento el tamaño del texto de la instrucción
    flex: 1,
    flexWrap: 'wrap',
    textAlign: 'center',  // Centrado del texto
    marginBottom: 20,  // Aumento el margen inferior para que no esté pegado al logo
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#aaa',
    paddingVertical: 12,  // Aumento el padding vertical para que el campo sea más grande
    marginBottom: 16,  // Aumento el espacio entre los campos
    fontSize: 18,  // Aumento el tamaño de la fuente
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1A237E',
    paddingVertical: 16,  // Aumento el padding para hacerlo más grande
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,  // Aumento el tamaño del texto
  },
  recoveryButton: {
    marginTop: 16,  // Aumento el espacio entre los botones
    backgroundColor: '#5C6BC0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,  // Hago los botones más grandes con bordes redondeados
    width: '80%',
    alignItems: 'center', 
    justifyContent: 'center',
  },
  recoveryText: {
    color: 'white',
    fontSize: 18,  // Aumento el tamaño del texto en los botones
  },
});

export default LoginForm;




