import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../types';
import { api } from '../api/Client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Switch } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';


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
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<UserData>(data);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createStyles(theme)

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

  useEffect(() => {
    setEditData(data);
  }, [data]);

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
      if (isDark) {toggleTheme()}
      navigation.navigate('Login');
      Toast.show({ type: 'success', text1: 'Cuenta eliminada exitosamente' });
    } catch (error) {
      console.error('❌ Error al eliminar cuenta:', error);
      Toast.show({ type: 'error', text1: 'Error al eliminar la cuenta' });
    }
  };

const handleSave = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Toast.show({ type: 'error', text1: 'Usuario no identificado' });
      return;
    }

    await api.put(`/users/${userId}`, {
      name: editData.nombres,
      surname: editData.apellidos,
      email: editData.mail,
      home_address: editData.domicilio,
      phone_number: editData.telefono,
    });

    setData(editData);
    setIsEditing(false);
    Toast.show({ type: 'success', text1: 'Perfil actualizado' });
  } catch (error) {
    console.error('❌ Error al actualizar perfil:', error);
    Toast.show({ type: 'error', text1: 'Error al actualizar el perfil' });
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

        <TouchableOpacity
          style={{ alignSelf: 'flex-end', marginBottom: 10 }}
          onPress={() => {
            if (isEditing) setEditData(data);
            setIsEditing(!isEditing);
          }}
        >
          <Text
            style={{
              color: isEditing ? '#B32D2F' : theme.secondary,
              fontFamily: 'Inter_700Bold',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {isEditing ? 'Cancelar' : <>Editar <Text style={{fontSize: 18}}></Text></>}
          </Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos personales</Text>
          {[
            { label: 'Nombre', key: 'nombres', editable: true },
            { label: 'Apellido', key: 'apellidos', editable: true },
          ].map(({ label, key, editable }) => (
            <View key={label} style={styles.inputWrapper}>
              <Text style={styles.label}>{label}</Text>
              {isEditing && editable ? (
                <TextInput
                  style={[styles.value, styles.editableInput]}
                  value={editData[key]}
                  onChangeText={text => setEditData({ ...editData, [key]: text })}
                  placeholder={label}
                  placeholderTextColor={theme.neutral}
                />
              ) : (
                <Text style={styles.value}>{data[key]}</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de contacto</Text>
          {[
            { label: 'Teléfono', key: 'telefono', editable: true },
            { label: 'Correo electrónico', key: 'mail', editable: false },
            { label: 'Domicilio', key: 'domicilio', editable: true },
          ].map(({ label, key, editable }) => (
            <View key={label} style={styles.inputWrapper}>
              <Text style={styles.label}>{label}</Text>
              {isEditing && editable ? (
                <TextInput
                  style={[styles.value, styles.editableInput]}
                  value={editData[key]}
                  onChangeText={text => setEditData({ ...editData, [key]: text })}
                  placeholder={label}
                  placeholderTextColor={theme.neutral}
                  keyboardType={key === 'telefono' ? 'phone-pad' : 'default'}
                  autoCapitalize="none"
                />
              ) : (
                <Text
                  style={[
                    styles.value,
                    !editable && isEditing ? styles.readOnlyInput : null
                  ]}
                >
                  {data[key]}
                </Text>
              )}
            </View>
          ))}
        </View>

        {isEditing && (
          <TouchableOpacity
            style={{
              backgroundColor: theme.secondary,
              padding: 12,
              borderRadius: 8,
              marginBottom: 20,
              alignItems: 'center'
            }}
            onPress={handleSave}
          >
            <Text style={{ color: '#fff', fontFamily: 'Inter_700Bold' }}>Guardar cambios</Text>
          </TouchableOpacity>
        )}

        <View style={styles.section}>
          <TouchableOpacity onPress={toggleTheme} style={styles.switch}>
            <MaterialIcons
              name={isDark ? 'bedtime' : 'light-mode'}
              size={28}
              color={theme.background}
              style={{
                padding: 8,
                backgroundColor: theme.quaternary,
                borderRadius: 100
              }}
            />
          </TouchableOpacity>
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

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  scrollContent: {
    paddingTop: HEADER_HEIGHT + 10,
    paddingHorizontal: 20,
    paddingBottom: NAVBAR_HEIGHT + 40,
  },
  generalInfo: { alignItems: 'center', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 20, fontFamily: 'Inter_700Bold', color: theme.primary },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 10, color: theme.quaternary },
  inputWrapper: {
    borderWidth: 1,
    borderColor: theme.neutral,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    backgroundColor: theme.background,
  },
  label: {
    fontSize: 14,
    color: theme.neutral,
    fontFamily: 'Inter_400Regular',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: theme.quaternary,
  },
  accountOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  updatePassword: {
    color: theme.secondary,
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
  switch: {
    width: 76,
    alignItems: theme.mode === 'light' ? 'flex-start' : 'flex-end',
    borderRadius: 50,
    backgroundColor: '#888888'
  },
  editableInput: {
    backgroundColor: '#F0F8FF', // azul claro para destacar editable
    borderRadius: 8,
    color: theme.quaternary,
    // Sin borde
  },
  readOnlyInput: {
    backgroundColor: '#F5F5F5',
    color: theme.neutral,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
});

export default ProfileScreen;
