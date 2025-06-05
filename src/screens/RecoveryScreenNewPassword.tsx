import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '@env';

const RecoveryScreenNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore
  const { token } = route.params || {};

  const handleReset = async () => {
    if (!newPassword) {
      Toast.show({ type: 'error', text1: 'Debes ingresar una nueva contraseña' });
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/password-reset/reset?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Toast.show({ type: 'success', text1: data.message });
        navigation.navigate('Login');
      } else {
        Toast.show({ type: 'error', text1: data.message || 'Error al cambiar la contraseña' });
      }
    } catch (e) {
      Toast.show({ type: 'error', text1: 'Error de red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.formContainer}>
      <Text style={styles.label}>Nueva contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Nueva contraseña"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleReset}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Cambiando...' : 'Cambiar contraseña'}</Text>
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
    maxHeight: '50%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: '#1226A9',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#aaa',
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#1226A9',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#F3F4F8',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RecoveryScreenNewPassword;
