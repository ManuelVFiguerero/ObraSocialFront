import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';
import UserDetails from '../components/UserDetails';
import ActionButton from '../components/ActionButton';
import Appointment from '../components/Appointment';
import NavBar from '../components/NavBar';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;

// Valores clonados del AboutUsScreen
const HEADER_HEIGHT = 160;
const HEADER_RADIUS = 80;

const HomeScreen = () => {
  const [appointments] = useState([]);

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#4D6EC5" />

      {/* HEADER (fijo) */}
      <View style={styles.header}>
        <Text style={styles.title}>Hola, Manuel!</Text>
      </View>

      {/* CONTENIDO: ScrollView arranca justo bajo el header */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
      >
        <UserDetails />

        <View style={styles.actionButtons}>
          <ActionButton
            btnName="Cargar obra social"
            btnIcon="attach-file"
            screen="SocialHealth"
          />
          <ActionButton
            btnName="Historial médico"
            btnIcon="folder-open"
            screen="MedicalHistory"
          />
          <ActionButton
            btnName="Acerca de nosotros"
            btnIcon="info"
            screen="AboutUs"
          />
          <ActionButton
            btnName="Reservar turnos"
            btnIcon="add"
            screen="ReserveAppointment"
          />
          <ActionButton
            btnName="Buscar por ubicación"
            btnIcon="search"
            screen="ReserveAppointmentLocation"
          />
          <ActionButton
            btnName="Contáctanos"
            btnIcon="mail"
            screen="ContactUs"
          />
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
            appointments.map((appt) => (
              <Appointment key={appt.id} {...appt} />
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
    flex: 1,        // ocupa el espacio restante tras el header
    marginTop: 0,   // sin margin negativo
  },
  content: {
    marginTop: 20,     // espacio ligero tras el header
    paddingHorizontal: 20,
    paddingBottom: 60,  // deja espacio para la NavBar
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
