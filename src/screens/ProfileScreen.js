import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, TextInput, TouchableOpacity, ToastAndroid, Dimensions} from 'react-native';
import BackgroundLayout from './BackgroundLayout';
import NavBar from '../components/NavBar';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ConfirmationModal from '../components/ConfirmationModal';
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

// Valores clonados del AboutUsScreen
const HEADER_HEIGHT = 160;
const HEADER_RADIUS = 80;


//Datos para testear
const userData = {
    profilePic: require('../assets/images/testProfileImage.jpg'),
    username: 'Julian_Alvarez',
    nombres: 'Julian',
    apellidos: 'Alvarez',
    nacimiento: '13/05/25',
    dni: "40300220",
    telefono: "5492213011076",
    mail: "julianalvarez1@gmail.com",
    domicilio: "Libertad 1010, Retiro, Buenos Aires"
}

const ProfileScreen = () => {
    const [profilePic, setProfilePic] = useState(userData.profilePic)
    const [username, setUsername] = useState(userData.username);
    const [name, setName] = useState(userData.nombres);
    const [lastname, setLastname] = useState(userData.apellidos);
    const [birthDate, setBirthDate] = useState(userData.nacimiento);
    const [dni, setDni] = useState(userData.dni);
    const [phone, setPhone] = useState(userData.telefono);
    const [mail, setMail] = useState(userData.mail)
    const [address, setAddress] = useState(userData.domicilio);
    const [deleteAccountVisible, setDeleteAccountVisible] = useState(false)
    const navigation = useNavigation();
    

    //TODO: Agregar useEffect para obtener los datos del usuario
    //TODO: Usar librería para ajustar la fecha de nacimiento desde un calendario
    //TODO: DNI tiene que tener formato (xx.xxx.xxx)
    //TODO: Telefono tiene que tener formato
    //TODO: Falta la funcionalidad de Actualizar contraseña y eliminar cuenta

    return (
      <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.screen}>
            <View style={styles.header}>
                <Text style={styles.titleText}>Tus datos</Text>
            </View>
                <View style={styles.generalInfo}>
                    <Image source={profilePic} style={styles.profilePic}/>
                    <View style={styles.usernameField}>
                        <Text style={styles.username}>{username}</Text>
                    </View>
                </View>
                <View style={styles.personalInfo}>
                    <View style={styles.personalData}>
                        <Text style={styles.infoTitles}>Datos personales</Text>
                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={name}
                            value={name}
                            onChangeText={setName}
                            keyboardType="default"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>

                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={lastname}
                            value={lastname}
                            onChangeText={setLastname}
                            keyboardType="default"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>


                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={birthDate}
                            value={birthDate}
                            onChangeText={setBirthDate}
                            keyboardType="numeric"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>


                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={dni}
                            value={dni}
                            onChangeText={setDni}
                            keyboardType="numeric"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>

                    </View>
                    <View style={styles.personalData}>
                        <Text style={styles.infoTitles}>Datos de contacto</Text>
                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={phone}
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="numeric"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>

                        <View style={styles.inputWrapper}>
                          <TextInput
                            style={styles.input}
                            placeholder={mail}
                            value={mail}
                            onChangeText={setMail}
                            keyboardType="default"
                            autoCapitalize="none"
                          />
                          <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                        </View>
                      
                    </View>                        
                    <View style={styles.personalData}>
                            <Text style={styles.infoTitles}>Domicilio</Text>
                            <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder={address}
                                value={address}
                                onChangeText={setAddress}
                                keyboardType="numeric"
                                autoCapitalize="none"
                            />
                            <MaterialIcons name="edit" size={20} color="#888" style={styles.icon} />
                            </View>                    
                    </View>
                </View>
                <View style={styles.accountOptions}>
                  <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.updatePassword}>Actualizar Contraseña</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => setDeleteAccountVisible(true)}>
                    <Text style={styles.deleteAccount}>Eliminar Cuenta</Text>
                  </TouchableOpacity>        
                </View>
            <ConfirmationModal
            visible={deleteAccountVisible}
            type={'warning'}
            title={'Estas a punto de eliminar tu cuenta'}
            message={'Una vez elimines tu cuenta, todos tus datos se perderán y tendrás que volver a vincular tu correo'}
            onConfirm={() =>{
              navigation.navigate('Login')
              ToastAndroid.show('Cuenta eliminada exitosamente', ToastAndroid.SHORT)
            }}
            onClose={() => setDeleteAccountVisible(false)}
            />
        </View>
      </ScrollView>
      <NavBar selectedIcon={'person'}/>
      </>
    )
}

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      height: HEADER_HEIGHT,
      backgroundColor: '#2D43B3',
      borderBottomLeftRadius: HEADER_RADIUS,
      borderBottomRightRadius: HEADER_RADIUS,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flexGrow: 1,  
      paddingBottom: 200,
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
      fontSize: 28,
      color: '#F3F4F8',
      fontFamily: 'Inter_700Bold',
      marginTop: 80,
      textAlign: 'center'
    },
    generalInfo: {
        alignItems: 'center'
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20
    },
    usernameField: {
        backgroundColor: '#F3F4F8',
        minWidth: '30%',
        minHeight: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 6,
        borderColor: '#1226A9',
        borderWidth: 1
    },
    personalInfo: {
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20
    },
    infoTitles: {
        fontSize: 20,
        fontFamily: 'Inter_400Regular',
    },
    input: {
      borderWidth: 2,
      borderColor: '#ddd',
      borderRadius: 8,
      padding: 12,
      marginBottom: 25,
      fontSize: 16,
      fontFamily: 'Inter_400Regular',
      width: '100%',
      backgroundColor: '#F3F4F8'
    },
    inputWrapper: {
      position: 'relative',
      width: '100%',
    },
    icon: {
      position: 'absolute',
      right: 10,
      top: '35%',
      transform: [{ translateY: -10 }],
    },
    accountOptions: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    updatePassword: {
    color: '#2D43B3',
    fontFamily: 'Inter_700Bold',
    marginTop: 5,
    fontSize: 16,
    },
    deleteAccount: {
        color: '#B32D2F',
        fontFamily: 'Inter_700Bold',
        marginTop: 5,
        fontSize: 16,
    }
})  
export default ProfileScreen;