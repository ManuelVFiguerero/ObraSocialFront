import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import UserDetails from '../components/UserDetails';
import BackgroundLayout from './BackgroundLayout';
import ActionButton from '../components/ActionButton';
import Appointment from '../components/Appointment';
import NavBarButton from '../components/NavBarButton';
const HomeScreen = () => {
  const [appointments, setAppointments] = useState([]);


  return (
    <BackgroundLayout>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <UserDetails />
          <View style={styles.actionButtons}>
            {/*TODO: Cambiar la propiedad "screen" por las screens correctas*/}
            <ActionButton btnName={'Cargar obra social'} btnIcon={'attach-file'} screen={'Login'}/>
            <ActionButton btnName={'Historial Medico'} btnIcon={'folder-open'} screen={'Login'}/>
            <ActionButton btnName={'Acerca de nosotros'} btnIcon={'info'} screen={'Login'}/>
            <ActionButton btnName={'Reservar turnos'} btnIcon={'add'} screen={'Login'}/>
            <ActionButton btnName={'Buscar por ubicación'} btnIcon={'search'} screen={'Login'}/>
            <ActionButton btnName={'Contactanos'} btnIcon={'mail'} screen={'Login'}/>            
          </View>
          <Text style={styles.appointmentTitle}>Mis turnos</Text>
          <View style={styles.appointments}>
            {appointments.length < 1 ? (
              <View style={styles.noAppointments}>
                <Text style={styles.noAppointmentsText}>No hay turnos próximos</Text>
              </View>
            ) : (appointments.map(appointment => (
                <Appointment />
              ))
            )}
          </View>
        </ScrollView>
        <View style={styles.bottomNavBar}>
            <NavBarButton btnIcon={'home'} screen={'Login'}/>
            <NavBarButton btnIcon={'person'} screen={'Login'}/>
            <NavBarButton btnIcon={'badge'} screen={'Login'}/>
            <NavBarButton btnIcon={'notifications'} screen={'Login'}/>
            <NavBarButton btnIcon={'logout'} screen={'Login'}/>
        </View>
      </View>
    </BackgroundLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 20,
    //paddingBottom: 50,  // NOTE: Esto tiene un proposito??
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 30
  },
  appointmentTitle: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    color: '#111',
    marginBottom: 10,
    textAlign: 'center'
  },
  appointments: {
    flexDirection: 'column',
    margin: 20
  },
  noAppointments: {
    width: '100%',
    padding: 20,
    backgroundColor: '#F3F4F8',
    borderRadius: 10,
    marginBottom: 30,
    alignItems: 'center',
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    width: '100%'
  },
  bottomNavBar: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    //backgroundColor: '#F3F4F8',
    backgroundColor: '#F3F4F8',
    height: 60,
    position: 'absolute',
    bottom: 48, //Posicion absoluta para que no se superponga con los botones de Android
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});

export default HomeScreen;
