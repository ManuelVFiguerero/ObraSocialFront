import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, StyleSheet } from 'react-native';
import { api } from '../api/Client'; // 👈 asegurate que coincida mayúscula/minúscula
import { useNavigation } from '@react-navigation/native';

const ChangePasswordScreen = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const navigation = useNavigation();

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert('Error', 'Las nuevas contraseñas no coinciden');
      return;
    }

    try {
      const response = await api.put('/users/change-password', {
        currentPassword,
        newPassword,
        confirmNewPassword,
      });

      Alert.alert('Éxito', 'Contraseña actualizada correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('❌ Error en resetPassword:', error);
      Alert.alert('Error', 'No se pudo actualizar la contraseña');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Actualizar contraseña</Text>

      <Text style={styles.label}>Ingrese su contraseña actual</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />

      <Text style={styles.label}>Ingrese su nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <Text style={styles.label}>Ingrese nuevamente su nueva contraseña</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
      />

      <Text style={styles.requisitos}>
        Al menos una letra mayúscula (A-Z).{'\n'}
        Al menos una letra minúscula (a-z).{'\n'}
        Al menos un número (0-9).
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.changeButton} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Cambiar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f6f7fb',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f3c88',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    color: '#1f3c88',
    marginBottom: 5,
    fontSize: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
  },
  requisitos: {
    color: '#555',
    fontSize: 13,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cancelButton: {
    backgroundColor: '#1f3c88',
    padding: 12,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
  },
  changeButton: {
    backgroundColor: '#1f3c88',
    padding: 12,
    borderRadius: 20,
    width: '40%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
