import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
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
      if (!API_BASE_URL) {
        Toast.show({ type: 'error', text1: 'No se encuentra la URL base de la API.' });
        setLoading(false);
        return;
      }
      const res = await fetch(`${API_BASE_URL}/api/password-reset/reset?token=${token}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        Toast.show({ type: 'success', text1: data.message });
        // @ts-ignore
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
    <SafeAreaView style={styles.screen}>
      <Header title="Nueva contraseña" />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.card}>
          <Text style={styles.title}>Restablecer contraseña</Text>
          <Text style={styles.subtitle}>
            Ingresá tu nueva contraseña para continuar.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleReset}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? 'Cambiando...' : 'Cambiar contraseña'}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: 'transparent',
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 28,
    elevation: 8,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#1226A9',
    fontFamily: 'Inter_700Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#1226A9',
    fontFamily: 'Inter_400Regular',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderBottomWidth: 2,
    borderColor: '#aaa',
    paddingVertical: 12,
    marginBottom: 24,
    fontSize: 18,
    fontFamily: 'Inter_400Regular',
    color: '#000',
  },
  button: {
    backgroundColor: '#1226A9',
    paddingVertical: 16,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
});

export default RecoveryScreenNewPassword;
