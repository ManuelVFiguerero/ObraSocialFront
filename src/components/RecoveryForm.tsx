import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { API_BASE_URL } from '@env';

//TODO: Habría que mostrar un mensaje cuando el usuario de click a "Enviar"
const RecoveryForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

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
    <View style={styles.formContainer}>

      <View style={styles.inputView}>
        <Text style={styles.label}>Ingresa tu mail *</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
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
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    padding: 28,
    width: '90%',
    maxWidth: 350,
    maxHeight: '50%',
    flex: 1,  
    justifyContent: 'space-around',
    alignItems: 'center',
    elevation: 6,
    marginTop: 40,
    flexDirection: 'column'
  },
  title: {
    fontSize: 28,  
    fontFamily: 'Inter_700Bold',
    color: '#1226A9',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputView: {
    flexDirection: 'column',
    width: '100%'
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Inter_400Regular',
    marginBottom: 5
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 25,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  cancelButton: {
    borderWidth: 2, 
    borderColor: '#1226A9',
  },
  submitButton: {
    backgroundColor: '#1226A9',
  },
  buttonTextSubmit: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#F3F4F8'
  },
  buttonTextCancel: {
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
    color: '#1226A9'
  },
  backLink: {
    marginTop: 15,
    alignItems: 'center',
  },
  backLinkText: {
    color: '#2D43B3',
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});

export default RecoveryForm;
