import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserDetails from '../components/UserDetails';
import ActionButton from '../components/ActionButton';
import NavBar from '../components/NavBar';
import { Endpoints } from '../api/Endpoints';
import { api } from '../api/Client';
import AppointmentCard from '../components/AppointmentCard';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const HEADER_HEIGHT = 160;
const HEADER_RADIUS = 80;

const HomeScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');
  const { theme } = useTheme();
  const styles = createStyles(theme);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (!username) return;

        const res = await api.get(`${Endpoints.profile}?username=${username}`);
        const { name } = res.data;
        setNombreUsuario(name);

        const userId = await AsyncStorage.getItem('userId');
        const turnoRes = await api.get(`/api/turnos/usuario/${userId}`);
        setAppointments(turnoRes.data);

      } catch (err) {
        console.error('❌ Error al obtener nombre:', err);
      }
    };
    fetchUserData();
  }, []);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#4D6EC5" />

      {/* HEADER */}
      <View style={styles.header }>
        <Text style={styles.title}>Hola, {nombreUsuario || 'usuario'}!</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <UserDetails />

        <View style={styles.actionButtons}>
          <ActionButton btnName="Cargar obra social" btnIcon="attach-file" screen="SocialHealth" />
          <ActionButton btnName="Historial médico" btnIcon="folder-open" screen="MedicalHistory" />
          <ActionButton btnName="Acerca de nosotros" btnIcon="info" screen="AboutUs" />
          <ActionButton btnName="Reservar turnos" btnIcon="add" screen="ReserveAppointment" />
      
          <ActionButton btnName="Contáctanos" btnIcon="mail" screen="ContactUs" />
        </View>

        <Text style={styles.appointmentTitle}>Mis turnos</Text>
        <View style={styles.appointments}>
          {appointments.length === 0 ? (
            <View style={styles.noAppointments}>
              <Text style={styles.noAppointmentsText}>
                No hay turnos próximos
              </Text>
            </View>
          ) : (
            appointments.map((appt, index) => (
              <AppointmentCard
                appointment={appt}
                key={index}
                reservable={false}
                onCancel={async () => {
                  try {
                    const userId = await AsyncStorage.getItem('userId');
                    if (!userId) return;
                    await api.post(`/api/turnos/cancelar/${appt.id}?usuarioId=${userId}`);
                    // Refrescar turnos
                    const turnoRes = await api.get(`/api/turnos/usuario/${userId}`);
                    setAppointments(turnoRes.data);
                  } catch (error) {
                    console.error('❌ Error al cancelar turno:', error);
                  }
                }}
              />
            ))
          )}
        </View>
      </ScrollView>

      <NavBar selectedIcon="home" />
    </View>
  );
};

const createStyles = (theme) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.background,
  },
  header: {
    height: HEADER_HEIGHT,
    backgroundColor: theme.primary,
    borderBottomLeftRadius: HEADER_RADIUS,
    borderBottomRightRadius: HEADER_RADIUS,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: theme.terciary,
    fontSize: 35,
    fontFamily: 'Inter_700Bold',
  },
  scrollView: {
    flex: 1,
    marginTop: 0,
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 60,
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
    marginTop: 10,
  },
  appointmentTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.quaternary,
    marginBottom: 10,
    textAlign: 'center',
  },
  appointments: {
    marginBottom: 20,
  },
  noAppointments: {
    width: CARD_WIDTH,
    padding: 20,
    backgroundColor: theme.background,
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  noAppointmentsText: {
    fontSize: 16,
    color: theme.neutral,
    textAlign: 'center',
  },
});

export default HomeScreen;
