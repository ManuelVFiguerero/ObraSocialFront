import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '../api/Client';
import Logo from '../assets/icons/MainLogo.png';
import { useTheme } from '../contexts/ThemeContext';


const { width } = Dimensions.get('window');
const BOX_WIDTH = width - 40;

const UserDetails = () => {
  const [fullName, setFullName] = useState('');
  const [obraSocialNro, setObraSocialNro] = useState<string | null>(null);
  const { theme } = useTheme();
  const styles = createStyles(theme);

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

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoBox: {
    width: BOX_WIDTH,
    backgroundColor: theme.secondary,
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
    color: theme.terciary,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  dni: {
    color: theme.terciary,
    fontSize: 16,
    letterSpacing: 2
  },
  placeholder: {
    color: theme.terciary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  subPlaceholder: {
    color: theme.terciary,
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 4,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default UserDetails;
