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
import { useTheme } from '../theme/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const HEADER_HEIGHT = 160;
const HEADER_RADIUS = 80;

const HomeScreen = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [appointments, setAppointments] = useState([]);
  const [nombreUsuario, setNombreUsuario] = useState<string>('');

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
    <View style={[styles.screen, { backgroundColor: theme.background }]}> 
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={theme.primary} />

      {/* HEADER */}
      <View style={[styles.header, { backgroundColor: theme.primary }]}> 
        <Text style={[styles.title, { color: theme.buttonText }]}>Hola, {nombreUsuario || 'usuario'}!</Text>
      </View>

      {/* Banner modo oscuro */}
      <View style={{ backgroundColor: theme.card, padding: 16, borderRadius: 12, margin: 16, alignItems: 'center' }}>
        <Text style={{ color: theme.text, fontWeight: 'bold', fontSize: 16 }}>¡Proba el nuevo modo oscuro!</Text>
        <ActionButton
          btnName={isDark ? 'Desactivar modo oscuro' : 'Activar modo oscuro'}
          btnIcon="brightness-6"
          onPress={toggleTheme}
        />
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
          <ActionButton btnName="Buscar por ubicación" btnIcon="search" screen="ReserveAppointmentLocation" />
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
    alignItems: 'flex-start',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    color: '#F3F4F8',
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
    color: '#111',
    marginBottom: 10,
    textAlign: 'center',
  },
  appointments: {
    marginBottom: 20,
  },
  noAppointments: {
    width: CARD_WIDTH,
    padding: 20,
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
