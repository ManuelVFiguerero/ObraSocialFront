import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { MaterialIcons } from '@expo/vector-icons';

import { API_BASE_URL } from '@env';
import { useTheme } from '../contexts/ThemeContext';

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
  const { theme } = useTheme();
  const styles = createStyles(theme)

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
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, paddingBottom:10 }}>
      <View style={[styles.formContainer, { backgroundColor: theme.background, borderRadius: 16, padding: 16 }]}>
        <View style={styles.header}>
          <Text style={[styles.welcome, { color: theme.primary }]}>¡Hola!</Text>
          <Text style={[styles.subtitle, { color: theme.primary }]}>Te damos la bienvenida</Text>
          <Text style={[styles.instructions, { color: theme.primary }]}>
            Para registrarte, completa todos los campos.
          </Text>
        </View>
        <View style={styles.inputscontainer}>
          {[{
            label: 'Nombre*',
            value: name,
            setter: setName,
            icon: 'person-outline',
            keyboard: 'default',
            autoCap: 'words',
          }, {
            label: 'Apellido*',
            value: surname,
            setter: setSurname,
            icon: 'person-outline',
            keyboard: 'default',
            autoCap: 'words',
          }, {
            label: 'Dirección*',
            value: homeAddress,
            setter: setHomeAddress,
            icon: 'home',
            keyboard: 'default',
            autoCap: 'sentences',
          }, {
            label: 'Teléfono*',
            value: phoneNumber,
            setter: setPhoneNumber,
            icon: 'phone',
            keyboard: 'phone-pad',
            autoCap: 'none',
          }, {
            label: 'Usuario*',
            value: username,
            setter: setUsername,
            icon: 'account-circle',
            keyboard: 'default',
            autoCap: 'none',
          }, {
            label: 'Email*',
            value: email,
            setter: setEmail,
            icon: 'email',
            keyboard: 'email-address',
            autoCap: 'none',
          }].map((field, i) => (
            <View key={i} style={styles.inputFieldContainer}>
              <Text style={[styles.label, { color: theme.quaternary }]}>{field.label}</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[
                    styles.input,
                    { flex: 1, backgroundColor: theme.background, color: theme.quaternary, borderColor: theme.neutral, marginBottom: 0 },
                  ]}
                  placeholder={field.label}
                  placeholderTextColor={theme.neutral}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType={field.keyboard as any}
                  autoCapitalize={field.autoCap as any}
                />
                <MaterialIcons
                  name={field.icon as any}
                  size={22}
                  color={theme.neutral}
                  style={{ marginLeft: 4 }}
                />
              </View>
            </View>
          ))}

          <View style={styles.passwordFieldContainer}>
            <Text style={[styles.label, { color: theme.quaternary }]}>Contraseña*</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, backgroundColor: theme.input, color: theme.quaternary, borderColor: theme.neutral, marginBottom: 0 },
                ]}
                placeholder="Contraseña*"
                placeholderTextColor={theme.neutral}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible((v) => !v)}
                style={styles.iconButton}
              >
                <MaterialIcons
                  name={isPasswordVisible ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={theme.neutral}
                  style={{ marginLeft: 0 }}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirmar contraseña */}
          <View style={styles.passwordFieldContainer}>
            <Text style={[styles.label, { color: theme.text }]}>Confirmar contraseña*</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[
                  styles.input,
                  { flex: 1, backgroundColor: theme.input, color: theme.text, borderColor: theme.neutral, marginBottom: 0 },
                ]}
                placeholder="Confirmar contraseña*"
                placeholderTextColor={theme.placeholder}
                value={passwordConfirm}
                onChangeText={setPasswordConfirm}
                secureTextEntry={!isPasswordVisible2}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible2((v) => !v)}
                style={styles.iconButton}
              >
                <MaterialIcons
                  name={isPasswordVisible2 ? 'visibility' : 'visibility-off'}
                  size={22}
                  color={theme.neutral}
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>
            </View>
          </View>

        </View>
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
            <Text style={[styles.loginLink, { color: '#1226A9' }]}>¿Ya tenés cuenta? Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterForm;

const createStyles = (theme) => StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 24,
    borderRadius: 16,
    elevation: 6,
    marginTop: 180,
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
  inputFieldContainer: {
    width: '100%',
    marginBottom: 16,
  },
  passwordFieldContainer: {
    width: '100%',
    marginBottom: 16,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#E0E3ED',
    paddingRight: 8,
    marginBottom: 0,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
  },
  iconButton: {
    padding: 4,
    marginLeft: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
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

    fontFamily: 'Inter_400Regular',
    marginTop: 12,
    marginBottom: 20,
    fontSize: 16,
  },
});
