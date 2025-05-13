import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RecoveryForm = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.formContainer}>

      <Text style={styles.title}>Recuperación de datos</Text>

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
          >
            <Text style={styles.buttonTextCancel}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.submitButton]}
            onPress={() => console.log('Enviar recuperación')}
          >
            <Text style={styles.buttonTextSubmit}>Enviar</Text>
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
    maxHeight: '70%',
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
    fontFamily: 'Inter_700Bold',
  },
});

export default RecoveryForm;
