import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/Client';
import Logo from '../assets/icons/MainLogo.png';

const { width } = Dimensions.get('window');
const BOX_WIDTH = width - 40;

const UserDetails = () => {
  const [fullName, setFullName] = useState('');
  const [obraSocialNro, setObraSocialNro] = useState<string | null>(null);

useEffect(() => {
  const fetchUserData = async () => {
    try {
      const username = await AsyncStorage.getItem('username');
      const userId = await AsyncStorage.getItem('userId');

      console.log('📦 Username:', username);
      console.log('🧠 User ID:', userId);

      // Si hay username, obtenemos nombre + apellido
      if (username) {
        const res = await api.get(`/users/get-user-by-username?username=${username}`);
        const user = res.data;
        setFullName(`${user.name} ${user.surname}`);
      }

      // Si hay userId, consultamos obra social
      if (userId) {
        try {
          const resOS = await api.get(`/api/obras-sociales/usuario/${userId}`);
          setObraSocialNro(resOS.data.numeroAfiliado || null);
        } catch (error: any) {
          if (error.response && error.response.status === 404) {
            // No tiene obra social, no mostrar error
            setObraSocialNro(null);
          } else {
            // Otros errores sí se muestran
            console.error('❌ Error cargando obra social:', error);
            setObraSocialNro(null);
          }
        }
      } else {
        setObraSocialNro(null); // Si no hay userId, mostramos "Cargar obra social"
      }

    } catch (error) {
      console.error('❌ Error cargando datos del usuario:', error);
      setObraSocialNro(null);
    }
  };

  fetchUserData();
}, []);


  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.infoPerson}>
          <Text style={styles.name}>{fullName || 'Cargando...'}</Text>
          {obraSocialNro ? (
            <Text style={styles.dni}>{obraSocialNro}</Text>
          ) : (
            <>
              <Text style={styles.placeholder}>Aún no tienes una obra social cargada</Text>
              <Text style={styles.subPlaceholder}>¡Carga tu obra social para ver tu número de afiliado!</Text>
            </>
          )}
        </View>
        <Image source={Logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoBox: {
    width: BOX_WIDTH,
    backgroundColor: '#2D43B3', // azul oscuro institucional
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 22,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 8,
  },
  infoPerson: {
    flex: 1,
    paddingRight: 10,
    justifyContent: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  dni: {
    color: '#E3E6F0',
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 1.5,
  },
  placeholder: {
    color: '#B3B8D6',
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 2,
  },
  subPlaceholder: {
    color: '#B3B8D6',
    fontSize: 13,
    fontStyle: 'italic',
    marginTop: 2,
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 27,
    opacity: 0.85,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
});

export default UserDetails;
