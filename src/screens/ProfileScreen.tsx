import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../types';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

interface UserData {
  profilePic: any;
  username: string;
  nombres: string;
  apellidos: string;
  nacimiento: string;
  dni: string;
  telefono: string;
  mail: string;
  domicilio: string;
}

const initialData: UserData = {
  profilePic: require('../assets/images/testProfileImage.jpg'),
  username: 'Julian_Alvarez',
  nombres: 'Julian',
  apellidos: 'Alvarez',
  nacimiento: '13/05/25',
  dni: '40300220',
  telefono: '5492213011076',
  mail: 'julianalvarez1@gmail.com',
  domicilio: 'Libertad 1010, Retiro, Buenos Aires',
};

const ProfileScreen: React.FC = () => {
  const [data, setData] = useState<UserData>(initialData);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleDelete = () => {
    navigation.navigate('Login');
    Toast.show({ type: 'success', text1: 'Cuenta eliminada exitosamente' });
  };

  return (
    <View style={styles.screen}>
      <Header title="Tus datos" />

      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT, marginBottom: NAVBAR_HEIGHT }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.generalInfo}>
          <Image source={data.profilePic} style={styles.profilePic} />
          <Text style={styles.username}>{data.username}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos personales</Text>
          {['nombres', 'apellidos', 'nacimiento', 'dni'].map((key) => (
            <View key={key} style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={(data as any)[key]}
                onChangeText={(text) => setData({ ...data, [key]: text })}
              />
              <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Datos de contacto</Text>
          {['telefono', 'mail', 'domicilio'].map((key) => (
            <View key={key} style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={(data as any)[key]}
                onChangeText={(text) => setData({ ...data, [key]: text })}
              />
              <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
            </View>
          ))}
        </View>

        <View style={styles.accountOptions}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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

      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="person" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollView: { flex: 1, zIndex: 0 },
  content: { paddingHorizontal: 20, paddingBottom: 20 },
  generalInfo: { alignItems: 'center', marginBottom: 20 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  username: { fontSize: 20, fontFamily: 'Inter_700Bold', color: '#1226A9' },
  section: { marginBottom: 30 },
  sectionTitle: { fontSize: 20, fontFamily: 'Inter_700Bold', marginBottom: 10 },
  inputWrapper: { position: 'relative', marginBottom: 20 },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    backgroundColor: '#F3F4F8',
  },
  icon: { position: 'absolute', right: 10, top: '50%', transform: [{ translateY: -10 }] },
  accountOptions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  updatePassword: { color: '#2D43B3', fontFamily: 'Inter_700Bold', fontSize: 16 },
  deleteAccount: { color: '#B32D2F', fontFamily: 'Inter_700Bold', fontSize: 16 },
  navContainer: { position: 'absolute', left: 0, right: 0, bottom: 0 },
});

export default ProfileScreen;