import { View, Text, StyleSheet, TextInput, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import Header from '../components/Header';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/Client';
import { Endpoints } from '../api/Endpoints';

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);
  const [actualPassword, setActualPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const passwordMeetsRequirements = () => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword);
  };

  const handleCancel = () => {
    navigation.navigate('Profile');
  };

  const handleConfirm = async () => {
    if (newPassword !== newPassword2) {
      Toast.show({ type: 'error', text1: 'Verifica que las nuevas contraseñas sean iguales' });
      return;
    }

    if (!passwordMeetsRequirements()) {
      Toast.show({ type: 'error', text1: 'La contraseña no cumple los requisitos' });
      return;
    }

    try {
      const email = await AsyncStorage.getItem('email');
      if (!email) {
        Toast.show({ type: 'error', text1: 'No se pudo identificar el usuario logueado' });
        return;
      }

      const res = await api.put(`/api/password-reset?email=${email}`, {
        newPassword: newPassword
      });

      if (res.data.success) {
        Toast.show({ type: 'success', text1: 'Contraseña actualizada exitosamente!' });
        navigation.navigate('Profile');
      } else {
        Toast.show({ type: 'error', text1: 'Error al actualizar la contraseña' });
      }
    } catch (error) {
      console.error('❌ Error en resetPassword:', error);
      Toast.show({ type: 'error', text1: 'Error al conectar con el servidor' });
    }
  };

  return (
    <View style={styles.screen}>
      <Header title="Actualizar contraseña" />
      <View style={styles.form}>
        <Text style={styles.label}>Ingrese su contraseña actual</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={actualPassword}
            onChangeText={setActualPassword}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible}
          />
          <Switch
            value={isPasswordVisible}
            onValueChange={() => setIsPasswordVisible(!isPasswordVisible)}
          />
        </View>

        <Text style={styles.label}>Ingrese su nueva contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={newPassword}
            onChangeText={setNewPassword}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible2}
          />
          <Switch
            value={isPasswordVisible2}
            onValueChange={() => setIsPasswordVisible2(!isPasswordVisible2)}
          />
        </View>

        <Text style={styles.label}>Ingrese nuevamente su nueva contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={newPassword2}
            onChangeText={setNewPassword2}
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={!isPasswordVisible3}
          />
          <Switch
            value={isPasswordVisible3}
            onValueChange={() => setIsPasswordVisible3(!isPasswordVisible3)}
          />
        </View>

        <View style={styles.passwordInfo}>
          <Text style={styles.passwordInfoText}>Al menos una letra mayúscula (A–Z).</Text>
          <Text style={styles.passwordInfoText}>Al menos una letra minúscula (a–z).</Text>
          <Text style={styles.passwordInfoText}>Al menos un número (0–9).</Text>
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#5163C0' }]} onPress={handleCancel}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleConfirm}>
            <Text style={styles.buttonText}>Cambiar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#F3F4F8'
  },
  form: {
    backgroundColor: '#F3F4F8',
    borderRadius: 16,
    padding: 28,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    elevation: 6,
  },
  label: {
    fontSize: 16,
    color: '#1226A9',
    fontFamily: 'Inter_400Regular',
    marginBottom: 5
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%'
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
  passwordInfo: {
    marginTop: 5,
    marginBottom: 30,
    alignItems: 'flex-start'
  },
  passwordInfoText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'Inter_400Regular',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#2D43B3',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 40,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    fontSize: 18,
  },
});

export default ChangePasswordScreen;
