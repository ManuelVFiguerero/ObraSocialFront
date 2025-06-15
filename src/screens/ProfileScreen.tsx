import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { api } from '../api/Client';
import { RootStackParamList } from '../types';
import { NavigationProp } from '@react-navigation/native';
import { useTheme } from '../theme/ThemeContext';

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
  const { theme, isDark } = useTheme();
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
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Lógica centralizada para cargar el usuario
  const fetchUserData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      if (!username) return;

      const response = await api.get(`/users/get-user-by-username?username=${username}`);
      const profile = response.data;

      // Log para depuración
      console.log('Perfil recibido:', profile);

      // Acepta ambos campos y valida que sea una URL de Cloudinary
      let fotoPerfilUrl = profile.fotoPerfilUrl || profile.foto_perfil_url;
      if (fotoPerfilUrl && typeof fotoPerfilUrl === 'string') {
        // Si no es absoluta, la convierte
        if (!fotoPerfilUrl.startsWith('http')) {
          fotoPerfilUrl = `${api.defaults.baseURL}${fotoPerfilUrl}`;
        }
        // Valida que sea de Cloudinary
        if (!fotoPerfilUrl.includes('cloudinary.com')) {
          console.log('URL de foto no es de Cloudinary, usando imagen por defecto');
          fotoPerfilUrl = null;
        }
      }

      setData({
        profilePic: fotoPerfilUrl
          ? { uri: fotoPerfilUrl }
          : require('../assets/images/fotoperfil.jpg'),
        username: profile.username,
        nombres: profile.name,
        apellidos: profile.surname,
        telefono: profile.phone_number,
        mail: profile.email,
        domicilio: profile.home_address,
      });

      await AsyncStorage.setItem('userId', String(profile.id));
      await AsyncStorage.setItem('email', profile.email);
    } catch (error) {
      console.error('❌ Error al obtener perfil:', error);
    }
  };

  // Carga inicial y cada vez que la pantalla es enfocada
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  const pickAndUploadImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images', // compatible con tu versión
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const image = result.assets[0];
        // Detecta el tipo real
        let type = image.type || '';
        if (!type && image.uri) {
          if (image.uri.endsWith('.png')) type = 'image/png';
          else if (image.uri.endsWith('.jpg') || image.uri.endsWith('.jpeg')) type = 'image/jpeg';
          else type = 'image/jpeg';
        }
        await uploadToCloudinary(image.uri, type);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen');
    }
  };

  const uploadToCloudinary = async (uri: string, type: string) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri,
        type,
        name: 'profile' + (type === 'image/png' ? '.png' : '.jpg'),
      } as any);
      formData.append('upload_preset', 'unsigned_preset');

      const response = await fetch('https://api.cloudinary.com/v1_1/dau2tw6as/image/upload', {
  method: 'POST',
  body: formData,
});

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Error subiendo imagen');

      await updateProfilePhoto(data.secure_url);
      Toast.show({ type: 'success', text1: 'Foto actualizada correctamente' });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo subir la imagen');
    }
  };

  const updateProfilePhoto = async (imageUrl: string) => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) throw new Error('Usuario no identificado');

      await api.put(`/users/${userId}/foto-perfil-url`, {
        fotoPerfilUrl: imageUrl,
      });

      setData(prev => ({
        ...prev,
        profilePic: { uri: imageUrl },
      }));
    } catch (error: any) {
      console.error('❌ Error actualizando imagen:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) return;

      await api.delete(`/users/${userId}`);
      await AsyncStorage.clear();
      Toast.show({ type: 'success', text1: 'Cuenta eliminada' });
      navigation.navigate('Login');
    } catch (error) {
      console.error('❌ Error eliminando cuenta:', error);
      Toast.show({ type: 'error', text1: 'No se pudo eliminar la cuenta' });
    }
  };

  // Nuevo: Opción para elegir entre cámara o galería
  const handleEditPhoto = () => {
    Alert.alert(
      'Cambiar foto de perfil',
      '¿Qué deseas hacer?',
      [
        {
          text: 'Tomar foto',
          onPress: pickFromCamera,
        },
        {
          text: 'Elegir de galería',
          onPress: pickAndUploadImage,
        },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  // Nuevo: Tomar foto con la cámara
  const pickFromCamera = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permiso requerido', 'Necesitas dar acceso a la cámara');
        return;
      }
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled && result.assets?.length > 0) {
        const image = result.assets[0];
        let type = image.type || '';
        if (!type && image.uri) {
          if (image.uri.endsWith('.png')) type = 'image/png';
          else if (image.uri.endsWith('.jpg') || image.uri.endsWith('.jpeg')) type = 'image/jpeg';
          else type = 'image/jpeg';
        }
        await uploadToCloudinary(image.uri, type);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto');
    }
  };

  return (
    <View style={[styles.screen, { backgroundColor: theme.background }]}> 
      <ScrollView contentContainerStyle={[styles.scrollContent, { backgroundColor: theme.background }]}> 
        <Header title="Tus datos" />
        <View style={styles.generalInfo}>
          <View style={styles.avatarContainer}>
            <Image source={data.profilePic} style={styles.avatar} />
            <TouchableOpacity style={[styles.editIcon, { backgroundColor: theme.primary, borderColor: theme.background }]} onPress={handleEditPhoto}>
              <Ionicons name="pencil" size={24} color={theme.buttonText} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.username, { color: theme.primary }]}>{data.username}</Text>
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Datos personales</Text>
          <InfoRow label="Nombre" value={data.nombres} color={theme.text} />
          <InfoRow label="Apellido" value={data.apellidos} color={theme.text} />
        </View>
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Datos de contacto</Text>
          <InfoRow label="Teléfono" value={data.telefono} color={theme.text} />
          <InfoRow label="Correo electrónico" value={data.mail} color={theme.text} />
          <InfoRow label="Domicilio" value={data.domicilio} color={theme.text} />
        </View>
        <View style={styles.accountOptions}>
          <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
            <Text style={[styles.updatePassword, { color: theme.primary }]}>Actualizar contraseña</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDeleteVisible(true)}>
            <Text style={[styles.deleteAccount, { color: '#B32D2F' }]}>Eliminar cuenta</Text>
          </TouchableOpacity>
        </View>
        {loading && <ActivityIndicator style={{ marginTop: 20 }} color={theme.primary} />}
      </ScrollView>
      <ConfirmationModal
        visible={deleteVisible}
        type="warning"
        title="Estás a punto de eliminar tu cuenta"
        message="Una vez elimines tu cuenta, todos tus datos se perderán."
        onConfirm={handleDelete}
        onClose={() => setDeleteVisible(false)}
      />
      <View style={styles.navContainer}>
        <NavBar selectedIcon="person" />
      </View>
    </View>
  );
};

// InfoRow adaptado para tema
const InfoRow = ({ label, value, color }: { label: string; value: string; color: string }) => (
  <View style={[styles.inputWrapper, { backgroundColor: color === '#F3F4F8' ? '#23262F' : '#23262F' }]}> 
    <Text style={[styles.label, { color }]}>{label}</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
  </View>
);

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
  avatarContainer: { marginTop: 40, marginBottom: 10 },
  avatar: { width: 120, height: 120, borderRadius: 60, backgroundColor: '#e0e0e0' },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2d41a7',
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
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
  label: { fontSize: 14, color: '#888', fontFamily: 'Inter_400Regular', marginBottom: 4 },
  value: { fontSize: 16, fontFamily: 'Inter_400Regular', color: '#000' },
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
