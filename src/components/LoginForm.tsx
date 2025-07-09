import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../assets/icons/MainLogo.png';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import Toast from 'react-native-toast-message';
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

import { API_BASE_URL } from '@env';
const LOGIN_URL = `${API_BASE_URL}/api/auth/login`;


const LoginForm: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

const handleLogin = async () => {
  if (!user.trim() || !pass) {
    Toast.show({
      type: 'error',
      text1: 'Campos requeridos',
      text2: 'Usuario y contraseña son obligatorios',
    });
    return;
  }

  setLoading(true);

  try {
    const res = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user, password: pass }),
    });

    const body = await res.json();

    if (!res.ok) {
      if (res.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Credenciales inválidas',
          text2: 'Usuario o contraseña incorrectos.',
        });
      } else if (res.status === 500) {
        Toast.show({
          type: 'error',
          text1: 'Credenciales inválidas',
          text2: 'Ingrese datos validos.',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: body?.message || 'No se pudo iniciar sesión.',
        });
      }

      return;
    }

    // ✅ Login exitoso
    if (body.access_token) {
      await AsyncStorage.setItem('accessToken', body.access_token);
      await AsyncStorage.setItem('username', user);

      if (body.id) {
        await AsyncStorage.setItem('userId', String(body.id));
        console.log('💾 userId guardado en AsyncStorage:', body.id);
      } else {
        try {
          const profileRes = await fetch(`${API_BASE_URL}/users/get-user-by-username?username=${user}`, {
            headers: { 'Authorization': `Bearer ${body.access_token}` }
          });
          const profile = await profileRes.json();

          if (profile.id) {
            await AsyncStorage.setItem('userId', String(profile.id));
            console.log('💾 userId obtenido y guardado:', profile.id);
          }
        } catch (e) {
          console.warn('❗ No se pudo obtener el userId:', e);
        }
      }

      Toast.show({
        type: 'success',
        text1: 'Bienvenido',
        text2: `¡Hola, ${user}!`,
      });

      navigation.navigate('Home');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Error inesperado',
        text2: 'No se recibió un token de acceso',
      });
    }

  } catch (err) {
    console.error('❌ Error de red o conexión:', err);
    Toast.show({
      type: 'error',
      text1: 'Error de conexión',
      text2: 'No se pudo conectar con el servidor',
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.formContainer}>
      <View style={styles.logoRow}>
        <Image source={Logo} style={styles.logo} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Usuario*"
        placeholderTextColor="#666"
        value={user}
        onChangeText={setUser}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Contraseña*"
          placeholderTextColor="#666"
          secureTextEntry={!isPasswordVisible}
          value={pass}
          onChangeText={setPass}
        />
        <Switch
          value={isPasswordVisible}
          onValueChange={() => setIsPasswordVisible(v => !v)}
        />
      </View>

      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading
          ? <ActivityIndicator color="#F3F4F8" />
          : <Text style={styles.loginButtonText}>Iniciar sesión</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('RecoveryPassword')}>
          <Text style={styles.recoveryLink}>¿Olvidaste tu usuario? recuperar contrasena</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}>¿No tienes usuario? Crear nuevo usuario</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    gap: 20,
  },
  logo: {
    backgroundColor: '#000000',
    width: 80,
    height: 80,
    borderRadius: 60,
    elevation: 12
  },
  instructionText: {
    flex: 1,
    color: '#1226A9',
    fontSize: 18,
    fontFamily: 'Inter_700Bold',
    flexWrap: 'wrap',
    textAlign: 'center',
    width: '100%',
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#aaa',
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  loginButton: {
    backgroundColor: '#1226A9',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 20,
  },
  recoveryLink: {
    textAlign: 'center',
    color: '#2D43B3',
    fontFamily: 'Inter_400Regular',
    marginTop: 40,
    marginBottom: 20,
  },
  registerLink: {
    textAlign: 'center',
    color: '#2D43B3',
    fontFamily: 'Inter_400Regular',
    marginTop: 12,
    marginBottom: 20,
  },
});

export default LoginForm;