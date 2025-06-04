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

        if (!username || !userId) return;

        // Obtener nombre y apellido
        const res = await api.get(`/users/get-user-by-username?username=${username}`);
        const user = res.data;
        setFullName(`${user.name} ${user.surname}`);

        // Consultar obra social
        const resOS = await api.get(`/api/obras-sociales/usuario/${userId}`);
        setObraSocialNro(resOS.data.numeroAfiliado || null);
      } catch (error) {
        console.error('❌ Error cargando datos del usuario:', error);
        setObraSocialNro(null);  // por si falla
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
            <Text style={styles.placeholder}>Cargar obra social</Text>
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
    backgroundColor: '#1226A9',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 6
  },
  infoPerson: {
    flex: 1,
    paddingRight: 10,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  dni: {
    color: '#fff',
    fontSize: 16,
  },
  placeholder: {
    color: '#fff',
    fontSize: 14,
    fontStyle: 'italic',
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default UserDetails;
