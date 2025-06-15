import React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import RecoveryTokenForm from '../components/RecoveryTokenForm';
import Header from '../components/Header';

const RecoveryScreenToken = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Recuperación de datos" />
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Ingresá el código de recuperación</Text>
          <Text style={styles.subtitle}>
            Revisá tu correo electrónico y copiá el código que te enviamos para continuar con la recuperación de tu cuenta.
          </Text>
          <View style={styles.formWrapper}>
            <RecoveryTokenForm />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
<<<<<<< HEAD
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
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 22,
    paddingVertical: 36,
    paddingHorizontal: 28,
    elevation: 10,
    shadowColor: '#1226A9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#1226A9',
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#2D43B3',
    fontFamily: 'Inter_400Regular',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  formWrapper: {
    width: '100%',
    alignItems: 'center',
  },
=======
    backgroundColor: '#F3F4F8', // Fondo igual al de los formularios
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  }
>>>>>>> 0baf39d (FOTO PERFIL HECHO, IMPLEMENTACION MODO OSCURO, NOTIFICACIONES Y NUEVAS FUNCIONALIDADES)
});

export default RecoveryScreenToken;
