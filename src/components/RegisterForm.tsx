import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const navigation = useNavigation();

  const allFilled =
    !!name && !!surname && !!homeAddress && !!phoneNumber &&
    !!username && !!email && !!password && !!passwordConfirm;

const handleRegister = async () => {
  if (!allFilled) {
    return Toast.show({
      type: 'error',
      text1: 'Campos obligatorios',
      text2: 'Completá todos los campos.',
    });
  }

  if (password !== passwordConfirm) {
    return Toast.show({
      type: 'error',
      text1: 'Contraseñas no coinciden',
      text2: 'Verificá que ambas contraseñas sean iguales.',
    });
  }

  setLoading(true);

  const base = API_BASE_URL.replace(/\/$/, '');
  const endpoint = base.endsWith('/api')
    ? `${base}/auth/register`
    : `${base}/api/auth/register`;

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

    const data = await res.json(); // ✅ usar directamente json()
console.log('📦 Respuesta del backend:', data);
    if (!res.ok) {
      const msg = data?.message?.toLowerCase?.() || '';

      if (msg.includes('usuario')) {
        Toast.show({
          type: 'error',
          text1: 'Usuario en uso',
          text2: data.message,
        });
      } else if (msg.includes('email') || msg.includes('correo')) {
        Toast.show({
          type: 'error',
          text1: 'Email ya registrado',
          text2: data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error en el registro',
          text2: data.message || `Error ${res.status}`,
        });
      }

      return;
    }

    // ✅ Registro exitoso
    if (data.access_token) {
      Toast.show({
        type: 'success',
        text1: 'Registro exitoso',
        text2: 'Podés iniciar sesión ahora.',
      });
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se recibió token del servidor.',
      });
    }

  } catch (err: any) {
    console.error('Error en registro:', err);
    Toast.show({
      type: 'error',
      text1: 'Error de red',
      text2: err.message || 'No se pudo conectar al servidor.',
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.welcome}>¡Hola!</Text>
        <Text style={styles.subtitle}>Te damos la bienvenida</Text>
        <Text style={styles.instructions}>
          Para registrarte, completa todos los campos.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.inputscontainer} showsVerticalScrollIndicator={false}>
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
          style={[styles.button, (!allFilled || loading) && styles.buttonDisabled]}
          onPress={handleRegister}
          disabled={!allFilled || loading}
        >
          {loading
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.buttonText}>Registrarse</Text>}
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
