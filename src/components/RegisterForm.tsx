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
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
// Asegúrate de que tu .env define:
// API_URL=https://ms-spring-security-jwt-latest-3.onrender.com
import { API_URL } from '@env';

const RegisterForm: React.FC = () => {
  const [name, setName]               = useState('');
  const [surname, setSurname]         = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername]       = useState('');
  const [email, setEmail]             = useState('');
  const [password, setPassword]       = useState('');
  const [loading, setLoading]         = useState(false);
  const navigation = useNavigation();

  const allFilled =
    !!name && !!surname && !!homeAddress && !!phoneNumber &&
    !!username && !!email && !!password;

  const handleRegister = async () => {
    if (!allFilled) {
      return Alert.alert('Error', 'Todos los campos son obligatorios');
    }
    setLoading(true);

    // Construyo la URL completa para debug, evitando doble "/api"
    const base = API_URL.replace(/\/$/, '');
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

      const data = await res.json();

      if (!res.ok) {
        // asumo que el backend devuelve { message: "..." } en errores
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
    <View style={styles.wrapper}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.welcome}>¡Hola!</Text>
          <Text style={styles.subtitle}>Te damos la bienvenida</Text>
          <Text style={styles.instructions}>
            Para registrarte, completa todos los campos.
          </Text>
        </View>

        {[
          { placeholder: 'Nombre*',    value: name,        setter: setName },
          { placeholder: 'Apellido*',  value: surname,     setter: setSurname },
          { placeholder: 'Dirección*', value: homeAddress, setter: setHomeAddress },
          { placeholder: 'Teléfono*',  value: phoneNumber, setter: setPhoneNumber, keyboard: 'phone-pad' },
          { placeholder: 'Usuario*',   value: username,    setter: setUsername,    autoCap: 'none' },
          { placeholder: 'Email*',     value: email,       setter: setEmail,       keyboard: 'email-address', autoCap: 'none' },
          { placeholder: 'Contraseña*',value: password,    setter: setPassword,    secure: true },
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
            secureTextEntry={field.secure}
          />
        ))}
      </ScrollView>

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
  );
};

export default RegisterForm;

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
  },
  scrollContent: {
    paddingVertical: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop:150,
    // si quieres levantar un poco el "¡Hola!"
    // puedes ajustar marginTop aquí
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
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
  button: {
    backgroundColor: '#1226A9',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 20,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
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