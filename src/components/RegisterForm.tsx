import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Switch
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { API_BASE_URL } from '@env';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

  const allFilled =
    !!name && !!surname && !!homeAddress && !!phoneNumber &&
    !!username && !!email && !!password && !!passwordConfirm;

  const handleRegister = async () => {
    if (!allFilled) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    else if (password !== passwordConfirm) {
      return Alert.alert('Error', 'Las contraseñas deben coincidir');
    } else {
      setLoading(true);
    }

    // Construyo la URL completa para debug, evitando doble "/api"
    const base = API_BASE_URL.replace(/\/$/, '');
    const endpoint = base.endsWith('/api')
      ? `${base}/auth/register`
      : `${base}/api/auth/register`;
    console.log('Registrando en:', endpoint);

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          surname,
          home_address: homeAddress,
          phone_number: phoneNumber,
          username,
          email,
          password,
        }),
      });

      let data = null;
      let text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (jsonErr) {
        console.error('Respuesta no es JSON:', text);
        data = {};
      }

      if (!res.ok) {
        console.error('Respuesta completa del backend:', data, text);
        throw new Error(data.message || `Error ${res.status}`);
      }

      if (data.access_token) {
        Toast.show({ type: 'success', text1: 'Registro exitoso' });
        navigation.navigate('Login');
      } else {
        throw new Error('No recibimos token de registro');
      }
    } catch (err: any) {
      console.warn('Error en registro:', err);
      Alert.alert('Error', err.message || 'Falló el registro');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View
      style={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.welcome}>¡Hola!</Text>
        <Text style={styles.subtitle}>Te damos la bienvenida</Text>
        <Text style={styles.instructions}>
          Para registrarte, completa todos los campos.
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.inputscontainer}>
        {/* Otros campos */}
        {[
          { placeholder: 'Nombre*', value: name, setter: setName },
          { placeholder: 'Apellido*', value: surname, setter: setSurname },
          { placeholder: 'Dirección*', value: homeAddress, setter: setHomeAddress },
          { placeholder: 'Teléfono*', value: phoneNumber, setter: setPhoneNumber, keyboard: 'phone-pad' },
          { placeholder: 'Usuario*', value: username, setter: setUsername, autoCap: 'none' },
          { placeholder: 'Email*', value: email, setter: setEmail, keyboard: 'email-address', autoCap: 'none' },
        ].map((field, i) => (
          <TextInput
            key={i}
            style={styles.input}
            placeholder={field.placeholder}
            placeholderTextColor="#999"
            value={field.value}
            onChangeText={field.setter}
            keyboardType={field.keyboard as any}
            autoCapitalize={field.autoCap as any}
          />
        ))}

        {/* Contraseña */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Contraseña*"
            placeholderTextColor="#999"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <Switch
            value={isPasswordVisible}
            onValueChange={setIsPasswordVisible}
          />
        </View>

        {/* Confirmar contraseña */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirmar contraseña*"
            placeholderTextColor="#999"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry={!isPasswordVisible2}
          />
          <Switch
            value={isPasswordVisible2}
            onValueChange={setIsPasswordVisible2}
          />
        </View>

      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            (!allFilled || loading) && styles.buttonDisabled,
          ]}
          onPress={handleRegister}
          disabled={!allFilled || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Registrarse</Text>
          }
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginLink}>¿Ya tenés cuenta? Iniciar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  scrollContent: {
    paddingVertical: 10,
    width: '100%',
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    borderColor: '#666',
    borderWidth: 1,
    marginTop: 180,
    maxHeight:600, 
    //paddingBottom: 200,
    elevation: 6
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  welcome: {
    fontSize: 28,
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
    marginTop: 4,
  },
  instructions: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#1226A9',
    textAlign: 'center',
    marginTop: 6,
  },
  inputscontainer: {
    paddingHorizontal: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',

  },
  buttons: {
    width: '100%',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#1226A9',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
    width: '80%'
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
  loginLink: {
    textAlign: 'center',
    color: '#2D43B3',
    fontFamily: 'Inter_400Regular',
    marginTop: 12,
    marginBottom: 20,
  },
});
