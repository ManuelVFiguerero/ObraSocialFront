import { View, StyleSheet, Text, Image, ScrollView, ToastAndroid} from 'react-native'
import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import BackgroundLayout from './BackgroundLayout'
import Logo from '../assets/images/icons/MainLogo.png';
import Credential from '../components/Credential';
import ConfirmationModal from '../components/ConfirmationModal';


const testData = {
    fullName: 'Julian Alvarez',
    memberNumber: 1245897632,
    organization: 'OSDE',
    dateSince: '15/07/2021'
}

const CredentialScreen = () => {
    const [credentials, setCredentials] = useState([
      { ...testData, memberNumber: 1 },
      { ...testData, memberNumber: 2 },
      { ...testData, memberNumber: 3 }
    ])
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedMemberNumber, setSelectedMemberNumber] = useState(null);

    const askForConfirmation = (memberNumber) => {
      setSelectedMemberNumber(memberNumber);
      setModalVisible(true);
    };

    const confirmDelete = () => {
      const nuevaLista = credentials.filter(item => item.memberNumber !== selectedMemberNumber);
      setCredentials(nuevaLista);
      setModalVisible(false);
      setSelectedMemberNumber(null);
    };

    return (
        <BackgroundLayout>
            <View style={styles.title}>
                <Image source={Logo} style={styles.logo}/>
                <Text style={styles.titleText}>Credencial</Text>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                {credentials.length < 1 ? (
                  <View style={styles.noCredentials}>
                    <Text style={styles.noCredentialsText}>No hay credenciales registradas</Text>
                  </View>
                ) : (credentials.map((credentialObj, index) => (
                    <Credential credentialData={credentialObj} handleDelete={() => askForConfirmation(credentialObj.memberNumber)} key={index}/>
                  ))
                )}
            <ConfirmationModal 
            visible={modalVisible}
            type={'warning'}
            title={'Estas a punto de eliminar tu credencial'}
            message={'Una vez elimines tu credencial, todos tus datos se perderán y tendrás que volver a cargar otros nuevos'}
            onConfirm={() => {
                ToastAndroid.show('Credencial eliminada exitosamente', ToastAndroid.SHORT)
                confirmDelete()
            }}
            onClose={() => setModalVisible(false)}
            />
            </ScrollView>
            <NavBar selectedIcon={'badge'}/>
        </BackgroundLayout>
    )

}

export default CredentialScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 80,
    paddingBottom: 200,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center'
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 60,
    marginTop: 40
  },
  titleText: {
    fontSize: 28,
    color: '#F3F4F8',
    fontFamily: 'Inter_700Bold',
    textAlign: 'center'
  },
  noCredentials: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  noCredentialsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    width: '100%'
  },
});