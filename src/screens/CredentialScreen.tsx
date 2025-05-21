import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
} from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Credential from '../components/Credential';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';

interface CredentialData {
  fullName: string;
  memberNumber: number;
  organization: string;
  dateSince: string;
}

const CredentialScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const credentialData: CredentialData = {
    fullName: 'Julian Alvarez',
    memberNumber: 1245897632,
    organization: 'OSDE',
    dateSince: '15/07/2021',
  };

  const askForConfirmation = (memberNumber: number) => {
    setModalVisible(true);
  };

const confirmDelete = () => {
  setModalVisible(false);
  Toast.show({
    type: 'success',
    text1: 'Credencial eliminada exitosamente',
  });
};  
  return (
    <View style={styles.container}>
      {/* Header en la parte superior */}
      <Header title="Credencial" />

      {/* Contenedor principal sin ScrollView */}
      <View style={styles.content}>
        <Credential
          credentialData={credentialData}
          handleDelete={() => askForConfirmation(credentialData.memberNumber)}
        />
      </View>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={modalVisible}
        type="warning"
        title="Estás a punto de eliminar tu credencial"
        message="Una vez elimines tu credencial, todos tus datos se perderán y tendrás que volver a cargar otros nuevos"
        onConfirm={confirmDelete}
        onClose={() => setModalVisible(false)}
      />

      {/* Barra de navegación inferior */}
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
    marginTop: 160,       // deja espacio para el Header (HEADER_HEIGHT)
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CredentialScreen;
