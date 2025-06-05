import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../types';
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

interface UserData {
  profilePic: any;
  username: string;
  nombres: string;
  apellidos: string;
  telefono: string;
  mail: string;
  domicilio: string;
}

const ProfileScreen: React.FC = () => {
  const [data, setData] = useState<UserData>({
    profilePic: require('../assets/images/fotoperfil.jpg'),
    username: '',
    nombres: '',
    apellidos: '',
    telefono: '',
    mail: '',
    domicilio: '',
  });

  const [deleteVisible, setDeleteVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        console.log('📦 Username obtenido de AsyncStorage:', username);
        if (!username) return;

        const res = await api.get(`/users/get-user-by-username?username=${username}`);
        const profile = res.data;
        console.log('📋 Perfil obtenido:', profile);

        setData(prev => ({
          ...prev,
          username: profile.username,
          nombres: profile.name,
          apellidos: profile.surname,
          telefono: profile.phone_number,
          mail: profile.email,
          domicilio: profile.home_address,
        }));
        await AsyncStorage.setItem('email', profile.email);
      } catch (error) {
        console.error('❌ Error al obtener perfil:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Toast.show({ type: 'error', text1: 'No se pudo identificar el usuario.' });
        return;
      }
      // Llamada al backend para eliminar el usuario por ID
      await api.delete(`/users/${userId}`);
      // Limpiar datos locales y navegar al login
      await AsyncStorage.clear();
      navigation.navigate('Login');
      Toast.show({ type: 'success', text1: 'Cuenta eliminada exitosamente' });
    } catch (error) {
      console.error('❌ Error al eliminar cuenta:', error);
      Toast.show({ type: 'error', text1: 'Error al eliminar la cuenta' });
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Tus datos" />

        <View style={styles.generalInfo}>
          <Image source={data.profilePic} style={styles.profilePic} />
          <Text style={styles.username}>{data.username}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos personales</Text>
          {[
            { label: 'Nombre', value: data.nombres },
            { label: 'Apellido', value: data.apellidos },
          ].map(({ label, value }) => (
            <View key={label} style={styles.inputWrapper}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de contacto</Text>
          {[
            { label: 'Teléfono', value: data.telefono },
            { label: 'Correo electrónico', value: data.mail },
            { label: 'Domicilio', value: data.domicilio },
          ].map(({ label, value }) => (
            <View key={label} style={styles.inputWrapper}>
              <Text style={styles.label}>{label}</Text>
              <Text style={styles.value}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.accountOptions}>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
            <Text style={styles.updatePassword}>Actualizar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteVisible(true)}>
            <Text style={styles.deleteAccount}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={deleteVisible}
        type="warning"
        title="Estás a punto de eliminar tu cuenta"
        message="Una vez elimines tu cuenta, todos tus datos se perderán y tendrás que volver a vincular tu correo"
        onConfirm={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />

      <View style={styles.navContainer}>
        <NavBar selectedIcon="person" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F3F4F8',
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 10,
    paddingHorizontal: 20,
    paddingBottom: NAVBAR_HEIGHT + 40,
  },
  generalInfo: { alignItems: 'center', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#1226A9' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 10 },
  inputWrapper: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#F3F4F8',
  },
  label: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#000',
  },
  accountOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  updatePassword: {
    color: '#2D43B3',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  deleteAccount: {
    color: '#B32D2F',
    fontFamily: 'Inter_700Bold',
    fontSize: 16,
  },
  navContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default ProfileScreen;
