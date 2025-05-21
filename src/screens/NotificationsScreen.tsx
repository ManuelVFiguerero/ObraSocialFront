// src/screens/NotificationsScreen.tsx
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import NotificationsPreview from '../components/NotificationsPreview';

const { width } = Dimensions.get('window');
// Ajusta estos valores a los que uses en tu tema
const HEADER_HEIGHT = 160;
const NAVBAR_HEIGHT = 90;

const testMessages: string[] = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris',
];

const NotificationsScreen: React.FC = () => {
  const handleSeeMore = () => {
    // navegación a la pantalla de detalles
  };

  return (
    <View style={styles.screen}>
      {/* Header fijo */}
      <Header title="Notificaciones" />

      {/* Área desplazable entre header y nav bar */}
      <ScrollView
        style={[styles.scrollView, { marginTop: HEADER_HEIGHT, marginBottom: NAVBAR_HEIGHT }]}
        contentContainerStyle={styles.content}
      >
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Nuevas notificaciones</Text>
          <NotificationsPreview
            defaultMessage="Ya has visto todas las notificaciones"
            messages={testMessages}
            seeMore={handleSeeMore}
          />
        </View>

        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Notificaciones ya vistas</Text>
          <NotificationsPreview
            defaultMessage="No tienes notificaciones"
            messages={[testMessages[0]]}
            seeMore={handleSeeMore}
          />
        </View>

        <View style={styles.notificationContainer}>
          <Text style={styles.notificationHeader}>Noticias</Text>
          <NotificationsPreview
            defaultMessage="No hay noticias para mostrar"
            messages={testMessages}
            seeMore={handleSeeMore}
          />
        </View>
      </ScrollView>

      {/* NavBar fijo */}
      <View style={[styles.navContainer, { height: NAVBAR_HEIGHT }]}>
        <NavBar selectedIcon="notifications" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    zIndex: 0,
  },
  content: {
    marginTop:30,
    paddingHorizontal: 20,
    paddingTop: 0,
    paddingBottom: 20,
  },
  notificationContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  notificationHeader: {
    fontSize: 20,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
  },
  navContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default NotificationsScreen;


