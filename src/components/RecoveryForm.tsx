import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '@env';
import { useTheme } from '../theme/ThemeContext';

//TODO: Habría que mostrar un mensaje cuando el usuario de click a "Enviar"
const RecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useTheme();

  const handleSend = async () => {
    if (!email) {
      Toast.show({ type: 'error', text1: 'Debes ingresar un email' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/password-reset/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Toast.show({ type: 'success', text1: data.message });
        // Navegar a la pantalla de token, pasando el token (solo para debug, en prod se usa el mail)
        navigation.navigate('RecoveryToken', { email });
      } else {
        Toast.show({ type: 'error', text1: data.message || 'Error al solicitar recuperación' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error de red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.formContainer, { backgroundColor: theme.card, borderRadius: 16, padding: 16 }] }>
      <View style={styles.inputView}>
        <Text style={[styles.label, { color: theme.text }]}>Ingresa tu mail *</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.input, color: theme.text, borderColor: theme.border }]}
          placeholder="Email"
          placeholderTextColor={theme.placeholder}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.submitButton]}
            onPress={handleSend}
            disabled={loading}
          >
            <Text style={styles.buttonTextSubmit}>{loading ? 'Enviando...' : 'Enviar'}</Text>
          </TouchableOpacity>
        </View>
      </View>


      <TouchableOpacity 
        style={styles.backLink}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.backLinkText}>Volver a inicio de sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    maxWidth: 370,
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 32,
    paddingHorizontal: 28,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.10,
    shadowRadius: 16,
    elevation: 8,
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: 'Inter_700Bold',
    alignSelf: 'flex-start',
    color: '#1226A9',
  },
  input: {
    borderWidth: 1.5,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 22,
    fontSize: 17,
    width: '100%',
    backgroundColor: '#F3F4F8',
    borderColor: '#1226A9',
    color: '#1226A9',
    fontFamily: 'Inter_400Regular',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    gap: 10,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 0,
    elevation: 2,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#1226A9',
    marginRight: 6,
  },
  submitButton: {
    backgroundColor: '#1226A9',
    marginLeft: 6,
  },
  buttonTextSubmit: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.5,
  },
  buttonTextCancel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#1226A9',
    letterSpacing: 0.5,
  },
  backLink: {
    marginTop: 18,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#2D43B3',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    textDecorationLine: 'underline',
    letterSpacing: 0.2,
  },
});

export default RecoveryForm;
