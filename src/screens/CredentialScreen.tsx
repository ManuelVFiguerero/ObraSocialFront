import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Credential, { CredentialData } from '../components/Credential';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/Client';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../theme/ThemeContext';

const CredentialScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);
  const [credentialData, setCredentialData] = useState<CredentialData | null>(null);
  const [obraSocialId, setObraSocialId] = useState<number | null>(null);

  useEffect(() => {
    const fetchCredential = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) return;
        const res = await api.get(`/api/obras-sociales/usuario/${userId}`);
        const os = res.data;
        setCredentialData({
          fullName: os.nombreCompleto || '',
          memberNumber: os.numeroAfiliado,
          organization: os.nombreObraSocial,
          dateSince: os.fechaAlta ? formatDate(os.fechaAlta) : '',
          tipoAfiliado: os.tipoAfiliado || '', // Pasar tipo de afiliado a la credencial
        });
        setObraSocialId(os.id);
      } catch (err) {
        setCredentialData(null);
        setObraSocialId(null);
        navigation.navigate('SocialHealth');
        
      }
    };
    fetchCredential();
  }, []);

  const askForConfirmation = () => {
    setModalVisible(true);
  };

  const confirmDelete = async () => {
    setModalVisible(false);
    if (!obraSocialId) return;
    try {
      await api.delete(`/api/obras-sociales/${obraSocialId}`);
      setCredentialData(null);
      setObraSocialId(null);
      Toast.show({
        type: 'success',
        text1: 'Obra social eliminada',
        text2: 'Cargue una nueva para ver su credencial',
      });
    } catch (err) {
      Toast.show({ type: 'error', text1: 'Error al eliminar la credencial' });
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Header title="Credencial" />
      <View style={[styles.content, { backgroundColor: theme.card }]}> 
        {credentialData ? (
          <Credential
            credentialData={credentialData}
            handleDelete={askForConfirmation}
          />
        ) : (
          <View><Header title="No tienes obra social cargada" /></View>
        )}
      </View>
      <ConfirmationModal
        visible={modalVisible}
        type="warning"
        title="Estás a punto de eliminar tu credencial"
        message="Una vez elimines tu credencial, todos tus datos se perderán y tendrás que volver a cargar otros nuevos"
        onConfirm={confirmDelete}
        onClose={() => setModalVisible(false)}
      />
      <NavBar selectedIcon="credential" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    marginTop: 160,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// Utilidad para formatear fecha a DD/MM/YYYY
function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export default CredentialScreen;
