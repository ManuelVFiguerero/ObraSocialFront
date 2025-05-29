// src/components/LoginForm.tsx
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

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

const API_URL = 'https://ms-spring-security-jwt-latest-3.onrender.com/api/auth/login';

const LoginForm: React.FC = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!user.trim() || !pass) {
      return Alert.alert('Error', 'Usuario y contraseña son obligatorios');
    }
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user, password: pass }),
      });
      const body = await res.json();
      if (res.ok && body.access_token) {
        // Guardamos el token para futuras peticiones
        await AsyncStorage.setItem('accessToken', body.access_token);
        navigation.navigate('Home');
      } else {
        Alert.alert('Login fallido', body.message || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No pudo conectarse al servidor');
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity
        style={styles.recoveryButton}
        onPress={() => navigation.navigate('RecoveryPassword')}
      >
        <Text style={styles.recoveryText}>Recuperar usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.recoveryButton}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.recoveryText}>Crear nuevo usuario</Text>
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
    alignItems: 'flex-start',
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
  recoveryButton: {
    marginTop: 16,
    backgroundColor: '#2D43B3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recoveryText: {
    color: '#F3F4F8',
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    textAlign: 'center',
  },
});

export default LoginForm;




