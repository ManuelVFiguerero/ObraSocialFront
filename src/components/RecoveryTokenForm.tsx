import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '@env';

const RecoveryTokenForm = () => {
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleValidate = async () => {
    if (!token) {
      Toast.show({ type: 'error', text1: 'Debes ingresar el token' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/password-reset/validate?token=${token}`);
      const data = await res.json();
      if (res.ok && data.success) {
        Toast.show({ type: 'success', text1: 'Token válido, puedes cambiar tu contraseña' });
        navigation.navigate('RecoveryNewPassword', { token });
      } else {
        Toast.show({ type: 'error', text1: data.message || 'Token inválido o expirado' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error de red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <View style={styles.inputView}>
        <Text style={styles.label}>Ingresa el token recibido por email</Text>
        <TextInput
          style={styles.input}
          placeholder="Token"
          value={token}
          onChangeText={setToken}
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
            onPress={handleValidate}
            disabled={loading}
          >
            <Text style={styles.buttonTextSubmit}>{loading ? 'Validando...' : 'Validar'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  inputView: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  submitButton: {
    backgroundColor: '#4caf50',
  },
  buttonTextCancel: {
    color: '#fff',
    fontSize: 16,
  },
  buttonTextSubmit: {
    color: '#fff',
    fontSize: 16,
  },
});

export default RecoveryTokenForm;