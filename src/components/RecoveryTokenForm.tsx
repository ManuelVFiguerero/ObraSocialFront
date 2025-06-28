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
      <Text style={styles.label}>Token recibido por email</Text>
      <TextInput
        style={styles.input}
        placeholder="Ingresá el código"
        value={token}
        onChangeText={setToken}
        autoCapitalize="none"
        placeholderTextColor="#999"
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
          style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleValidate}
          disabled={loading}
        >
          <Text style={styles.buttonTextSubmit}>{loading ? 'Validando...' : 'Validar'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    backgroundColor: '#F3F4F8',
    borderRadius: 14,
    padding: 18,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: '#1226A9',
    fontFamily: 'Inter_700Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#2D43B3',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 17,
    fontFamily: 'Inter_400Regular',
    marginBottom: 22,
    color: '#000',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 0,
  },
  cancelButton: {
    backgroundColor: '#B32D2F',
    marginRight: 8,
  },
  submitButton: {
    backgroundColor: '#1226A9',
    marginLeft: 8,
  },
  buttonDisabled: {
    backgroundColor: '#AAB3D2',
  },
  buttonTextCancel: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSubmit: {
    color: '#fff',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RecoveryTokenForm;